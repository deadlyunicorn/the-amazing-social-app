"use server"

import { mongoClient } from "@/app/api/mongodb/client";
import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";

const limit = 1;

export const commentGet = async (postId: string, page: number):Promise<commentServer[] | null> => {


  const client = mongoClient;


  try {

    const comments = client.db('the-amazing-social-app-v3').collection('comments');

    const commentIterator = comments.aggregate([{
        $match:{
          postId: new ObjectId(postId)
      }},
      {
        $sort:{
          created_at:1
        }
      },
      {
        $skip:limit*page
      },
      {
        $limit:limit
      }
      
    ]);

    const responseComments:commentServer[] = [];

    for await (const comment of commentIterator){
      const commentServer = comment as unknown as commentServer;
      
      responseComments.push(commentServer);
    }



    return responseComments.length>0?responseComments:null;

  }
  catch (err) {
    redirect(`/explore?error=${err}`);
  }



}


export type commentServer = {
  _id: ObjectId,
  postId: ObjectId,
  created_by: ObjectId,
  content: string,
  created_at: Date,
}