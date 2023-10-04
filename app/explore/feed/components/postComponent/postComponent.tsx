"use client" //force use client even if it was child of a server component
import { userPostWithAvatar } from "../../api/mongodb/getPosts"
import { LikeComponent } from "./likeComponent"
import { userDetailsClient } from "../../../page"
import { CommentsSection } from "./comments/CommentsSection"
import { ImageComponent } from "../../../../lib/components/ImageComponent"
import { PosterDetails } from "./posterDetails"
import { useState } from "react"
import { DeletePostComponent } from "./deletePostComponent"


export const PostComponent = ({ post, userDetails }: { post: userPostWithAvatar, userDetails: userDetailsClient | null }) => {

  const postId = post._id;


  const imageURL = post.content.imageURL;
  
  const [isDeleted,setIsDeleted] = useState(false);

  /*
  const [edgeY,setEdgeY] = useState(0);

  useEffect( ()=> {

    const sectionEnd = document.getElementById(`${postId}_li`);
    //@ts-ignore
    setEdgeY(sectionEnd?.getBoundingClientRect().bottom + window.scrollY);
    
  },[viewY])

  const isOnView = ! ( ( viewY - edgeY > 900 ) || ( viewY - edgeY < -400 ) );
  */
  

  return (

    <li
      data-isdeleted={isDeleted}
      id={`${postId}_li`}
      key={postId}
      className="
      xs:px-2 my-4 
      data-[isdeleted=true]:hidden
      ">
      <PosterDetails post={post}/>


      <article
        className="
        border-x border-black border-dashed
        drop-shadow-md
        flex flex-col gap-y-4
        rounded-b
        bg-gradient-to-b from-slate-50 to-slate-200 
        px-4 py-4 mr-6 ">

        {(imageURL && imageURL.length > 0) &&
          <ImageComponent imageURL={imageURL} postId={postId}/>
        }

        <p tabIndex={0} aria-label="post content">
          {post.content?.textContent}
        </p>

        <aside 
          className="flex flex-col">

          { userDetails?.username == post.created_by &&
            
            <div className="place-self-end">
              <DeletePostComponent setIsDeleted={setIsDeleted} postId={postId}/>
            </div>
              
          }
          <LikeComponent 
            userDetails={userDetails} post={post} />
          <CommentsSection userDetails={userDetails} post={post}/>

          
        </aside>



      </article>

    </li>
  )
}




export const MockPostComponent = () => {

  const random = Math.random();

  return (

    <div
      style={{ height: random * 100 * 5 }}
      className="
      xs:px-2 my-4
      min-h-[100px]
      mx-8
      bg-slate-200 rounded-2xl
      flex justify-between"/>

  )
}

