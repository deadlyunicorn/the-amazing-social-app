"use client"

import { ReactNode, useEffect, useState } from "react";
import { PostComponent } from "./postComponent/postComponent";
import { userDetailsClient } from "../../../page";
import { FetchPostsClient } from "./fetchClient";
import { userPostWithAvatar } from "../../(mongodb)/getPosts";

export const PostSectionWrapperWithViewMonitoring = ({ firstPagePosts,maxPages, userDetails}: { firstPagePosts: userPostWithAvatar[]|null,maxPages:number,userDetails:userDetailsClient|null }) => {

  const [viewY, setViewY] = useState(0);
  const [edgeY, setEdgeY] = useState(0);
  const [canLoadNext, setCanLoadNext] = useState(true); //being true disallows new page loading  
  const [pageNumber, setPageNumber] = useState(1);
  // const [error,setError] = useState(false);
  const [loading,setLoading] = useState(0);

  /*
  useEffect(()=>{
    if(error){
      const timer = setTimeout(()=>{
        setError(false);
      },5000)

      return ()=>{clearTimeout(timer)}
    }

  },[error])
  */


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

    if ( pageNumber + 1 < maxPages){
      if (canLoadNext){
        if (loading == 0){
          
          const timer = setTimeout(()=>{
          if (edgeY - 200 < viewY ){
            
              setPageNumber( prev => prev+1 );
            }
          },200)
          return ()=>{
            clearTimeout(timer);
          }
          }
        }
    }
    else{
      setCanLoadNext(false);
    }
    
  },[viewY])



  const [pagesArray,setPagesArray] = useState<ReactNode[]>([]);

  useEffect(()=>{
    
    if( pagesArray.length < pageNumber ){
      setPagesArray( 
        
        [...pagesArray,

        <FetchPostsClient 
        setLoading={setLoading}
        maxPages={maxPages}
        viewY={viewY}
        setCanLoadNext={setCanLoadNext}
        userDetails={userDetails}
        key={pageNumber}
        page={pageNumber}/>]
      )
    }

  },[pageNumber])



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
        
        <p className="text-center" tabIndex={0}>
            {loading > 0
            ? "Loading..."
            : canLoadNext && "Scroll to load more."
            }
        </p>

       
      </div>
      { //this will never trigger bcz we don't reach max page
      (pageNumber + 1 >= maxPages) 
      && ( loading == 0 && !canLoadNext) 
      && 
        <p 
          className="text-center" 
          tabIndex={0}>
          The road ends here O.o
        </p> 
      }

    </section>




  )
}
