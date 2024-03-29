"use server"

import { getUserDetails } from "@/app/api/mongodb/user/user";
import { mongoClient } from "@/app/api/mongodb/client";
import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";

export const deleteComment = async (postIdString: string, commentIdString: string) => {

  const client = mongoClient;

  const user = await getUserDetails();
  if (!user) { redirect('/login?error=Network error, check if you are logged in'); }

  const session = client.startSession();


  try {

    session.startTransaction();

    const posts = client.db('the-amazing-social-app-v3').collection('posts');
    const comments = client.db('the-amazing-social-app-v3').collection('comments');


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
 


}

