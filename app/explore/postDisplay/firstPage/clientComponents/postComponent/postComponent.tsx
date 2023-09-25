"use client" //force use client even if it was child of a server component


import Link from "next/link"
import Image from "next/image"
import { formatDate, formatHours } from "../../../../../(lib)/formatDate"
import { userPostWithAvatar } from "../../../(mongodb)/getPosts"
import { LikeComponent } from "./likeComponent"
import { userDetailsClient } from "../../../../page"
import { CommentComponent } from "./comments/commentComponent"
import { ConfirmationDialog } from "@/app/(components)/ConfirmationDialog"


export const PostComponent = ({ post, userDetails }: { post: userPostWithAvatar, userDetails: userDetailsClient | null }) => {

  const postDate = new Date(post.created_at);

  const imageURL = post.content.imageURL;

  return (

    <li
      key={postDate.getTime()}
      className="px-2 my-4 ">


      <div className="
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


      <article
        className="
        border-x border-black border-dashed
        drop-shadow-md
        flex flex-col gap-y-4
        rounded-b
        bg-gradient-to-b from-slate-50 to-slate-200 
        px-4 py-4 mr-6 " tabIndex={0}>

        {(imageURL && imageURL.length > 0) &&
          <div className="place-self-center">
            <Image
              // @ts-ignore
              onClick={()=>document.getElementById(`${post._id}_modal2`).showModal()}
              className="aspect-auto cursor-pointer"
              src={imageURL}
              alt="No post image description provided"
              width={200}
              height={200}
            />

            <dialog id={`${post._id}_modal2`} className="modal">
              <div className="modal-box bg-stone-900 text-white">
                <Image
                  src={imageURL}
                  alt="No post image description provided"
                  width={1000}
                  height={1000}
                />
                <form method="dialog" className="mt-4">
                  <button className="btn capitalize">Close</button>
                </form>

              </div>
              <form method="dialog" className="modal-backdrop">
                <button>close</button>
              </form>
            </dialog>
          </div>
          
          }

        <p>{post.content?.textContent}</p>

        <aside className="flex flex-col">
          {userDetails?.username==post.created_by&&<DeletePost/>}
          <LikeComponent userDetails={userDetails} post={post} />
          <CommentComponent userDetails={userDetails} post={post}/>


        </aside>



      </article>

    </li>
  )
}

const DeletePost = () =>{
  
  return (
  <>
  <button
  // @ts-ignore
    onClick={()=>{document.getElementById('postid')?.showModal()}} 
    className="text-end text-error-light-reactive capitalize">delete post</button>
  <ConfirmationDialog id="postid" textContent="Press 'CONFIRM' to confirm your post's deletion.">
    <button className="btn text-red-600">Confirm</button>
  </ConfirmationDialog>
  </>
  )
}




export const MockPostComponent = () => {

  const random = Math.random();

  return (

    <div
      style={{ height: random * 100 * 3 }}
      className="
      px-2 my-4
      min-h-[100px]
      mx-8
      bg-slate-200 rounded-2xl
      flex justify-between"/>

  )
}