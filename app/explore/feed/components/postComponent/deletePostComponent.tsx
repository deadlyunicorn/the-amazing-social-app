'use client'

import { ConfirmationDialog } from "@/app/lib/components/ConfirmationDialog";
import { useEffect, useState, useTransition } from "react"

export const DeletePostComponent = ( { postId, setIsDeleted }: { postId: string, setIsDeleted?:(bool:boolean)=>void } ) =>{

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);


  useEffect(()=>{
    if (error){
      const timer = setTimeout(()=>{
        setError(false);
      },3000)
    }
  },[error]) 

  return (
  <>
    {error
    
    ?<p className="capitalize text-error">There was an error</p>
    
    :loading
    
      ?<p className="text-error">Deleting..</p>
      :<button
        onClick={()=>{
          //@ts-ignore
          document.getElementById(`${postId}_modal`)?.showModal()
        }} 
        className="
        flex 
        text-end text-error-light-reactive 
        capitalize">
          delete post
      </button>
    }

      

      <ConfirmationDialog id={`${postId}_modal`} textContent="Press 'CONFIRM' to confirm your post's deletion.">
        <button 
          tabIndex={0}
          onClick={()=>{
            setLoading(true)
            //@ts-ignore
            document.getElementById(`${postId}_modal`)?.close();
            
              (async()=>{
                try{
                  const response = await deletePost({postId});
                  
                  if ( response.deleted ){

                    if ( setIsDeleted !== undefined){
                      setIsDeleted(true);
                    }
  
                  }
                }
                catch(err){
                  setError(true);
                }
                finally{
                  setLoading(false);
                }
              })()
          }}
          className="btn text-red-600">Confirm</button>
      </ConfirmationDialog>
  </>
  )
}

const deletePost = async( { postId } : { postId : string } ) => {

  const url = `${process.env.SERVER_URL}/explore/feed/api/post/${postId}/delete`;

  const deleteRequest = await fetch( url, {
    method: "DELETE",
    body: JSON.stringify({
      postId: postId
    })
  });

  return await deleteRequest.json() as deleteResponse;
 
  

}

type deleteResponse ={
  deleted: boolean
}