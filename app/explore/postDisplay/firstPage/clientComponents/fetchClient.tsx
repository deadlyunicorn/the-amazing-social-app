import { PostComponent } from "./postComponent/postComponent";
import { userDetailsClient } from "../../../page";
import { useEffect, useState } from "react";
import { userPostWithAvatar } from "../../(mongodb)/getPosts";

export const FetchPostsClient = ({ page, userDetails,setCanLoadNext }: { page: number, userDetails: userDetailsClient | null,setCanLoadNext:any }) => {

  const [posts, setPosts] = useState<null | userPostWithAvatar[]>(null);
  const [error,setError] = useState(false);

  useEffect(() => {

    setCanLoadNext(false);
    (async () => {
      try{

      await fetch(`/explore/${page}`, { method: "GET" })
        .then( async(res) => await res.json()
        .then( posts => {
          
          setPosts(posts)
        }))
        .finally(()=>{
          setCanLoadNext(true) 
        })
      }
      catch(err){
        setError(true);
      }

    }
    )()

  }, [])


  return (

    <>
      {
        (posts && posts.length > 0 && !error) &&
        <ul>
          {
            posts.map(
              (post) => (
                <PostComponent
                  userDetails={userDetails}
                  key={new Date(post.created_at).getTime()}
                  post={post} />
              )
            )
          }
        </ul>
      }
      {
        error && <p> There was an error </p>


      }
    </>
  )
}

