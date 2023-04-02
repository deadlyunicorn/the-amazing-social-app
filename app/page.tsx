'use client'


//
import { useContext, useEffect} from "react"
import "@/app/components/Styles/styles.css"

//Realm
import UserDetails from "@/app/components/userDetails"
import LoginButton from "@/app/components/Login_Logout_Register/anonymous/loginButton"
import ErrorHandler from "@/app/components/Login_Logout_Register/email/error_handling"

import WhiteBox from "@/app/components/whiteBox"
import { appContext } from "@/app/components/ContextComponent/contextComp"



//


const Homepage = () => {

  const {errorCode,setErrorCode}=useContext(appContext)

  useEffect(()=>{
    setErrorCode(null);
  },[])




  
  return (
    <>
      <WhiteBox>
        <UserDetails/>
        <LoginButton/>
      </WhiteBox>

      {errorCode&&
        <div className="mt-4">
          <ErrorHandler/>
        </div>
      }

    </>
  )
}

export default Homepage;







