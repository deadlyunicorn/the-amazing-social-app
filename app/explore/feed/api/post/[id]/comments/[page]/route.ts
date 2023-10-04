import { NextResponse } from "next/server";
import { commentGet } from "../getComments";
import { withRetry } from "@/app/lib/retry";
import { getUserInfo } from "@/app/api/mongodb/user";

export const GET = async (request:Request,context:{params:{id:string,page:string}}) =>{

  const postId = context.params.id;
  const page = + context.params.page;

  //@ts-ignore
  const comments = await withRetry(commentGet,5,[postId,page-1]).catch(err=>null)
  .then(async(res)=>{
    if (res){
      return await Promise.all(res.map(
        async(comment)=>{
          //@ts-ignore
          const creator = await withRetry(getUserInfo,5,[{_id:comment.created_by}]).catch(err=>null);
          return creator ? {
            ...comment,
            _id:comment._id.toString(),
            postId:postId.toString(),
            created_by: {
              username: creator?.username,
              avatarSrc: creator?.avatarSrc
            }
          }
          :{
            ...comment,
            _id:comment._id.toString(),
            postId:postId.toString(),
            created_by: {
              username: "Deleted User",
              avatarSrc: undefined
            }
          }

        }
      ))
    }
    else{
      return res;
    }
  })


  return NextResponse.json( comments||[] );


}