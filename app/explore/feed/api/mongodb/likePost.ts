"use server"

import { getSessionDetails } from "@/app/api/mongodb/user";
import { getMongoClient } from "@/app/lib/mongoClient";
import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";

export const likePost = async (postId: string, hasLiked: boolean) => {

  try {


    const client = getMongoClient();

    const user = await getSessionDetails();
    if (!user) { redirect('/login?error=Network error, check if you are logged in'); }

    try {
      const posts = client.db('the-amazing-social-app').collection('posts');

      const res = hasLiked
        ? await posts.updateOne({ _id: new ObjectId(postId) }, { $addToSet: { likers: user._id } })
        : await posts.updateOne({ _id: new ObjectId(postId) }, { $pull: { likers: user._id } });

        return res;




    }
    catch (err) {
      redirect(`/explore?error=${err}`);
    }
    finally {

      await client.close();

    }

  }
  catch (err) {
    redirect(`/explore?error=Something went wrong`);
  }



}

