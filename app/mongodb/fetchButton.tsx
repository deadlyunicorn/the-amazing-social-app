'use client'

import { useState } from "react"
import { ReactNode } from "react";


const FetchButton = (props:{children:ReactNode}) =>{

  const [button,setButton]=useState(false);

  return (
  <>
    <div className="text-center">
      <button 
        onClick={()=>{setButton(true)}}
        className="border p-1 rounded-md bg-white bg-opacity-5 hover:bg-opacity-10">
          hello world!
      </button>

      <div>
        {button&&props.children}
      </div>
    </div>
  </>
  )
}

export default FetchButton;