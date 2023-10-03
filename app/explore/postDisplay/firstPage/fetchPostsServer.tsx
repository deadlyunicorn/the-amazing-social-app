import { getPostsPageLimit } from "../../../(lib)/postLimit";
import { getPosts } from "../(mongodb)/getPosts";
import {  userDetailsClient } from "../../page";
import { withRetry } from "@/app/(lib)/retry";
import { PostComponent } from "./clientComponents/postComponent/postComponent";
import { Suspense } from "react";
import { PostsFallback } from "../../fallback";

export const PostsServer = async ({userDetails}:{userDetails:userDetailsClient|null}) => {

  const maxPages = await withRetry(getPostsPageLimit, 5,[]) || 0;

  return (
    <section
        className="animate-none"
        id="postSection">


    <PageComponent 
      maxPages={maxPages}
      pageNumber={1}
      userDetails={userDetails}
      />
        

        
           
    </section>
  )
}

const PageComponent = async(
  {pageNumber,maxPages,userDetails}:
  {pageNumber:number,maxPages:number, userDetails:userDetailsClient|null}) => {

  // @ts-ignore
  const pagePosts =  pageNumber < maxPages ? await withRetry(getPosts,10,[{page: pageNumber,explore:true}]) : null;
  
  if ( pagePosts ) {

    return (
    <>
    <ul>
    {pagePosts.map( //server loaded posts
      post =>
        <PostComponent 
          userDetails={userDetails}
          key={`${post._id}_li`}
          post={post} />
    )}
    </ul>

    <Recurse pageNumber={pageNumber} maxPages={maxPages} userDetails={userDetails}/>

    </>
    )
  }
}

const Recurse = async({pageNumber,maxPages,userDetails}:any)=>{

  return (

    <Suspense fallback={<PostsFallback/>}>
      <p>hello</p>
     <PageComponent pageNumber={pageNumber+1} maxPages={maxPages} userDetails={userDetails}/>
    </Suspense>

  ) 
}


