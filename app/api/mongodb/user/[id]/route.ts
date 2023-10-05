import { NextRequest, NextResponse } from "next/server";
import { getUserInfo } from "../user";
import { ObjectId } from "mongodb";

export const GET = async( request:NextRequest, context:{ params: { id: string } })=>{

  const id = context.params.id;
  const user = await getUserInfo({ _id: new ObjectId(id) });

  return NextResponse.json( user );
}