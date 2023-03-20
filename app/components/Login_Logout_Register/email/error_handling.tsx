'use client'

import {app} from "@/app/components/appObject"
import {  useState } from "react"
import * as Realm from "realm-web"

const ErrorHandler = (
  {errorCode,setErrorCode,
  email
  }:
  {
    errorCode:string,
    setErrorCode:(nullify:(null))=>void,
    email:string
  }
  ) => {




  const [loading,setLoading]=useState(false)

  const confirmationSend=async()=>{
    if (!loading){
    setLoading(true); //prevents multiple sessions if
    //somebody clicks the button multipl times
    await app.emailPasswordAuth.resendConfirmationEmail({email}); 
    setLoading(false);
    alert(`success.`); //make it to redirect user to another page.
  }}
    
  const resetSend=async()=>{
    if(!loading){
      setLoading(true);
      await app.emailPasswordAuth.sendResetPasswordEmail({email});
      setLoading(false);
      alert(`Succes..`);
    }
  }

  
  let message;
  
  switch(errorCode){
    case "AuthError":
      console.log("You need to confirm your email");
      message=AuthError(confirmationSend);
      break;
    case "InvalidPassword":
      console.log("Invalid username or password!")
      message=InvalidPassword(resetSend);
      break;
    default:
      console.log("Uknown error! Try again.")
      break;
  }
  return(
    <div 
      className="bg-white w-96 h-fit
      p-4 rounded-lg duration-700 ">
        <div className="flex flex-col">
          <div className="text-right font-mono font-semibold">
            <button 
              onClick={()=>{setErrorCode(null)}}
              className="text-red-700 hover:text-blue-700">
              X
            </button>
          </div>
          <div>
            {message}
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

const InvalidPassword = (resetSend:()=>void) =>(
  <div className="flex flex-col items-center">
    <span 
      className="text-red-500">
        This username-password pair doesn&apos;t match our records.
    </span>

    <button 
      onClick={resetSend}
      className="w-fit hover:text-blue-400 text-blue-600">
      Reset Password!
    </button>

  </div>
)

export default ErrorHandler;