"use server"

import { getSessionDetails } from "@/app/(mongodb)/user"
import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";
import { redirect } from "next/navigation";

export const likePost = async (postId: string, hasLiked: boolean) => {

  try {


    const client = new MongoClient(process.env.MONGODB_URI!, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });

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

