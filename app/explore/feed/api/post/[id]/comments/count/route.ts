import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { mongoClient } from "@/app/api/mongodb/client";
import { withRetry } from "@/app/lib/retry";

export const GET = async (request:Request,context:{params:{id:string,page:string}}) =>{
  
  const postId = context.params.id;

  //@ts-ignore
  return NextResponse.json(await withRetry(getCount,5,[postId]).catch(err=>null))
  

}


const getCount = async( postId:string ) => {

  const client = mongoClient;
  const comments = client.db('the-amazing-social-app-v3').collection('comments');

  const commentCount = await comments.countDocuments({postId: new ObjectId(postId)});

  return commentCount;
 

}