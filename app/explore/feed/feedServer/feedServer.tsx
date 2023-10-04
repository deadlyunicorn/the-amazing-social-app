import { getPosts } from "../api/mongodb/getPosts";
import { userDetailsClient } from "../../page";
import { withRetry } from "@/app/lib/retry";
import { PostComponent } from "../components/postComponent/postComponent";
import { redirect } from "next/navigation";

export const FeedServer = async ({userDetails}:{userDetails:userDetailsClient|null}) => {

  
  //@ts-ignore
  const firstPagePosts =  await withRetry(getPosts,5,[{page: 1,explore:true}])
    .catch( err =>{ redirect('/explore?error="Failed getting posts"')});

  return (
    <ul>
        {firstPagePosts && firstPagePosts.map( //server loaded posts
          (post) =>
            <PostComponent
             
              userDetails={userDetails}
              key={post._id}
              post={post} />
        )}
      </ul> 
  
  )
}



