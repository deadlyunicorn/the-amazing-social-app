"use server"
import { ObjectId, Timestamp } from "mongodb";
import { getMongoClient } from "../(lib)/mongoClient";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version

export const putDescription = async( username : string, description : string ) : Promise <void>=>{
  const client = getMongoClient();
  
  
  try {
    await client.connect();
    
    const users = client.db('the-amazing-social-app').collection('users');

    await users.updateOne({username:username},{$set:{description:description}})
      .then(
        data=>{
          if (!data.acknowledged){
            throw "Setting description failed";
          }
        }
      );


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
  latestPosts: Array<{ created_at: Timestamp, postText: string }>
}