'use client'


//
import { useContext, useEffect, useState } from "react"
import "@/app/components/Styles/styles.css"
import { appContext } from "@/app/components/ContextComponent/contextComp"

//Realm
import * as Realm from "realm-web"
import UserDetails from "@/app/components/userDetails"
import LoginButton from "@/app/components/Login_Logout_Register/anonymous/loginButton"
import LogoutButton from "@/app/components/Login_Logout_Register/logoutButton"
import ErrorHandler from "@/app/components/Login_Logout_Register/email/error_handling"



//


const LoginPage = () => {

  const {errorCode,setErrorCode}=useContext(appContext)

  useEffect(()=>{
    setErrorCode(null);
  },[])

  return (
    <>
        <div className="bg-white p-4 rounded-lg w-96 h-48 animate-appearance">

            <div>
              <UserDetails/>
              <div className="flex justify-between">
                <LoginButton/>
              </div>
            </div>
        </div>

        
        {errorCode&&
        <div className="mt-4">
          <ErrorHandler/>
        </div>
        }

    </>
  )
}

export default LoginPage;







