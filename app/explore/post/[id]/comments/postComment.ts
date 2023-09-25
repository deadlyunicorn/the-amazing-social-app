"use server"

import { getSessionDetails, getUserInfo } from "@/app/(mongodb)/user"
import { commentServer, userPost } from "@/app/explore/postDisplay/(mongodb)/getPosts";
import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";
import { redirect } from "next/navigation";

export const commentPost = async (postId: string, commentContent: string) => {


  const client = new MongoClient(process.env.MONGODB_URI!);

  const user = await getSessionDetails();
  if (!user) { redirect('/login?error=Network error, check if you are logged in'); }

  const session = client.startSession();


  try {

    session.startTransaction();

    const posts = client.db('the-amazing-social-app').collection('posts');
    const comments = client.db('the-amazing-social-app').collection('comments');


    const commentId = new ObjectId()

    const comment:commentServer = {
      _id: commentId,
      postId: new ObjectId(postId),
      content: commentContent,
      created_by: user._id,
      created_at: new Date()
    }

    const createComment = await comments.insertOne(comment);


    const insertCommentToPosts = await posts.updateOne({ _id: new ObjectId(postId)},{$push:{comments:commentId}});
    await session.commitTransaction();

    return createComment;

  }
  catch (err) {
    redirect(`/explore?error=${err}`);
  }
  finally {

    await client.close();

  }


}

