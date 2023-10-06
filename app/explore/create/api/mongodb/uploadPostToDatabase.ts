"use server"
import { MongoClient, InsertOneResult } from "mongodb";
import { userPost } from "../../../feed/api/mongodb/getPosts";
import { redirect } from "next/navigation";
import { getUserDetails } from "@/app/api/mongodb/user/user";




export const postPost = async (content:{textContent:string,imageURL?:string},client:MongoClient): Promise<InsertOneResult> => {

  
    const userDetails = await getUserDetails();
    if (!userDetails){
      redirect('/login?error=Network error, check if you are logged in');
    }

    const posts = client.db('the-amazing-social-app-v3').collection('posts');


    //@ts-ignore _id is generated automatically
    const newPost:userPost ={
      created_by:userDetails._id,
      content:{
        textContent:content.textContent,
        imageURL:content.imageURL
      },
      comments:[],
      verified:true,
      likers:[],
      created_at: new Date()
    }

    const res = await posts.insertOne(newPost)

    if (!res.acknowledged){
        throw "Failed to create post, try again";
    }
    else {
      return res;
    }

}

