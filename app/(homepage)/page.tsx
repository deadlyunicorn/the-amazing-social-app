'use client'


//
import { useContext, useEffect} from "react"

//Realm
import UserDetails from "@/app/components/userDetails"
import LoginButton from "@/app/components/Login_Logout_Register/anonymous/loginButton"
import ErrorHandler from "@/app/components/Login_Logout_Register/email/error_handling"

import WhiteBox from "@/app/components/whiteBox"
import { appContext } from "@/app/components/ContextComponent/contextComp"
import About from "./about"




//


const Homepage = () => {

  const {errorCode,setErrorCode}=useContext(appContext)

  useEffect(()=>{
    setErrorCode(null);
  },[])




  
  return (
    <>
      <WhiteBox>
        <About/>
      </WhiteBox>



      <WhiteBox>
          <UserDetails/>
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







