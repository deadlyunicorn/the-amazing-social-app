'use client'

import {app} from "@/app/components/appObject"
import Link from "next/link"
import { useState } from "react"
import * as Realm from "realm-web"

interface MongoError{
  error:string;
  errorCode:string|null;
};


const LoginButton = (

  {setUser,user,
  setErrorCode}
  :{setUser:(user:Realm.User)=>void,user:Realm.User|null,
  setErrorCode:(error:string|null)=>void
  }
) =>{

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
    <div className="flex flex-col justify-center items-center w-full">
        <button
          className="hover:text-blue-400 text-blue-600  "
          onClick={()=>{login();}}>
          Anon Login
        </button>
        <Link 
        className="hover:text-blue-400 text-blue-600  "
        href="/login">
          Email Login
        </Link>
      </div>
    </>
  )
  else return(<>hello?</>)
}

export default LoginButton;