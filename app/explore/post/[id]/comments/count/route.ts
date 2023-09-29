import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";
import { getMongoClient } from "@/app/(lib)/mongoClient";

export const GET = async (request:Request,context:{params:{id:string,page:string}}) =>{

  const postId = context.params.id;

  const client = getMongoClient();
  try {

    const comments = client.db('the-amazing-social-app').collection('comments');

    const commentCount = await comments.countDocuments({postId: new ObjectId(postId)});

    return NextResponse.json( commentCount );
  }
  finally{
    client.close();
  }

}