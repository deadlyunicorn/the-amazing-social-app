"use client"

import { userPost } from "../(mongodb)/getPosts"
import { useEffect, useState } from "react";
import { PostComponent } from "./postComponent";

export const DisplayPosts = ({ page, loading, setLoading }: { page: number, setLoading: any, loading: boolean }) => {

  const [posts, setPosts] = useState<null | userPost[]>(null);
  useEffect(() => {

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 5000);


    (async () => {

      setLoading(true);

      await fetch(`http://localhost:3000/explore/posts/${page}`, {
        method: "GET",
      })

        .then(async (res) => {
          setLoading(false);
          return await res.json()
        })
        .then((posts) => {
          setPosts(posts);
        })
    })()

    return () => {
      clearTimeout(timeout);
    };

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
        : loading
          ? <p className="text-center">Loading...</p>
          : <p className="text-center">There are no more posts..</p>
      }
    </>
  )
}

