"use client"

import { useEffect, useState } from "react";
import { DisplayPosts, PostComponent } from "./getPosts";
import { userPost } from "../(mongodb)/getPosts";

export const PostSection = ({ firstPagePosts,maxPages}: { firstPagePosts: userPost[],maxPages:number }) => {

  const [viewY, setViewY] = useState(0);
  const [edgeY, setEdgeY] = useState(0);
  const [loading, setLoading] = useState(false);


  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {

    onscroll = () => {

      setViewY(window.screen.height + window.scrollY);
      const sectionEnd = document.querySelector('#postSection');
      //@ts-ignore
      setEdgeY(sectionEnd?.getBoundingClientRect().bottom + window.scrollY);


    }
  });

  useEffect(()=>{
    if (edgeY - 200 < viewY ){

      if (!loading){
        setPageNumber(prev=>{
          if ( maxPages >= prev +1){
            return prev+1
          }
          else{ return prev}
        });
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
        {firstPagePosts.map(
          (post,key) =>
            <PostComponent 
              key={key}
              post={post} />
        )}
      </ul>


        {pagesArray.map((page) =>
          <DisplayPosts 
            key={page}
            loading={loading}
            setLoading={setLoading}
            page={page} />
        )}

      {/* get all available pages with mongoFetch
      and don't display more than allowed */}

      {/* window:{windowLocation} */}
      {/* <br/>divider:{dividerLocation} */}


    </section>




  )
}
