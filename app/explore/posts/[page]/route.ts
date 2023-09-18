import { getPosts } from "@/app/(mongodb)/getPosts";
import { NextResponse } from "next/server";

export async function GET(request:Request,context: {params:{page:number}} ){

  const page = context.params.page;

  return NextResponse.json(await getPosts({page:page}));
}