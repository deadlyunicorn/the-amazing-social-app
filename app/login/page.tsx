'use client'


//
import { useContext, useEffect, useState } from "react"
import "@/app/components/Styles/styles.css"
import { appContext } from "@/app/components/ContextComponent/contextComp"

//Realm
import UserDetails from "@/app/components/userDetails"
import LoginButton from "@/app/components/Login_Logout_Register/anonymous/loginButton"
import ErrorHandler from "@/app/components/Login_Logout_Register/email/error_handling"
import WhiteBox from "@/app/components/whiteBox"



//


const LoginPage = () => {

  const {errorCode,setErrorCode}=useContext(appContext)

  useEffect(()=>{
    setErrorCode(null);
  },[])
//
  return (
    <>

      <WhiteBox>

            <div>
              <UserDetails/>
              <div className="flex justify-between">
                <LoginButton/>
              </div>
            </div>
      </WhiteBox>

        
        {errorCode&&
        <div className="mt-4">
          <ErrorHandler/>
        </div>
        }

    </>
  )
}

export default LoginPage;







