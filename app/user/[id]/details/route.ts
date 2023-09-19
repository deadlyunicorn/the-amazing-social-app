import { getUserInfo } from "@/app/(mongodb)/user"
import { NextResponse } from "next/server"
import { cache } from "react";


export const revalidate = 1800;

export const GET = cache(async(request:Request,context:{params:{id:string}})=>{

  const user = await getUserInfo({username:context.params.id});

  return NextResponse.json(
    {
      username:user?.username,
      avatarURL:user?.avatarSrc,
      age:user?.age,
      description:user?.description
    })
})

export type userDetailsSafe = {
    username:string,
    avatarURL:string,
    age:string,
    description:string
}