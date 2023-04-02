'use client'

import "@/app/components/Styles/styles.css"

import {  useContext, useState } from "react";


import UserDetails from "@/app/components/userDetails";
import LogoutButton from "@/app/components/Login_Logout_Register/logoutButton";

import Form from "@/app/components/Login_Logout_Register/email/login_register_form";
import ErrorHandler from "@/app/components/Login_Logout_Register/email/error_handling";
import { appContext } from "@/app/components/ContextComponent/contextComp";
import WhiteBox from "@/app/components/whiteBox";


const UserPage = () =>{

  const {user,setUser,errorCode,setErrorCode}=useContext(appContext)


  const [email,setEmail]=useState<string>("");
  const [password,setPassword]=useState<string>("");




  return(

    <div>

   
      <WhiteBox>

            {user?
            <>
              <UserDetails/>
              <LogoutButton setUser={setUser}/>
              <span>&nbsp;to Signup for a new account.</span>
            </>:
            <>
              Signup today!
                <Form 
                  formType="register"
                  setErrorCode={setErrorCode} 
                  email={email} setEmail={setEmail} 
                  password={password} setPassword={setPassword}/>

            </>
            }
      </WhiteBox>


      {!user&&errorCode&&<ErrorHandler email={email}/>}

    </div>
  )
}



export default UserPage;