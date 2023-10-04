//use bun or deno

import { getMongoClient } from "@/app/lib/mongoClient";
import { MongoClient, ServerApiVersion } from "mongodb";
import { argv } from "process";

const username = argv[2];

export const verifyPosts = async () : Promise<any> => {

  const client = getMongoClient();




  try {


    const users = client.db('the-amazing-social-app').collection('users');
    const poster = await users.findOne({username:username});
    

    const posts = client.db('the-amazing-social-app').collection('posts');

    const res = await posts.updateMany({created_by:poster?._id},{$set:{verified:true}});

  

    console.log(res);

  }
  finally {

    await client.close();

  }
}

verifyPosts();