//use bun or deno

import { mongoClient } from "@/app/api/mongodb/client";
import { MongoClient, ServerApiVersion } from "mongodb";
import { argv } from "process";

const username = argv[2];

export const verifyPosts = async () : Promise<any> => {

  const client = mongoClient;




  try {


    const users = client.db('the-amazing-social-app-v3').collection('users');
    const poster = await users.findOne({username:username});
    

    const posts = client.db('the-amazing-social-app-v3').collection('posts');

    const res = await posts.updateMany({created_by:poster?._id},{$set:{verified:true}});

  

    console.log(res);

  }
  finally {

    await client.close();

  }
}

verifyPosts();