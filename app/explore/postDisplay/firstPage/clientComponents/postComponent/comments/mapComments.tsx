import { ConfirmationDialog } from "@/app/(components)/ConfirmationDialog";
import { formatDate, formatHours } from "@/app/(lib)/formatDate";
import { userDetailsClient } from "@/app/explore/page";
import { commentClient } from "@/app/explore/postDisplay/(mongodb)/getPosts"
import { UpdateResult } from "mongodb";
import Image from "next/image"
import Link from "next/link";
import { useEffect, useState } from "react";


export const MapComments = (
  {comments,userDetails
    ,setComments,setCommentCount,setPage
  }:{
    comments:commentClient[],userDetails:userDetailsClient|null,
    setComments:any,setCommentCount:any,setPage:any
  }) => {

  return ( 
      comments.map(  
        (comment,key)=>{
          return <CommentComponent 
            key={key} comment={comment} setCommentCount={setCommentCount}
            userDetails={userDetails} setComments={setComments}
            setPage={setPage}/>
        }
      )
  )
}

const CommentComponent = ({
  comment,userDetails
  ,setComments,setCommentCount,setPage}:{
    comment:commentClient,userDetails:userDetailsClient|null,
    setComments:any,setCommentCount:any,
    setPage:any
  }) => {
  
  
  const [loading,setLoading]=useState(false);
  const username = comment.created_by.username;
  const date = new Date(comment.created_at);
  const formattedDate = `${formatDate(date)} ${formatHours(date)}`;
  const commentId = comment._id

  return ( 
  <li 
    className="bg-black bg-opacity-5 px-4 py-1 rounded-md relative">


    <div className="flex w-full justify-between">

      <Link href={`/user/${username}`}>@{username}</Link>
      <p className="text-xs">{formattedDate}</p>
    
    </div>


    <div className="flex w-full my-2 gap-x-2">
      <Link className="h-fit" href={`/user/${username}`}>
      <Image 
        placeholder="blur"
        blurDataURL="/favicon.svg"
        className="max-h-6 rounded-full min-h-6 min-w-[24px]"
        src={comment.created_by.avatarSrc||'/favicon.svg'}
        alt="commenter's avatar"
        width={24}
        height={24}/>
      </Link>
      <p 
        tabIndex={0}>{comment.content}</p>
    </div>

    { (username == userDetails?.username) &&
      <div className="w-full flex justify-end">

        {loading
        
          ?<button>Loading...</button>
          
          :<button
            // @ts-ignore
            onClick={()=>{document.getElementById(commentId).showModal()}}
            className="
              capitalize
              hover:underline
              justify-self-end
              text-error-light-reactive">
                
                delete comment
                
          </button>
        }
        <ConfirmDelete 
          setLoading={setLoading} 
          comment={comment}
          setCommentCount={setCommentCount}
          setComments={setComments}
          setPage={setPage} />


        
      </div>
    }


  </li>
)


}


const ConfirmDelete = ({
  comment,setComments,
  setLoading,setCommentCount,setPage}:{
    comment:commentClient,setComments:any,
    setLoading:any,setCommentCount:any,setPage:any}) => {

  const [error,setError] = useState(false);
  const commentId = comment._id;

  useEffect(()=>{
    if(error){
      const timer = setTimeout(()=>{
        setError(false);
      },5000)

      return ()=>{
        clearTimeout(timer);
      }
    }
  },[error])

  return (
    <>
    <ConfirmationDialog id={commentId} textContent="Press 'Confirm' to permanently delete your comment.">
    <button 
      tabIndex={0}
      onClick={()=>{
        (async()=>{
          setLoading(true);
          // @ts-ignore
          document.getElementById(commentId)?.close();
          
          try{
            await deleteComment(commentId,comment.postId)
            .then((MongoResult)=>{
              if ( !MongoResult.acknowledged ){
                throw "Couldn't remove comment";
              }
            })
            setComments( (previousValue:commentClient[]) => {
              let keep = true;
              return previousValue.filter(
                (commentInState,index)=>{
                  if (commentInState._id == commentId){
                    setPage(index+1);
                    keep=false;
                  }
                  return keep;
                }
              )
            });
            setCommentCount((previousValue:number)=>previousValue-1);
          }
          catch(error){
            setError(true);
          }
          finally{
            setLoading(false);
          }
          
          
        })()
        
        
      }}
      className="btn capitalize text-error-light hover:underline">
        Confirm
     </button>
    </ConfirmationDialog>
    {error && 
    <p className="
      disappear
      absolute py-2
      text-center
      bg-red-600 text-white 
      w-full left-0 px-2 rounded-md">

      There was an error with your request. 
      <br/>Please try again.

    </p>}
    </>
  )
}

const deleteComment = async(commentId:string,postId:string) => {
  return await fetch(
    `/explore/post/${postId}/comments`,{
      method:'DELETE',
      body:JSON.stringify({commentId:commentId})
    })
    .then(async(res)=>{return await res.json()})
    .then((MongoResponse:UpdateResult)=>{
      return MongoResponse;
    })
}