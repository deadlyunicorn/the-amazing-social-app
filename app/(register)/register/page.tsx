'use client'
import {app} from "@/app/components/appObject"
import { useEffect, useState } from "react";
import "@/app/components/Styles/styles.css"
import * as Realm from "realm-web"
import UserDetails from "@/app/components/userDetails";
import LogoutButton from "@/app/components/Login_Logout_Register/logoutButton";
import RegisterForm from "@/app/components/Login_Logout_Register/email/register_form";



const UserPage = () =>{

  const [pageLoad,setPageLoad]=useState(false);
  const [user,setUser]=useState<Realm.User | null>(null);


  useEffect(()=>{
    setUser(app.currentUser);
    setTimeout(()=>{
      setPageLoad(true);
    },500);
  },[user])


  return(
    <div className="bg-white p-4 rounded-lg w-96 h-48">
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
            <RegisterForm/>
          </>
          }


      </div>
    </div>
  )
}



export default UserPage;