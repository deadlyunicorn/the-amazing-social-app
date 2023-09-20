"use client"

import { useEffect, useState } from "react";
import { PostComponent, userPostComplete } from "./postComponent/postComponent";

export const DisplayPosts = ({ page, canLoadNext, setCanLoadNext }: { page: number, setCanLoadNext: any, canLoadNext: boolean }) => {

  const [posts, setPosts] = useState<null | userPostComplete[]>(null);

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
              key={new Date(post.created_at).getTime()}
              post={post} />
          )
        )
      }
    </ul>
  )
}

