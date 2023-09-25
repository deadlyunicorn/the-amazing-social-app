"use server"

import { getSessionDetails } from "@/app/(mongodb)/user"
import { MongoClient, ObjectId } from "mongodb";
import { redirect } from "next/navigation";

export const deleteComment = async (postIdString: string, commentIdString: string) => {

  const client = new MongoClient(process.env.MONGODB_URI!);

  const user = await getSessionDetails();
  if (!user) { redirect('/login?error=Network error, check if you are logged in'); }

  const session = client.startSession();


  try {

    session.startTransaction();

    const posts = client.db('the-amazing-social-app').collection('posts');
    const comments = client.db('the-amazing-social-app').collection('comments');


    const commentId = new ObjectId(commentIdString);
    const postId = new ObjectId(postIdString);

    await comments.deleteOne(
      {
        postId:postId,
        _id:commentId
      }
    ).then(res=>{if ( !( res.deletedCount > 0 ) ){
      throw "Failed to delete"}});
    const updateRequest = await posts.updateOne({
        _id:postId
      },
      {$pull:{
        comments: commentId
      }})
    .then(res=>{
      if ( !(res.matchedCount > 0) )throw "Failed to delete";
      return res;
    })

    await session.commitTransaction();

    return updateRequest;

  }
  catch (err) {
    redirect(`/explore?error=${err}`);
  }
  finally {

    await client.close();

  }


}

