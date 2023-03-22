'use client'

import {app} from "@/app/components/appObject"
import Link from "next/link";
import {  ReactNode, useEffect, useState } from "react"
import "@/app/components/Styles/styles.css"

import * as Realm from "realm-web"


interface MongoError{
  error:string;
  errorCode:string|null;
};

const ErrorHandler = (
  {errorCode,setErrorCode,
  email
  }:
  {
    errorCode:string,
    setErrorCode:(changeCode:(null|string))=>void,
    email?:string
  }
  ) => {




  const [loading,setLoading]=useState(false)

  const confirmationSend=async()=>{
    if (!loading&&email){
    setLoading(true); //prevents multiple sessions if
    //somebody clicks the button multipl times
    setErrorCode("Loading");
    await app.emailPasswordAuth.resendConfirmationEmail({email}); 
    setErrorCode("Success");
    setLoading(false);
  }}
    

  
  //let errorSelect; //We know the error when component 
  //gets rendered so we don't have to use hook ig?
  
  const [errorSelect,setErrorSelect]=useState<ReactNode>("Uknown error! Try again.");

  useEffect(()=>{
    switch(errorCode){
      case "AuthError"://need to confirm email address..
        setErrorSelect(AuthError(confirmationSend));
        break;
      case "InvalidPassword"://email-password combination don't match
        if(email)setErrorSelect(InvalidPassword({loading,setLoading,email,setErrorCode}));
        break;
      case "UserNotFound"://user with said email doesn't exist
        setErrorSelect(UserNotFound());
        break;
      case "register_complete"://successful registration
        setErrorSelect(SuccesfulRegister());
        break;
      case "Success": //success of any operation. happens as the last action of a try{}
        setErrorSelect(SuccesfulSubmit());
        break;
      case "Loading": //before await begins
        setErrorSelect(Loading());
        break;
      case "AccountNameInUse": //when trying to register with an exisitng email
        setErrorSelect(AccountNameInUse());
        break;
      case "NotMatchingPasswords": //Not matching during password reset
        setErrorSelect(NotMatchingPasswords());
        break;
      case "UserpassTokenInvalid":
        setErrorSelect(UserpassTokenInvalid());
        break;
      case "ResetSuccess":
        setErrorSelect(ResetSuccess());
        break;
      case "LoginSuccess":
        setErrorSelect(LoginSuccess());
        break;
      
      default:
        setErrorSelect("Uknown Error.."+errorCode)
        break;
    }
  },[email,errorCode])

  return(
    <div 
      className="bg-white w-96 h-36
      p-4 rounded-lg duration-700
      animate-appearance">
        <div className="flex flex-col">
          <div className="text-right font-mono font-semibold">
            <button 
              onClick={()=>{setErrorCode(null)}}
              className="text-red-700 hover:text-blue-700">
              X
            </button>
          </div>
          <div>
            {errorSelect}
          </div>
        </div>
    </div>
  );
};



const AuthError = (confirmationSend:()=>void) =>{
  return(

  <div className="flex flex-col items-center">
    <span className="text-center">
      You haven&apos;t confirmed your email yet. 
      <br/>Please check your Inbox.
    </span>


    <button
      onClick={confirmationSend}
      className="w-fit hover:text-blue-400 text-blue-600">
      Resend Confirmation Email.
    </button>

  </div>
)};


const InvalidPassword = (
  {loading,setLoading,email,setErrorCode}:
  {loading:boolean,setLoading:(boolState:boolean)=>void,
    email:string,setErrorCode:(text:string)=>void}
  ) =>{


  const resetSend=async()=>{
    if(!loading){
      setLoading(true); //add a loading component 
      try{
        setErrorCode("Loading");
        await app.emailPasswordAuth.sendResetPasswordEmail({email});
        setErrorCode("Success");
      }
      catch(error){
        const errorJSON=error as MongoError;
        if(errorJSON.errorCode=="UserNotFound"){
          setErrorCode("UserNotFound");
        }
      }
      setLoading(false);
    }
  }

  return(

  <div className="flex flex-col items-center ">
    <span 
      className="text-red-500">
        This username-password pair doesn&apos;t match our records.
    </span>

    <button 
      onClick={resetSend}
      className="w-fit hover:text-blue-400 text-blue-600">
      Send password reset link.
    </button>

  </div>
)
}

const UserNotFound = () =>{
  return(
    <div className="flex flex-col items-center text-center mt-2 animate-appearance">
      <span 
        className="text-slate-700">
          User not found. 
          <br/>Consider&nbsp;
        <Link 
        className="w-fit hover:text-blue-400 text-blue-600"
        href="/register">
          Signing up.
        </Link>
      </span>


    </div>
    
  )
}

const SuccesfulSubmit = () =>{

  return(
    <div className="flex flex-col items-center text-center mt-2 animate-appearance">
    <span 
      className="text-slate-700">
        Request was Successful!
        <br/>Please check your inbox.
    </span>


  </div>
  )
}

const SuccesfulRegister = () => {
  return(
    <div className="flex flex-col items-center text-center mt-2 animate-appearance">
    <span 
      className="text-slate-700">
        Registration was successful.
        <br/>Please check your email
        for a confirmation&nbsp;link.
    </span>


  </div>
  )

}

const Loading = () =>{


  return(
    <div className="flex flex-col items-center text-center mt-2 animate-appearance">
    <span 
      className="text-slate-700">
        Loading...
    </span>


  </div>
  )
}

const AccountNameInUse =()=>{
  return(
    <div className="flex flex-col items-center text-center mt-2 animate-appearance">
      <span 
        className="text-slate-700">
          Account with email already exists. 
          <br/>Consider&nbsp;
        <Link 
        className="w-fit hover:text-blue-400 text-blue-600"
        href="/login">
          logging in.
        </Link>
      </span>


    </div>
    
  )
}

const NotMatchingPasswords=()=>{
  return(

    <div className="flex flex-col items-center ">
      <span 
        className="text-red-500">
          Passwords don&apos;t match.
      </span>
  

  
    </div>
  )
}

const UserpassTokenInvalid = () =>{
  return(

    <div className="flex flex-col items-center text-center">
      <span 
        className="text-red-500">
          Link has expired.
      </span>
          <br/>
          <span>
            Please request a new&nbsp;
          <Link 
            className="w-fit hover:text-blue-400 text-blue-600"
            href="/login">link.</Link>
          </span>
  

  
    </div>
  )
}

const ResetSuccess=()=>{

    return(
      <div className="flex flex-col items-center text-center mt-2 animate-appearance">
      <span 
        className="text-slate-700">
          Password reset was Successful!
          <br/>Try <Link href="/login">logging in.</Link>
      </span>
  
  
    </div>
    )
}

const LoginSuccess=()=>{

  return(
    <div className="flex flex-col items-center text-center mt-2 animate-appearance">
    <span 
      className="text-slate-700">
        You have logged in successfully
    </span>


  </div>
  )

}

export default ErrorHandler;