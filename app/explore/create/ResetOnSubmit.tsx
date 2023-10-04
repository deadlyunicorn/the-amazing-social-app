"use client"

import { useEffect } from "react"
import { experimental_useFormStatus } from "react-dom"

export const ResetOnSubmit = ({formId}:{formId:string}) => {

  const {pending} = experimental_useFormStatus();

  useEffect(()=>{
    if (!pending){
      //@ts-ignore
      document.querySelector(`#${formId}`).reset();
    }
  },[pending])

  //if I put <textarea/> on client it doesn't 
  //validate (minLength)

  return(
    <>
    
    </>
  )
}