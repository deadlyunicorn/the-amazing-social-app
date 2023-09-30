import Link from "next/link"
import Image from "next/image"
import { formatDate, formatHours } from "@/app/(lib)/formatDate"
import { userPostWithAvatar } from "../../../(mongodb)/getPosts"

export const PosterDetails = ({post}:{post:userPostWithAvatar}) => {
  
  const postDate = new Date(post.created_at);

  return (

  <div 
    className="
      mt-1 mr-2
      border-dashed border-t  border-x border-black
      overflow-hidden
      bg-gradient-to-b from-slate-50 to-slate-200 
      drop-shadow-md
      rounded-r-2xl 
      flex justify-between">

    <div className="
      flex  gap-x-2
      flex-row-reverse justify-end">


      <Link
        className="self-end peer"
        tabIndex={0} href={`user/${post.created_by}`}>

        <p >@{String(post.created_by)}</p>

      </Link>

      <Link
        className="peer hover:brightness-110 peer-hover:brightness-110  "
        href={`user/${post.created_by}`}>
        <Image
          placeholder="blur"
          blurDataURL="/favicon.svg"
          className="rounded-r-full h-[50px] object-cover"
          width={50}
          height={50}
          src={post.avatarURL || '/favicon.svg'}
          alt={`${post.created_by}'s avatar`} />

      </Link>


    </div>

    <time className="flex justify-end gap-x-2 py-1 px-2 ">
      <p>{formatDate(postDate)}</p>
      <p>{formatHours(postDate)}</p>
    </time>

  </div>
  )
}