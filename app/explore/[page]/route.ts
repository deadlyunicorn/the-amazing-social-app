import { getPosts } from "@/app/(mongodb)/getPosts";
import { getUserInfo } from "@/app/(mongodb)/user";
import { NextResponse } from "next/server";
import { PostsToClient } from "./postsProcess";


export async function GET(request:Request,context: {params:{page:number}} ){

  const page = context.params.page;

  const posts = await getPosts({page:page});

  
  if ( posts && posts.length > 0 ){

    const res= await PostsToClient(posts);
      
    return NextResponse.json(res);

  }
  else{
    return NextResponse.json(posts);
  }

}