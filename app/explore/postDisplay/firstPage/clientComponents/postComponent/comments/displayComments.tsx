import { userPostWithAvatar } from "@/app/explore/postDisplay/(mongodb)/getPosts";
import { useState } from "react";

export const DisplayComments = ({comments}:{comments:userPostWithAvatar["comments"]}) => {



  const mockCommentArray = ["hello world","hello world","hello world","hello world"]
  const totalComments = mockCommentArray.length;

  const [howManyToLoad,setHowManyToLoad] = useState(1);

  const remainingComments = totalComments-howManyToLoad;
  const singular=remainingComments==1;

  return (

      
      <aside>


        {totalComments > 0 &&
        <>
        



        <div className="flex flex-col gap-y-4">
         {/*latest post first*/}


          {mockCommentArray.slice(0,howManyToLoad).map(  
            comment=>
              <p
                tabIndex={0} 
                className="bg-black bg-opacity-5 px-2 py-1 rounded-md">&gt; {comment}</p>
          )}
        </div>

        {
          howManyToLoad < totalComments && 
           
           <p className="text-center my-4">
              There {singular?"is ":"are "}
              {remainingComments} more{/*post.comments.length*/} comment{!singular&&"s"}.
          </p>
        }

          {
            ( totalComments > 1 && totalComments > howManyToLoad ) &&
              
              <div className="flex w-full justify-center">
                <button 
                  onClick={()=>{
                    if ( totalComments > howManyToLoad )
                    { setHowManyToLoad(howManyToLoad + 2)}
                  }}
                  className="text-link">
                  Load {singular?"It":"More"}
                </button>
              </div>
          }
          

        </>
        }

        {
          totalComments == 0 && 
            <p className="text-center">
              There are no comments for this post.
            </p>
        }

      </aside> 
  )


}
