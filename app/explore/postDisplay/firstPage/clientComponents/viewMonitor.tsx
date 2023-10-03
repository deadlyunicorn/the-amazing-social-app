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
  const [error,setError] = useState(false);

  useEffect(()=>{
    if(error){
      const timer = setTimeout(()=>{
        setError(false);
      },5000)

      return ()=>{clearTimeout(timer)}
    }

  },[error])


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
  for (let i = 2; i < pageNumber; i++) {
    pagesArray.push( 
      <FetchPostsClient 
          viewY={viewY}
          setCanLoadNext={setCanLoadNext}
          userDetails={userDetails}
          key={i}
          page={i}
          error={error}
          setError={setError} />
    );
  }

  return (
    <section
      className="animate-none flex flex-col justify-center"
      id="postSection">
       
      <ul>
        {firstPagePosts && firstPagePosts.map( //server loaded posts
          (post) =>
            <PostComponent 
              viewY={viewY}
              userDetails={userDetails}
              key={post._id}
              post={post} />
        )}
      </ul> 

      {pagesArray}        

      <div 
        className="self-center">
      {pageNumber < maxPages 
        ? <p className="text-center" tabIndex={0}>
            {canLoadNext
              ?"Scroll to load more."
              :error?"This is taking abnormally long..":"Loading..."
            }
          </p>
        : pageNumber == maxPages && <p className="text-center" tabIndex={0}>The road ends here O.o</p> 
      }
       
      </div>

    </section>




  )
}
