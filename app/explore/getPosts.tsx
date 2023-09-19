"use client"

import Image from "next/image"
import { userPost } from "../(mongodb)/getPosts"
import { useEffect, useState } from "react";
import { formatDate } from "../(lib)/formatDate";
import Link from "next/link";

export const DisplayPosts = ({ page,loading,setLoading }: { page: number,setLoading:any,loading:boolean }) => {

  const [posts, setPosts] = useState<null | userPost[]>(null);
  useEffect(() => {

    const timeout = setTimeout(() => {
      setLoading(false);
    },5000);


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
        ? posts.map(
          (post) => (
            <PostComponent 
              key={new Date(post.created_at).getTime()}
              post={post} />
          )
        )
        : loading
          ?<p className="text-center">Loading...</p>
          :<p className="text-center">There are no more posts..</p>
      }
    </>
  )
}

export const PostComponent = ({ post }: { post: userPost }) => {


  return (
    <li
      key={new Date(post.created_at).getTime()}
      className="border border-dashed text-center">
      <Link href={`user/${post.created_by}`}>@{post.created_by}</Link>{formatDate(new Date(post.created_at))}

      {(post.content.imageURL && post.content.imageURL.length > 0) &&
        <Image
          className="aspect-square"
          src={post.content.imageURL}
          alt=""
          width={200}
          height={200}
        />}
      <br />
      {post.content?.textContent}
      <br />
    </li>
  )
} 