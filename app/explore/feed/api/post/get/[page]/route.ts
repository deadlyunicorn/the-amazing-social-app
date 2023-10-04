import { NextResponse } from "next/server";
import { redirect } from "next/navigation";
import { withRetry } from "@/app/lib/retry";
import { getPosts } from "../../../mongodb/getPosts";


export async function GET(request: Request, context: { params: { page: number } }) {

  const page = context.params.page;
  try {

    //@ts-ignore
    const posts = await withRetry(getPosts,5,[{ page: page, explore:true }]).catch(err=>null);


    return NextResponse.json(posts);

  }
  catch (err) {
    redirect('/explore?error=Network error')
  }

}