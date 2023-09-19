import Link from "next/link"
import Image from "next/image"
import { formatDate, formatHours } from "../(lib)/formatDate"
import { userPost } from "../(mongodb)/getPosts"

export type userPostComplete = userPost & { avatarURL:string } 

export const PostComponent = ({ post }: { post: userPostComplete }) => {

  const postDate = new Date(post.created_at);

  return (
    
    <li
      key={postDate.getTime()}
      className="border border-dashed text-center">
        
      <Link tabIndex={0} href={`user/${post.created_by}`}>
        <Image
          width={50}
          height={50}
          src={post.avatarURL||'/favicon.svg'}
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