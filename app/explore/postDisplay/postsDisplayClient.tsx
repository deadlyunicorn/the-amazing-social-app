"use client"

import { useEffect, useState } from "react";
import { PostComponent, userPostWithAvatar } from "./postComponent/postComponent";
import { userDetailsClient } from "../page";

export const DisplayPosts = ({ page, canLoadNext, setCanLoadNext,userDetails }: { page: number, setCanLoadNext: any, canLoadNext: boolean,userDetails:userDetailsClient|null }) => {

  const [posts, setPosts] = useState<null | userPostWithAvatar[]>(null);

  useEffect(() => {
    
    setCanLoadNext(false);

    (async () => {

      try {

        await fetch(`/explore/${page}`, {
          method: "GET",
        })
          .then( async (res) => await res.json() )
          .then( posts => { setPosts(posts); });
      }
      finally {
        setCanLoadNext(true);
      }


    })()

  }, [])

  return (

    posts && posts.length > 0 &&

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
  )
}

