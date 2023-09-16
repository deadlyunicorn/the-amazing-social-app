import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import {ServerApiVersion, MongoClient, ObjectId, Timestamp, } from "mongodb";
import { supabaseCredentials } from "../(supabase)/global";
import { cookies } from "next/headers";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version

const client = new MongoClient(process.env.MONGODB_URI!, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


export const getUserInfo = async(
    query:{
      email?:string,
      username?:String,
    }
  
  ) : Promise<userObject|null>=>{
  try {
    await client.connect();
    
    const users = client.db('the-amazing-social-app').collection('users');

    const result:userObject|null = await users.findOne(query)
      .then(
        data=>{
          if (data!=null){
            return data as userObject;
          }
          else {return null}
        }
        );
    return result;


  } finally {

      await client.close();

    // Ensures that the client will close when you finish/error

  }
}

export type userObject={
  _id: ObjectId,
  age: number,
  email: string,
  username: string,
  avatarSrc?: string,
  description?: string,
  latestPosts: Array<{ created_at: Timestamp, postText: string }>
}

export const getUserDetails = async() => {
  const session = await createServerActionClient({cookies},supabaseCredentials).auth.getSession();
  const userDetails = await getUserInfo({email:session.data.session?.user.email});

  return userDetails;
}