import { MongoClient, ObjectId, Timestamp,ServerApiVersion } from "mongodb";
import { getMongoClient } from "../(lib)/mongoClient";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version



export const setAvatarLink = async( username : string, url : string ) : Promise <void>=>{
  const client = getMongoClient();
  
  
  try {
    await client.connect();
    
    const users = client.db('the-amazing-social-app').collection('users');

    await users.updateOne({username:username},{$set:{avatarSrc:url}})
      .then(
        data=>{
          if (!data.acknowledged){
            throw "Setting avatar failed";
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
}