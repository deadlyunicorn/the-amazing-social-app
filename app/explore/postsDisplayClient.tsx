"use client"

import { useEffect, useState } from "react";
import { PostComponent, userPostComplete } from "./postComponent";

export const DisplayPosts = ({ page, canLoadNext, setCanLoadNext }: { page: number, setCanLoadNext: any, canLoadNext: boolean }) => {

  const [posts, setPosts] = useState<null | userPostComplete[]>(null);
  const [loading,setLoading] = useState(false);

  useEffect(() => {

    (async () => {

      setLoading(true);
      setCanLoadNext(false);

      try{

      await fetch(`/explore/posts/${page}`, {
        method: "GET",
      })

        .then(async (res) => {
          return await res.json()
        })
        .then((posts) => {
          setPosts(posts);
        })
      }
      finally{
        setCanLoadNext(true);
        setLoading(false);
      }


    })()

  }, [])

  return (

    <>
      <h1>Page {page}</h1>
      {posts && posts.length > 0
        ? <ul>

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
        : loading && <p className="text-center">Loading...</p>
      }
    </>
  )
}

