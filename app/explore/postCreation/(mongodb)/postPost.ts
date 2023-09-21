"use server"
import { MongoClient, Timestamp, ServerApiVersion, InsertOneResult } from "mongodb";
import { userPost } from "../../postDisplay/(mongodb)/getPosts";
import { getSessionDetails, getUserInfo } from "../../../(mongodb)/user";
import { redirect } from "next/navigation";




export const postPost = async (content:{textContent:string,imageURL?:string},client:MongoClient): Promise<InsertOneResult> => {

  
    const userDetails = await getSessionDetails();
    if (!userDetails){
      redirect('/login?error=Network error, check if you are logged in');
    }

    const posts = client.db('the-amazing-social-app').collection('posts');


    //@ts-ignore _id is generated automatically
    const newPost:userPost ={
      created_by:userDetails._id,
      content:{
        textContent:content.textContent,
        imageURL:content.imageURL
      },
      comments:[],
      verified:false,
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

