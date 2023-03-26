'use client'


import "@/app/components/Styles/styles.css"
import {app} from "@/app/components/appObject"
import ErrorHandler from "@/app/components/Login_Logout_Register/email/error_handling";
import Link from "next/link";
import { useEffect, useState } from "react";
import {useSearchParams} from 'next/navigation';

interface MongoError{
  error:string;
  errorCode:string|null;
};


export default function ConfirmationPage(
  
  //{params}=params.params
)
{

  //For some reason search params 
  //was working alright on the client side
  //when developing..
  //but not when deploying.
  const searchParams=useSearchParams();
  const token=searchParams.get("token");
  const tokenId=searchParams.get("tokenId");
  


  const [errorCode,setErrorCode]=useState<string|null>(null);

  useEffect(()=>{
    const confirm=async()=>{
      try{
        if (token&&tokenId){
          await app.emailPasswordAuth.confirmUser({token,tokenId})
        }
      }
      catch(error){
        const JSONError=error as MongoError;
        setErrorCode(JSONError.errorCode);
      }

    }
    confirm();
  },[token,tokenId])
  

  return(
    <>
      <div className="bg-white p-4 rounded-lg w-96 h-44 mb-4 animate-appearance text-center ">
      {token&&tokenId&&!errorCode&&
      <>
        Your email has been successfully confirmed!
        <br/>You can now&nbsp;
        <Link 
        className="w-fit hover:text-blue-400 text-blue-600"
        href="/login">login</Link>
      </>
      }
      {errorCode&&
      <ErrorHandler setErrorCode={setErrorCode} errorCode={errorCode}/>}
      <br/>
      {!token||!tokenId&&<PageNotFound/>}
      </div>
    </>
  )
}


const PageNotFound = () =>{
  return(
    <>
      You might have clicked on this page by mistake.
    </>
  )
}