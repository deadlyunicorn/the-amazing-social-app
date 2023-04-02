'use client'

import { ReactNode, createContext, useEffect, useState } from "react"
import * as Realm from "realm-web"
import {app} from "@/app/components/appObject"


interface appInterface{
  user:Realm.User | null;
  setUser:(user:Realm.User | null)=>void;
  errorCode:string|null;
  setErrorCode:(errorCode:string|null)=>void;
};

export const appContext = createContext<appInterface>({
  user:null,
  setUser:(user)=>{},
  errorCode:null,
  setErrorCode:(user)=>{}
})

export default function UserContext({children}:{children:ReactNode}){

  const [user,setUser]=useState<Realm.User | null>(null);
  const [errorCode,setErrorCode]=useState<string | null>(null);
//as we are using errorCode with useContext
//so that we simplify our props
//we need to set it to null whenever we change page
//with a useEffect on each page.. 

  const value={user,setUser,errorCode,setErrorCode}


  useEffect(()=>{

    setUser(app.currentUser);
  },[user])


  return(
    <>
      <appContext.Provider value={value}>
        {children}
      </appContext.Provider>
    </>

  )
}