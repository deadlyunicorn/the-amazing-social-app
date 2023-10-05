"use server"

import { mongoClient } from "@/app/api/mongodb/client";
import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";
import { commentServer } from "./getComments";
import { getUserDetails } from "@/app/api/mongodb/user/user";

export const commentPost = async (postId: string, commentContent: string) => {


  const client = mongoClient;

  const user = await getUserDetails();
  if (!user) { redirect('/login?error=Network error, check if you are logged in'); }

  const session = client.startSession();


  try {

    session.startTransaction();

    const posts = client.db('the-amazing-social-app-v3').collection('posts');
    const comments = client.db('the-amazing-social-app-v3').collection('comments');


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



}

