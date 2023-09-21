"use client"

import { useEffect, useState } from "react";
import { PostComponent } from "./postComponent/postComponent";
import { userDetailsClient } from "../../../page";
import { FetchPostsClient } from "./fetchClient";
import { userPostWithAvatar } from "../../(mongodb)/getPosts";

export const PostSectionWrapperWithViewMonitoring = ({ firstPagePosts,maxPages, userDetails}: { firstPagePosts: userPostWithAvatar[]|null,maxPages:number,userDetails:userDetailsClient|null }) => {

  const [viewY, setViewY] = useState(0);
  const [edgeY, setEdgeY] = useState(0);
  const [canLoadNext, setCanLoadNext] = useState(true); //being true disallows new page loading  
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    onscroll = handlePageMove;
  });

  const handlePageMove = () => {

      const sectionEnd = document.querySelector('#postSection');
      //@ts-ignore
      setEdgeY(sectionEnd?.getBoundingClientRect().bottom + window.scrollY);
      
      const currentPosition = window.screen.height + window.scrollY;
      if ( edgeY  > currentPosition - 400 ){ //prevents bugs?
        setViewY(currentPosition); 
      }

  } 

  useEffect(()=>{

    if (pageNumber < maxPages){

      if (canLoadNext){

        if (edgeY - 200 < viewY ){

          setPageNumber(pageNumber+1);
        }
      }
      
    }
  },[viewY])





  const pagesArray = [];

  // i == 1 - s o that we start from page 2.
  for (let i = 1; i < pageNumber; i++) {
    pagesArray.push(i + 1);
  }

  return (
    <section
      className="animate-none"
      id="postSection">
       
      <ul>
        {firstPagePosts && firstPagePosts.map( //server loaded posts
          (post,key) =>
            <PostComponent 
              userDetails={userDetails}
              key={key}
              post={post} />
        )}
      </ul> 

      {
      pagesArray.map((page) =>
        <FetchPostsClient 
          setCanLoadNext={setCanLoadNext}
          userDetails={userDetails}
          key={page}
          page={page} />
      )
      }

      {
        (!canLoadNext && pageNumber < maxPages) 
        ? <p className="text-center" tabIndex={0}>Loading...</p>
        : pageNumber == maxPages && <p className="text-center" tabIndex={0}>The road ends here O.o</p> 
      }

    </section>




  )
}
