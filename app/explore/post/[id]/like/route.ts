import { NextResponse } from "next/server";
import { likePost } from "../../../(mongodb)/likePost";


export async function POST(request:Request,context:{params:{id:string}}){


  const body: { like : boolean} = await request.json();

  const postId = context.params.id
  const hasLiked = body.like;


  const mongoRequest = await likePost(postId,hasLiked);
  return NextResponse.json( mongoRequest );

}