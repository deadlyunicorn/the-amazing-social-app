"use client"

import { useEffect, useState } from "react"
import { experimental_useFormStatus } from "react-dom"

export const ResetOnSubmit = ({formId}:{formId:string}) => {

  const {pending} = experimental_useFormStatus();
  const [hasLoaded,setHasLoaded] = useState(false);

  useEffect(()=>{
    if (!pending && hasLoaded){
      //@ts-ignore
      document.querySelector(formId).reset();
    }
    else{
      setHasLoaded(true);
    }
  },[pending])

  //if I put <textarea/> on client it doesn't 
  //validate on client (minLength)

  return(
    <>
   
    </>
  )
}