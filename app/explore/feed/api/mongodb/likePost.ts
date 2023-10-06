"use server"

import { getUserDetails } from "@/app/api/mongodb/user/user";
import { mongoClient } from "@/app/api/mongodb/client";
import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";

export const likePost = async (postId: string, hasLiked: boolean) => {

  try {


    const client = mongoClient;

    const user = await getUserDetails();
    if (!user) { redirect('/login?error=Network error, check if you are logged in'); }

    try {
      const posts = client.db('the-amazing-social-app-v3').collection('posts');

      const res = hasLiked
        ? await posts.updateOne({ _id: new ObjectId(postId) }, { $addToSet: { likers: user._id } })
        : await posts.updateOne({ _id: new ObjectId(postId) }, { $pull: { likers: user._id } });

        return res;




    }
    catch (err) {
      redirect(`/explore?error=${err}`);
    }

  }
  catch (err) {
    redirect(`/explore?error=Something went wrong`);
  }



}

