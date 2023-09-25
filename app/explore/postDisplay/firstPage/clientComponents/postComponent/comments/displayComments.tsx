'use client'
import { formatDate } from "@/app/(lib)/formatDate";
import { userDetailsClient } from "@/app/explore/page";
import { commentClient, userPostWithAvatar } from "@/app/explore/postDisplay/(mongodb)/getPosts";
import { useEffect, useState } from "react";
import { MapComments } from "./mapComments";

export const DisplayComments = ({postId,newComment,userDetails}:{postId:string,newComment:string|undefined,userDetails:userDetailsClient|null}) => {


  const [comments,setComments] = useState<commentClient[]>([]); 
  const [page,setPage] = useState(1);
  const [commentCount,setCommentCount] = useState(0);
  const [loading,setLoading] = useState(true);

  const commentsLoaded = comments.length;


  useEffect(()=>{


    if (loading||page<2){
      (async()=>{
        try{
          await getPostComments(postId,page)
          .then(res=>{
            setComments([...comments,...res]);
            setPage(page+1);
          })
        }
        finally{
          setLoading(false);
        }
      })();
    }
    

  },[comments,loading])

  useEffect(()=>{
    if (newComment){

      const [content,commentId,postId] = newComment.split('_'); 

      const commentWhole:commentClient = {
        _id:commentId,
        content:content,
        created_at:new Date(),
        created_by:{
          username:userDetails?.username,
          avatarSrc:userDetails?.avatarSrc
        },
        postId:postId
      }
      setCommentCount(commentCount+1);
      setComments([commentWhole,...comments]);
    }
  },[newComment])

  useEffect(()=>{

    getCommentCount(postId)
    .then(count=>{
      setCommentCount(count);
    })

  },[comments])

  



  const remainingComments = commentCount-commentsLoaded;
  const singular=remainingComments==1;

  return (

      
      <aside>

        <div className="bg-opacity-5 bg-black px-2 py-2 rounded-md">
          <h3>Comments</h3>

          {
            (commentCount > 0 && comments) &&

              <div className="flex flex-col gap-y-4 ">
              
                  <MapComments 
                    userDetails={userDetails} 
                    comments={comments} 
                    setComments={setComments}
                    setCommentCount={setCommentCount}
                    setPage={setPage}/>

                {
                !loading && 
                <>

                {
                   ((commentCount > commentsLoaded) && ( commentCount >= page)) &&
                  
                  <>
                  <p className="text-center">
                      There {singular?"is ":"are "}
                      {remainingComments} more{/*post.comments.length*/} comment{!singular&&"s"}.
                  </p>

                  {
                    remainingComments > 0  &&
                      
                      <div className="flex w-full justify-center">
                        <button 
                          onClick={()=>{setLoading(true)}}
                          className="text-link">
                          Load {singular?"It":"More"} 
                        </button>
                      </div>
                  }

                  </>
                  
                }

                
                </>

                }
              
              </div>
          }

          {
          (commentCount == 0 && !loading) &&  
            <p className="text-center my-4">
              There are no comments for this post.
            </p>
          }
          {
            loading &&
            <p className="text-center py-2">
              Loading...
            </p>
          }

        </div>

        

      </aside> 
  )


}



const getPostComments = async(postId:string,page:number) =>{

  return await fetch(
    `/explore/post/${postId}/comments/${page}`,
    {method:'GET'}
  )
  .then( async(comments) => {
    if ( !comments.ok ) throw "Something went wrong";
    return await comments.json();
  })

}

const getCommentCount = async(postId:string) =>{

  return await fetch(
    `/explore/post/${postId}/comments/count`,
    {method:'GET'}
  )
  .then( async(comments) => {
    if ( !comments.ok ) throw "Something went wrong";
    return await comments.json();
  })

}