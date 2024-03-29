"use client"
import { userDetailsClient } from "@/app/explore/page"
import {  userPostWithAvatar } from "../../../api/mongodb/getPosts"
import { CommentsFeed } from "./feed/CommentsFeed"
import {  useState } from "react"
import Link from "next/link"
import { WriteComment } from "./create/writeComment"

 //force use client even if it was child of a server component


export const CommentsSection = ({post,userDetails}:{post:userPostWithAvatar,userDetails:userDetailsClient|null}) => {

  const [newComment,setNewComment] = useState<string|undefined>(undefined);  

  return (
    <article 
      className="
        border-t border-black border-dashed
        pt-2 mt-4">



      {userDetails
      ?<WriteComment setNewComment={setNewComment}  postId={post._id}/>      
      :<LoginToComment/>
      }
      <CommentsFeed 
        newComment={newComment} 
        postId={post._id} 
        commentsInitialCount={post.comments.length}
        userDetails={userDetails}/>
      

    </article>
  )
}

const LoginToComment = () => {

  return (
    <p 
      className="text-center my-4">
        <Link tabIndex={0} href={'/login'}>
          Set up your account
        </Link>
      <br/> 
      to write a comment.
    </p>
  )
}




