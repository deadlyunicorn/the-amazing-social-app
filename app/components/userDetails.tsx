'use client'
import Link from "next/link"
import LogoutButton from "@/app/components/Login_Logout_Register/logoutButton"

import { useContext } from "react"
import { appContext } from "@/app/components/ContextComponent/contextComp"


const UserDetails = (
) => {
  const {user}=useContext(appContext)

  if(user){

    return(
      <>
      <div className="
        text-3xl 
        flex flex-col justify-between 
        h-28 ">
        
        Logged in with 
          <span className="text-lg">
            id: {user.id}
          </span>
          {user&&<LogoutButton/>}

      </div>
    </>
    )
  }
  else{
    return(
      <>
        <div className="text-3xl">
          Not logged in. 
          <br/>
          <br/>
            <p className="text-lg text-center">
              Consider&nbsp;          
            <Link
              className="hover:text-blue-400 text-blue-600"
              href="/login">
              Logging in
            </Link>
            .
            </p>
        </div>
      </>
    )
  }
}

export default UserDetails