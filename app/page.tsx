'use client'


//
import { useEffect, useState } from "react"
import "@/app/components/Styles/styles.css"
import {app} from "@/app/components/appObject"

//Realm
import * as Realm from "realm-web"
import UserDetails from "@/app/components/userDetails"
import LoginButton from "@/app/components/Login_Logout_Register/anonymous/loginButton"
import LogoutButton from "@/app/components//Login_Logout_Register/logoutButton"
import ErrorHandler from "./components/Login_Logout_Register/email/error_handling"



//


const Testing = () => {

  const [pageLoad,setPageLoad]=useState(false);


  const [user,setUser]=useState<Realm.User | null>(null);
  const [errorCode,setErrorCode]=useState<string|null>(null);




  useEffect(()=>{
    setUser(app.currentUser);
    setTimeout(()=>{
      setPageLoad(true);
    },500);
  },[user])

  
  return (
    <>
      <div>
        <div className="bg-white p-4 rounded-lg w-96 h-48 animate-appearance">
            <div
              data-pageload={pageLoad}
              className="data-[pageload=true]:inline animate-hidden hidden">
  
              <UserDetails user={user}/>
              <div className="flex justify-between">
                <LoginButton user={user} setUser={setUser} setErrorCode={setErrorCode}/>
                {user&&<LogoutButton setUser={setUser}/>}
              </div>
            </div>
        </div>
        {errorCode&&
        <div className="mt-4">

          <ErrorHandler errorCode={errorCode} setErrorCode={setErrorCode}/>
        </div>
        }

      </div>
    </>
  )
}

export default Testing







