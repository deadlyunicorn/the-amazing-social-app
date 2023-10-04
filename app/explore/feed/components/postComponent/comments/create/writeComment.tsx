import { InsertOneResult, UpdateResult } from "mongodb";
import { useEffect, useState } from "react";

export const WriteComment = ({postId,setNewComment}:{postId:string,setNewComment:any}) =>{
  
  const [sendingPost,setSending] = useState(false);
  const [comment,setComment] = useState('');

  const [error,setError] = useState(false);

  useEffect(()=>{

    if(sendingPost){

      (async()=>{
        try{
          
          await fetch(`/explore/feed/api/post/${postId}/comments`, { method: "POST", body: JSON.stringify({ comment: comment }) })
            .then(async(res)=>{
              return await res.json();
            })
            .then( (mongoResponse: InsertOneResult<Document>) => {
              if ( !mongoResponse.acknowledged ) {
                throw "Comment was not acknoweledged";
              }
              setNewComment(`${comment}_${mongoResponse.insertedId}_${postId}`);
              setComment('');
            })
        }
        catch(err){
          setError(true);
        }
        finally{
          setSending(false);
        }

      })()

    }
  },[sendingPost])

  useEffect(()=>{

    if(error){
      const timer = setTimeout(()=>{
        setError(false);
      },5000);

      return ()=>{clearTimeout(timer)}
    }

  },[error])


  return (
    <section className="
    relative
    px-0 gap-y-2
    bg-transparent
    flex-col flex 
    justify-start
    items-start w-full">


    <p>Write a comment: </p>
    <textarea 
      aria-label="Input field for commenting to the post above."
      value={comment}
      onChange={(e)=>{
        e.target.style.height = `${e.target.scrollHeight}px`;
        setComment(e.target.value);
      }}
      minLength={6}
      maxLength={300}
      className="
        bg-slate-200
        px-2 py-1 rounded-md
        w-full resize-none"
      
      placeholder={`Such a cool post! \n(atleast 6 letters)`}/>

           
      <div  
        className="
        w-full flex justify-end">

        <button
          tabIndex={0}
          data-tip={ ( comment.length<6 && comment.length !=0) ?"Your comment is too short":undefined}
          disabled={comment.length<6}
          className="
          tooltip tooltip-error
            border min-w-[4.5rem] bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded-md"
          onClick={()=>{
            setSending(true);
          }}>
          {sendingPost ? "Loading..." : "Post" }
        </button>
      </div>

      
      {
        error && 
          <p className="
          disappear
          top-1/2 text-center w-full bg-red-600
          rounded-md px-4 py-2 text-white
          absolute"> 
          There was an error posting your comment.
            <br/>Please try again.
          </p>
      }
      
    </section>
  )
}