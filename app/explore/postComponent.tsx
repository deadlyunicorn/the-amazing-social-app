import Link from "next/link"
import Image from "next/image"
import { formatDate, formatHours } from "../(lib)/formatDate"
import { userPost } from "../(mongodb)/getPosts"
import { useEffect, useState } from "react"
import { userDetailsSafe } from "../user/[id]/details/route"

export const PostComponent = ({ post }: { post: userPost }) => {

  const postDate = new Date(post.created_at);
  const [avatarURL,setAvatarURL] = useState<null|string>(null);
  const [loading,setLoading] = useState(true);

  useEffect(()=>{
    
    (async()=>{
      fetch(`/user/${post.created_by}/details`)
      .then(async(res)=>await res.json())
      .then((user:userDetailsSafe)=>{setAvatarURL(user.avatarURL)});


    })()
  },[])

  return (
    
    <li
      key={postDate.getTime()}
      className="border border-dashed text-center">
        
      <Link href={`user/${post.created_by}`}>
        <Image
          width={50}
          height={50}
          src={avatarURL||'/favicon.svg'}
          alt={`${post.created_by}'s avatar`}/>
        @{post.created_by}
        
      </Link>
      

      {(post.content.imageURL && post.content.imageURL.length > 0) &&
        <Image
          className="aspect-square"
          src={post.content.imageURL}
          alt=""
          width={200}
          height={200}
        />}

      <article>
        {post.content?.textContent}
      </article>
      
      <time className="flex justify-end gap-x-2  ">
        <p>{formatDate(postDate)}</p>
        <p>{formatHours(postDate)}</p>
      </time>
    </li>
  )
} 