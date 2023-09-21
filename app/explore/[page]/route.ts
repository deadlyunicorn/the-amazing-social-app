import { NextResponse } from "next/server";
import { redirect } from "next/navigation";
import { getPosts } from "../postDisplay/(mongodb)/getPosts";


export async function GET(request: Request, context: { params: { page: number } }) {

  const page = context.params.page;
  try {

    const posts = await getPosts({ page: page });


    return NextResponse.json(posts);

  }
  catch (err) {
    redirect('/explore?error=Network error')
  }

}