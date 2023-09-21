import { PostComponent } from "../../postComponent/postComponent";
import { userDetailsClient } from "../../../page";
import {  userPostWithAvatar } from "@/app/(mongodb)/getPosts";
import { useEffect, useState } from "react";

export const FetchPostsClient = ({ page, userDetails,setCanLoadNext }: { page: number, userDetails: userDetailsClient | null,setCanLoadNext:any }) => {

  const [posts, setPosts] = useState<null | userPostWithAvatar[]>(null);

  useEffect(() => {

    setCanLoadNext(false);
    (async () => {
      await fetch(`/explore/${page}`, { method: "GET" })
        .then( async(res) => await res.json()
        .then( posts => {
          
          setPosts(posts)
        }))
        .finally(()=>{
          setCanLoadNext(true) 
        })
    }
    )()

  }, [])


  return (

    <>
      {
        (posts && posts.length > 0) &&
        <ul>
          {
            posts.map(
              (post) => (
                <PostComponent
                  userDetails={userDetails}
                  key={new Date(post.created_at).getTime()}
                  post={post} />
              )
            )
          }
        </ul>
      }
    </>
  )
}

