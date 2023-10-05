"use server"

import { mongoClient } from "@/app/api/mongodb/client";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version

export const putDescription = async( username : string, description : string ) : Promise <void>=>{
  const client = mongoClient;
  const users = client.db('the-amazing-social-app-v3').collection('users');

  await users.updateOne({username:username},{$set:{description:description}})
    .then(
      data=>{
        if (!data.acknowledged){
          throw "Setting description failed";
        }
      }
    );


}
