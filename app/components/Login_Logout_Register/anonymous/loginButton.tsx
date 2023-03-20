'use client'

import {app} from "@/app/components/appObject"
import { useState } from "react"
import * as Realm from "realm-web"



const LoginButton = (

  {setUser,user}:{setUser:(user:Realm.User)=>void,user:Realm.User|null}
) =>{

  const [loading,setLoading]=useState(false)
  const login=async()=>{
    if (!loading){
    setLoading(true); //prevents multiple sessions if
    //somebody clicks the button multipl times
    const user:Realm.User = await app.logIn(Realm.Credentials.anonymous()); 
    setUser(user);
    setLoading(false);
  }

  }
  
  if (loading||!user)
  return (
    <>
      <button
        className="hover:text-blue-400 text-blue-600"
        onClick={()=>{login();}}>
        Anon Login
      </button>
    </>
  )
  else return(<>hello?</>)
}

export default LoginButton;