'use client'


//
import { useEffect, useState } from "react"
import "@/app/components/Styles/styles.css"
import {app} from "@/app/components/appObject"

//Realm
import * as Realm from "realm-web"
import UserDetails from "@/app/components/userDetails"
import LoginButton from "@/app/components/Login_Logout/loginButton"
import LogoutButton from "@/app/components//Login_Logout/logoutButton"
import QueryField from "@/app/components/queryField"

const {
  BSON: { ObjectId },
} = Realm;


//


const Testing = () => {

  const [pageLoad,setPageLoad]=useState(false);


  const [user,setUser]=useState<Realm.User | null>(null);

  useEffect(()=>{
    setUser(app.currentUser);
    setTimeout(()=>{
      setPageLoad(true);
    },500);
  },[user])

  
  return (
    <>
      <div className="rounded-lg w-96 min-h-96">
        { user && <QueryField/>}
      </div>
    </>
  )
}

export default Testing







