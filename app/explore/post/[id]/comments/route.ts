import { NextResponse } from "next/server";
import { commentPost } from "./postComment";
import { deleteComment } from "./deleteComment";


export const POST = async (request:Request,context:{params:{id:string}})=>{
  const body: { comment : string} = await request.json();

  const postId = context.params.id
  const newComment = body.comment;

  if (newComment.length<6){
    throw "Your comment is too short.";
  }

  const mongoRequest = await commentPost(postId,newComment);

  return NextResponse.json( mongoRequest );

}

export const DELETE = async (request:Request,context:{params:{id:string}})=>{
  
  
  const body: { commentId : string} = await request.json();

  const postId = context.params.id
  const commentId = body.commentId;

  const mongoRequest = await deleteComment(postId,commentId);
  
  return NextResponse.json( mongoRequest );

}
