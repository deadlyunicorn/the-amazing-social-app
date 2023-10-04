import { formatDate, formatHours } from "@/app/lib/formatDate";
import { userDetailsClient } from "@/app/explore/page";
import Image from "next/image"
import Link from "next/link";
import { useState } from "react";
import { commentClient } from "@/app/explore/feed/api/mongodb/getPosts";
import { DeleteCommentComponent } from "./deleteCommentComponent";

export const CommentComponent = ({
  comment,userDetails
  ,setComments,setCommentCount,setPage}:{
    comment:commentClient,userDetails:userDetailsClient|null,
    setComments:any,setCommentCount:any,
    setPage:any
  }) => {
  
  
  const [loading,setLoading]=useState(false);
  const username = comment.created_by.username;
  const date = new Date(comment.created_at);
  const formattedDate = `${formatDate(date)} ${formatHours(date)}`;
  const commentId = comment._id

  return ( 
  <li 
    className="bg-black bg-opacity-5 px-4 py-1 rounded-md relative">


    <div className="flex w-full justify-between xs:flex-row flex-col items-center">

      <Link href={`/user/${username}`}>@{username}</Link>
      <time className="text-xs">{formattedDate}</time>
    
    </div>


    <div className="flex w-full my-2 gap-x-2">
      <Link className="h-fit" href={`/user/${username}`}>
      <Image 
        placeholder="blur"
        blurDataURL="/favicon.svg"
        className="max-h-6 rounded-full min-h-6 min-w-[24px]"
        src={comment.created_by.avatarSrc||'/favicon.svg'}
        alt="commenter's avatar"
        width={24}
        height={24}/>
      </Link>
      <p 
        tabIndex={0}>{comment.content}</p>
    </div>

    { (username == userDetails?.username) &&
      <div className="w-full flex justify-end">

        
      <DeleteCommentComponent 
        comment={comment} 
        setLoading={setLoading} loading={loading}
        setComments={setComments} setCommentCount={setCommentCount}
        setPage={setPage}
      />

        
      </div>
    }


  </li>
)


}

