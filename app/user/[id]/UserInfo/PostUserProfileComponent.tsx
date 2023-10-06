"use client"

import { userPostWithAvatar } from "@/app/explore/feed/api/mongodb/getPosts";
import { DeletePostComponent } from "@/app/explore/feed/components/postComponent/deletePostComponent";
import { ImageComponent } from "@/app/lib/components/ImageComponent";
import { formatDate, formatHours } from "@/app/lib/formatDate";
import { useState } from "react";

export const PostUserProfileComponent = ({post, ownsProfile}:{post:userPostWithAvatar, ownsProfile: boolean}) =>{
  
  const [deleted,setDeleted] = useState(false);
  
  const postDate = post.created_at;
  const formattedDate = `${formatDate(postDate)} ${formatHours(postDate)}`;


  return (

    <li
      hidden={deleted}
      className="
        bg-gradient-to-b from-slate-50 to-slate-200 
        min-h-[50px] mt-2
        pt-6 pb-2 px-4 relative
        rounded-sm
        border border-dashed border-black">
      <article className="flex flex-col w-full gap-y-4 mt-2">
        
        {post.content.imageURL &&

          <ImageComponent 
            imageURL={post.content.imageURL}
            postId={post._id}

          />
        }
        
        
        <p tabIndex={0}>&gt; {post.content.textContent}</p>
      </article>
      <div className="text-xs absolute right-2 top-2">
        {formattedDate}
      </div>
      <div className="absolute left-2 top-2">
        { ownsProfile && <DeletePostComponent setIsDeleted={setDeleted} postId={post._id}/>}
      </div>
    </li>
  )
}