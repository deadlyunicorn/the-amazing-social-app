"use client"

import { ReactNode, useEffect, useState } from "react";
import { PostComponent } from "../components/postComponent/postComponent";
import { userDetailsClient } from "../../page";
import { FeedClient } from "./feedClient";
import { userPostWithAvatar } from "../api/mongodb/getPosts";

export const FeedClientWithMonitor = ({ maxPages, userDetails}: { maxPages:number,userDetails:userDetailsClient|null }) => {

  const [viewY, setViewY] = useState(0);
  const [edgeY, setEdgeY] = useState(0);
  const [canLoadNext, setCanLoadNext] = useState(true); //being true disallows new page loading  
  const [pageNumber, setPageNumber] = useState(2);
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

        <FeedClient 
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
    
       
  <>

    {pagesArray}

    <div 
      className="self-center">
      
      <p className="text-center" tabIndex={0}>
          {loading > 0
          ? "Loading..."
          : canLoadNext  
            ?"Scroll to load more."
            :(pageNumber + 1 >= maxPages) && "The road ends here O.o"
          }
      </p>

      
    </div>
  

  </>





  )
}
