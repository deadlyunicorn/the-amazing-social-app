'use client'


import "@/app/components/Styles/styles.css"
import {app} from "@/app/components/appObject"
import ErrorHandler from "@/app/components/Login_Logout_Register/email/error_handling";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import {useSearchParams} from 'next/navigation';
import { appContext } from "@/app/components/ContextComponent/contextComp";
import WhiteBox from "@/app/components/whiteBox";

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
  
  const {errorCode,setErrorCode}=useContext(appContext)


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
      {token&&tokenId&&!errorCode&&
      <WhiteBox>

        <>
        Your email has been successfully confirmed!
        <br/>You can now&nbsp;
        <Link 
        className="w-fit hover:text-blue-400 text-blue-600"
        href="/login">login</Link>
      </>
      </WhiteBox>
      }
      {!token||!tokenId&&<PageNotFound/>}
      {errorCode&&
      <ErrorHandler/>}
      <br/>
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