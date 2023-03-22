'use client'

import "@/app/components/Styles/styles.css"

import {  useEffect, useState } from "react";

import {app} from "@/app/components/appObject"
import * as Realm from "realm-web"

import UserDetails from "@/app/components/userDetails";
import LogoutButton from "@/app/components/Login_Logout_Register/logoutButton";

import Form from "@/app/components/Login_Logout_Register/email/login_register_form";
import ErrorHandler from "@/app/components/Login_Logout_Register/email/error_handling";


const UserPage = () =>{

  const [pageLoad,setPageLoad]=useState(false);
  const [user,setUser]=useState<Realm.User | null>(null);
  const [errorCode,setErrorCode]=useState<string|null>(null);


  const [email,setEmail]=useState<string>("");
  const [password,setPassword]=useState<string>("");

  useEffect(()=>{
    setUser(app.currentUser);
    setTimeout(()=>{
      setPageLoad(true);
    },500);
  },[user])

  useEffect(()=>{ //I could either use useRef to keep a static
    //version of email for each form submit
    //this will close the prompt => unable the user
    //to send confirmation to the wrong email.
    setErrorCode(null);
  },[email])


  return(

    <div>

      <div className="bg-white p-4 rounded-lg w-96 h-44 mb-4 duration-700 text-center">
        <div
          data-pageload={pageLoad}
          className="data-[pageload=true]:inline animate-hidden hidden">

            {user?
            <>
              <UserDetails user={user}/>
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


        </div>
      </div>
      {!user&&errorCode&&<ErrorHandler errorCode={errorCode} setErrorCode={setErrorCode} email={email}/>}

    </div>
  )
}



export default UserPage;