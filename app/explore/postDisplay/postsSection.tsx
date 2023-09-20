"use client"

import { useEffect, useState } from "react";
import { DisplayPosts } from "./postsDisplayClient";
import { PostComponent, userPostComplete } from "./postComponent/postComponent";

export const PostSection = ({ firstPagePosts,maxPages}: { firstPagePosts: userPostComplete[],maxPages:number }) => {

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
              key={key}
              post={post} />
        )}
      </ul> 

      {pagesArray.map((page) =>
        <DisplayPosts 
          key={page}
          canLoadNext={canLoadNext}
          setCanLoadNext={setCanLoadNext}
          page={page} />
      )} 

        {(!canLoadNext && pageNumber < maxPages) 
        ? <p className="text-center" tabIndex={0}>Loading...</p>
        : pageNumber == maxPages && <p className="text-center" tabIndex={0}>The road ends here O.o</p> 
        }

    </section>




  )
}
