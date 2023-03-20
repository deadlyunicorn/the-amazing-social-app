'use client'


//
import { useEffect, useState } from "react"
import "@/app/components/Styles/styles.css"
import {app} from "@/app/components/appObject"

//Realm
import * as Realm from "realm-web"
import UserDetails from "@/app/components/userDetails"

import QueryField from "@/app/components/queryField"
import Link from "next/link"

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
        { user ? 
        <QueryField/> :
        <UserDetailsWrap pageLoad={pageLoad}/>
        }
      </div>
    </>
  )
}

export default Testing


const UserDetailsWrap = (
  {pageLoad}:{pageLoad:boolean}
) => {
  return (
    <div data-pageload={pageLoad}
    className="data-[pageload=true]:inline animate-hidden hidden">
      <div className=" p-4 rounded-lg w-96 h-36 bg-white">

        <div className="text-center">
          <Link
          className="hover:text-blue-400 text-blue-600"
          href="/">
            Login to my App
          </Link>
        </div>
        
        <div>
                <UserDetails user={null}/>
        </div>
      </div>
    </div>

  )
}







