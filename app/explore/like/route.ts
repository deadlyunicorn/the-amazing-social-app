import { NextResponse } from "next/server";
import { toggleLike } from "../(mongodb)/likePost";

export async function POST(request:Request){


  const body: {postId:string} = await request.json();

  return NextResponse.json( await toggleLike(body.postId));
  
 
      
  // return NextResponse.json(res);


}