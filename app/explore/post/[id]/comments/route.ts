import { NextResponse } from "next/server";
import { likePost } from "../../../(mongodb)/likePost";


export async function POST(request:Request,context:{params:{id:string}}){


  const body: { comment : string} = await request.json();

  const postId = context.params.id
  const newComment = body.comment;

  console.log(postId,newComment)


  // const mongoRequest = await likePost(postId,newComment);
  // return NextResponse.json( mongoRequest );
  return NextResponse.json( {comment:newComment} );

}