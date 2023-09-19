import Link from "next/link"
import Image from "next/image"
import { formatDate } from "../(lib)/formatDate"
import { userPost } from "../(mongodb)/getPosts"

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