import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

export const GET = async (request:Request,context:{params:{id:string,page:string}}) =>{

  const postId = context.params.id;

  const client = new MongoClient(process.env.MONGODB_URI!);
  try {

    const comments = client.db('the-amazing-social-app').collection('comments');

    const commentCount = await comments.countDocuments({postId: new ObjectId(postId)});

    return NextResponse.json( commentCount );
  }
  finally{
    client.close();
  }

}