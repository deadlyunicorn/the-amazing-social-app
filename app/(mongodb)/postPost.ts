"use server"
import { MongoClient, Timestamp, ServerApiVersion, InsertOneResult } from "mongodb";
import { userPost } from "./getPosts";
import { getSessionDetails, getUserInfo } from "./user";




export const postPost = async (content:{textContent:string,imageURL?:string}): Promise<InsertOneResult> => {

  
  const client = new MongoClient(process.env.MONGODB_URI!, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  try {
    
    await client.connect();
    const userDetails = await getSessionDetails();

    const posts = client.db('the-amazing-social-app').collection('posts');


    //@ts-ignore _id is generated automatically
    const newPost:userPost ={
      created_by:String(userDetails?._id),
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
  finally {

    await client.close();

  }
}

