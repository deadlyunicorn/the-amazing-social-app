'use client'

import {app} from "@/app/components/appObject"
import Link from "next/link"
import { useContext, useState } from "react"
import * as Realm from "realm-web"
import { appContext } from "@/app/components/ContextComponent/contextComp"

interface MongoError{
  error:string;
  errorCode:string|null;
};


const LoginButton = (
) =>{
  const {user,setUser,setErrorCode}=useContext(appContext)

  const [loading,setLoading]=useState(false)
  const login=async()=>{
    if (!loading){
      setErrorCode("Loading")
      setLoading(true); 
      //prevents multiple sessions if
    //somebody clicks the button multipl times
    
    try{
      const user:Realm.User = await app.logIn(Realm.Credentials.anonymous()); 
      setUser(user);
      setErrorCode(null)
    }
    catch(error){
      const JSONError=error as MongoError;
      if(JSONError.errorCode){
        setErrorCode(JSONError.errorCode);
      }
      else{
        setErrorCode("Uknown Error")
      }
    }
    setLoading(false);
  }

  }
  
  if (loading||!user)
  return (
    <>
    <div className="flex justify-center items-center w-full gap-x-3">
        <button
          className="hover:text-blue-400 text-blue-600  "
          onClick={()=>{login();}}>
          Anon Login
        </button>
        <Link 
        className="hover:text-blue-400 text-blue-600  "
        href="/login/email">
          Email Login
        </Link>
      </div>
    </>
  )
  else return(<>hello?</>)
}

export default LoginButton;