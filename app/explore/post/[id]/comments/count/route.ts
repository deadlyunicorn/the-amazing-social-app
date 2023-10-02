import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";
import { getMongoClient } from "@/app/(lib)/mongoClient";
import { withRetry } from "@/app/(lib)/retry";

export const GET = async (request:Request,context:{params:{id:string,page:string}}) =>{
  
  const postId = context.params.id;

  //@ts-ignore
  return NextResponse.json(await withRetry(getCount,5,[postId]))
  

}


const getCount = async( postId:string ) => {

  const client = getMongoClient();
  try {

    const comments = client.db('the-amazing-social-app').collection('comments');

    const commentCount = await comments.countDocuments({postId: new ObjectId(postId)});

    return commentCount;
  }
  finally{
    client.close();
  }

}