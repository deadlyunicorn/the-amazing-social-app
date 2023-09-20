import { getPosts } from "@/app/(mongodb)/getPosts";
import { getUserInfo } from "@/app/(mongodb)/user";
import { NextResponse } from "next/server";


export async function GET(request:Request,context: {params:{page:number}} ){

  const page = context.params.page;

  const posts = await getPosts({page:page});

  
  if ( posts && posts.length > 0 ){

    const res = await Promise.all(posts.map(async(post)=>{

      const avatarURL = (await getUserInfo({username:post.created_by}))?.avatarSrc;

      return{
          ...post,
          created_at:post.created_at.getTime(),
          avatarURL:avatarURL
        }
      }
      ))
    return NextResponse.json(res);

  }
  else{
    return NextResponse.json(posts);
  }

}