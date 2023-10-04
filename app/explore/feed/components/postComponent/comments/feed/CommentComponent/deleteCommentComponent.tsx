"use client"

import { commentClient } from "@/app/explore/feed/api/mongodb/getPosts";
import { ConfirmationDialog } from "@/app/lib/components/ConfirmationDialog";
import { UpdateResult } from "mongodb";
import { useEffect, useState } from "react";

export const DeleteCommentComponent = ({
  comment,setComments, loading,
  setLoading,setCommentCount,setPage
}:{
    comment:commentClient,setComments:any, loading:boolean,
    setLoading:any,setCommentCount:any,setPage:any
  }) => {

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
      
          </p>
        }
    
    </>
  )
}

const deleteComment = async(commentId:string,postId:string) => {
  return await fetch(
    `${process.env.SERVER_URL}/explore/feed/api/post/${postId}/comments`,{
      method:'DELETE',
      body:JSON.stringify({commentId:commentId})
    })
    .then(async(res)=>{return await res.json()})
    .then((MongoResponse:UpdateResult)=>{
      return MongoResponse;
    })
}


