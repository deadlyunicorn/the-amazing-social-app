"use server"

import { userPost } from "@/app/(mongodb)/getPosts";
import { getSessionDetails } from "@/app/(mongodb)/user"
import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const toggleLike = async (postId:string) => {

  const client = new MongoClient(process.env.MONGODB_URI!, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  const user = await getSessionDetails();
  if (!user) {redirect('/login?error=Network error, check if you are logged in');}

  try {


    const posts = client.db('the-amazing-social-app').collection('posts');

    //@ts-ignore
    const post: userPost = await posts.findOne({ _id: new ObjectId(postId) });
    
    
    let res; 

    if (post.likers.some(liker=>liker&&liker.equals(user._id))) {

      res=await posts.updateOne({ _id: new ObjectId(postId) }, { $pull: { likers:  user._id  } });

    }

    else {

      res=await posts.updateOne({ _id: new ObjectId(postId) }, { $addToSet: { likers:  user._id  } });
    
    }

    revalidatePath('/explore');
    return res;




  }
  catch(err){
    redirect(`/explore?error=${err}`);
  }
  finally {

    await client.close();

  }



}

