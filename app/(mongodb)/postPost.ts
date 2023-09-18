"use server"
import { MongoClient, Timestamp, ServerApiVersion } from "mongodb";
import { userPost } from "./getPosts";
import { getUserDetails, getUserInfo } from "./user";




export const postPost = async (content:{textContent:string,imageURL?:string}) => {

  
  const client = new MongoClient(process.env.MONGODB_URI!, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  try {
    
    await client.connect();
    const userDetails = await getUserDetails();

    const posts = client.db('the-amazing-social-app').collection('posts');


    const newPost:userPost ={
      created_by:String(userDetails?.username),
      content:{
        textContent:content.textContent,
        imageURL:content.imageURL
      },
      comments:[],
      likers:[],
      created_at: new Date()
    }

    await posts.insertOne(newPost).then(res=>{
      if (!res.acknowledged){
        throw "Failed to create post, try again";
      }
    })

  } 
  finally {

    await client.close();

  }
}

