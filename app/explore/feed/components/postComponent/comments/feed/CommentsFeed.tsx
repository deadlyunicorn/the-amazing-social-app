'use client'
import { useEffect, useState } from "react";
import { CommentComponent  } from "./CommentComponent/CommentComponent";

export const CommentsFeed = (
  {postId,newComment,
    userDetails,commentsInitialCount
  }:{
    postId:string,newComment:string|undefined,
    userDetails:userDetailsClient|null,
    commentsInitialCount:number
  }) => {


  const [comments,setComments] = useState<commentClient[]>([]); 
  const [page,setPage] = useState(1);
  const [commentCount,setCommentCount] = useState(0);
  const [loading,setLoading] = useState(true);

  const commentsLoaded = comments.length;


  useEffect(()=>{


    if ( ( loading || page < 2 ) && commentsInitialCount > 0 ){
      (async()=>{
        try{
          await getPostComments(postId,page)
          .then(res=>{
            setComments([...comments,...res]);
            setPage(page+1);
          })
        }
        catch(err){
          
        }
        finally{
          setLoading(false);
        }
      })();
    }
    else{
      setLoading(false)
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
      setComments([...comments,commentWhole]);
    }
  },[newComment])

  useEffect(()=>{

    (async()=> {
      await getCommentCount(postId)
    .then(count=>{
      setCommentCount(count);
    })
    })()

  },[comments])

  



  const remainingComments = commentCount-commentsLoaded;
  const singular=remainingComments==1;

  return (

      
      <aside>

        <div className="bg-opacity-5 bg-black py-2 rounded-md">
          <h3 className="my-2 px-2">Comments</h3>

          {
            (commentCount > 0 && comments) &&

              <div className="flex flex-col gap-y-4 my-2">
              
                {comments.map(  
                  (comment,key)=>(
                    <CommentComponent 
                      key={key} comment={comment} setCommentCount={setCommentCount}
                      userDetails={userDetails} setComments={setComments}
                      setPage={setPage}/>
                  )
                )}

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
    `/explore/feed/api/post/${postId}/comments/${page}`,
    {method:'GET'}
  )
  .then( async(comments) => {
    if ( !comments.ok ) throw "Something went wrong";
    return await comments.json();
  })

}

const getCommentCount = async(postId:string) =>{

  return await fetch(
    `/explore/feed/api/post/${postId}/comments/count`,
    {method:'GET'}
  )
  .then( async(comments) => {
    if ( !comments.ok ) throw "Something went wrong";
    return await comments.json();
  })

}

type commentClient = {
  _id: string,
  postId: string,
  created_by: {
    username: string | undefined,
    avatarSrc: string | undefined
  },
  content: string,
  created_at: Date,
}

type userDetailsClient =  {
  _id: string;
  age: number;
  email: string;
  username: string;
  avatarSrc?: string;
  description?: string;
};