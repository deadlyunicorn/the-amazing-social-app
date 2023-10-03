'use client'
import { PostComponent } from "./postComponent/postComponent";
import { userDetailsClient } from "../../../page";
import { useEffect, useState } from "react";
import { userPostWithAvatar } from "../../(mongodb)/getPosts";

export const FetchPostsClient = ({ 
  page, userDetails,
  setCanLoadNext, viewY,
  maxPages }: { 
    
  page: number, userDetails: userDetailsClient | null,
  setCanLoadNext:any, viewY: number, 
   maxPages:number }) => {

  const [posts, setPosts] = useState<null | userPostWithAvatar[]>(null);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {

    if ( !hasMounted){
      setHasMounted(true);
      setCanLoadNext(false);

      let success;
      let i=0;

        (async () => {
          while( !success ){
            i++;
            if (i > 20){break}

            try{

              await fetch(`/explore/${page}`, { method: "GET" })
                .then( async(res) => await res.json()
                .then( posts => {
                  setPosts(posts)
                }))
              setCanLoadNext(true) 
              success=true
            }
            catch(err){

            }
          }


        }
        )()
    }


  }, [])


  return (

    <>
      {
        (posts && posts.length > 0) &&
        <ul>
          {
            posts.map(
              (post) => (
                <PostComponent
                  viewY={viewY}
                  userDetails={userDetails}
                  key={new Date(post.created_at).getTime()}
                  post={post} />
              )
            )
          }
        </ul>
      }

      { //this will never trigger bcz we don't reach max page
       page == maxPages && <p className="text-center" tabIndex={0}>The road ends here O.o</p> 
      }
     
    </>
  )
}

