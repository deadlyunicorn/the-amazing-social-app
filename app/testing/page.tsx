'use client'


//
import { useEffect, useState } from "react"
import "./styles.css"
import {app} from "./components/appObject"

//Realm
import * as Realm from "realm-web"
import UserDetails from "./components/userDetails"
import LoginButton from "./components/loginButton"
import LogoutButton from "./components/logoutButton"
import QueryField from "./components/queryField"

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
      <div>
        <div className="bg-white p-4 rounded-lg w-96 h-48">
            <div className="text-center">Login to my App</div>
            <br/>
            <div
              data-pageload={pageLoad}
              className="data-[pageload=true]:inline animate-hidden hidden">
  
              <UserDetails user={user}/>
              <div className="flex justify-between">
                <LoginButton user={user} setUser={setUser}/>
                {user&&<LogoutButton setUser={setUser}/>}
              </div>
            </div>
        </div>

        { user && <QueryField/>}
      </div>
    </>
  )
}

export default Testing







