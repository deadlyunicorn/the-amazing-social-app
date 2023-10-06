"use client"

import { getCsrfToken } from "next-auth/react";
import Link from "next/link";

export const SetCsrfToken = () => {

  return (
    <div className="
      flex flex-col items-center
      bg-black bg-opacity-20 
      backdrop-blur-sm
      h-screen w-screen fixed top-0 left-0 z-30">
    <section className="flex flex-col justify-between animate-none absolute bottom-[40%] max-w-md">
      <h3 className="text-center">
        In order for Authentication to work 
        <br/>We need to set an Authorization Cookie.


      </h3>
      <div className="flex justify-around">
        
        <Link 
          className="text-error-light-reactive"
          href="/explore">

          Decline

        </Link>
        <button 
          className="text-link"
          onClick={()=>{
            (async()=>{
              await getCsrfToken();
              window.location.reload();
            })();
          }}>

          Accept Auth Cookie
        
        </button>
        
      </div>

    </section>
    </div>
  )
}