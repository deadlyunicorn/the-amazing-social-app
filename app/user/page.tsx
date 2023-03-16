'use client'
import {app} from "@/app/components/appObject"
import { useEffect, useState } from "react";
import "@/app/components/Styles/styles.css"
import * as Realm from "realm-web"
import UserDetails from "./components/userDetails";





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

        <UserDetails user={user}/>
        <div className="flex justify-between">
        </div>
      </div>
    </div>
  )
}

export default UserPage;