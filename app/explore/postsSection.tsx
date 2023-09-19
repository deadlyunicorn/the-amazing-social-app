"use client"

import { useEffect, useState } from "react";
import { DisplayPosts } from "./postsDisplayClient";
import { PostComponent, userPostComplete } from "./postComponent";

export const PostSection = ({ firstPagePosts,maxPages}: { firstPagePosts: userPostComplete[],maxPages:number }) => {

  const [viewY, setViewY] = useState(0);
  const [edgeY, setEdgeY] = useState(0);
  const [canLoadNext, setCanLoadNext] = useState(true); //being true disallows new page loading  


  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {

    onscroll = () => {

      const sectionEnd = document.querySelector('#postSection');
      //@ts-ignore
      setEdgeY(sectionEnd?.getBoundingClientRect().bottom + window.scrollY);
      
      const currentPosition = window.screen.height + window.scrollY;
      if (edgeY>currentPosition){ //prevents bugs?
        setViewY(currentPosition); 
      }

    }
  });

  useEffect(()=>{
    if (edgeY - 200 < viewY ){

      if (canLoadNext){
        if (pageNumber < maxPages){
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
      id="postSection">

        <div className="fixed bg-white top-0 left-0 z-20">
          view:{viewY}
          <br/>
          edge:{edgeY}
          <br/>
          <br/>
          page:{pageNumber}
          <br/>
          newValue:{Math.floor(viewY / edgeY) + 1}
        </div>

      <ul>
        {firstPagePosts && firstPagePosts.map(
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


    </section>




  )
}
