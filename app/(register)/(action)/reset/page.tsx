'use client'

import { FormEvent, useEffect, useState } from "react"
import "@/app/components/Styles/styles.css"

import {app} from "@/app/components/appObject"
import ErrorHandler from "@/app/components/Login_Logout_Register/email/error_handling";

import {useSearchParams} from 'next/navigation';


interface MongoError{
  error:string;
  errorCode:string|null;
};


export default function ResetPage(
  
  //{params}=params.params

){


  const searchParams=useSearchParams();
  const token=searchParams.get("token");
  const tokenId=searchParams.get("tokenId");
  
  



  
  const [errorCode,setErrorCode]=useState<string|null>(null);
  const [password,setPassword]=useState('');
  const [confirmPassword,setConfirmPassword]=useState('');
  const [loading,setLoading]=useState(false);
  
    
  useEffect(()=>{ //I could either use useRef to keep a static
    //version of email for each form submit
    //this will close the prompt => unable the user
    //to send confirmation to the wrong email.
    setErrorCode(null);
    if((password.length>6)&&(confirmPassword.length>6)){
      if(password!=confirmPassword){
        setErrorCode("NotMatchingPasswords")
      }
    }
  },[password,confirmPassword])


  const resetPassword=async(event:FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    if(confirmPassword==password){
      if(!loading){
        setErrorCode("Loading")
        setLoading(true);

        try{
          if(token&&tokenId){
            await app.emailPasswordAuth.resetPassword({password,token,tokenId});
            setErrorCode("ResetSuccess");
          }

        }
        catch(error){
          const errorJSON=error as MongoError;
          setErrorCode(errorJSON.errorCode);
        }
        finally{
          setLoading(false);
        }
      }
   }
    else{
      setErrorCode("NotMatchingPasswords");
    }

  }

  return(
    <>

      <div className="bg-white p-4 rounded-lg w-96 h-44 mb-4 animate-appearance text-center ">

      {token&&
      <>
        Reset Password
        {resetPassForm({resetPassword,setPassword,setConfirmPassword})}
      </>

      }
      
      <br/>
      {!token&&<PageNotFound/>}
        
      </div>
      {errorCode&&<ErrorHandler errorCode={errorCode} setErrorCode={setErrorCode}/>}
      
    </>
  )
}

const resetPassForm = (
  {resetPassword,
  setPassword,setConfirmPassword
  }:{resetPassword:(event:FormEvent<HTMLFormElement>)=>void,
  setPassword:(pass:string)=>void,setConfirmPassword:(pass:string)=>void
  }
  ) =>{




  return(
    <form 
    onSubmit={resetPassword}
    //add functionality to redirect you to a verification page where it tells them to check their email
    className="flex flex-col gap-2 px-3 py-2">
        
        <input
          onChange={(event)=>{setPassword(event.target.value);}}
          className="py-1 px-2"
          placeholder="New Password" type={"password"} minLength={10} required/>
        
        <input
          onChange={(event)=>{setConfirmPassword(event.target.value);}}
          className="py-1 px-2"
          placeholder="Confirm Password" type={"password"} minLength={10} required/>

        <button 
          className="border bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded-md">
          Submit
        </button>
      </form>
  )
}

const PageNotFound = () =>{
  return(
    <>
      You might have clicked on this page by mistake.
    </>
  )
}