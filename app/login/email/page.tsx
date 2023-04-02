'use client'

import "@/app/components/Styles/styles.css"

import {  useContext, useEffect, useState } from "react";

import { appContext } from "@/app/components/ContextComponent/contextComp"

import UserDetails from "@/app/components/userDetails";

import Form from "@/app/components/Login_Logout_Register/email/login_register_form";
import ErrorHandler from "@/app/components/Login_Logout_Register/email/error_handling";
import WhiteBox from "@/app/components/whiteBox";


const UserPage = () =>{


  const {user,setUser,errorCode,setErrorCode}=useContext(appContext)


  const [email,setEmail]=useState<string>("");
  const [password,setPassword]=useState<string>("");



  useEffect(()=>{ //I could either use useRef to keep a static
    //version of email for each form submit
    //this will close the prompt => unable the user
    //to send confirmation to the wrong email.
    setErrorCode(null);
  },[email])

  return(
    <div>

      <WhiteBox>
            {user?
            <>
              <UserDetails/>
              <span>&nbsp;before logging into another account.</span>
            </>:
            <>
              Login today!
              <Form
                formType="login"
                setErrorCode={setErrorCode} 
                email={email} setEmail={setEmail} 
                password={password} setPassword={setPassword}
                setUser={setUser}/>

            </>
            }
      </WhiteBox>

      {!user&&errorCode&&<ErrorHandler email={email}/>}
    </div>
  )
}





export default UserPage;