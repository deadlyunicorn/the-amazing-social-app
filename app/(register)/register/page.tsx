'use client'
import {app} from "@/app/components/appObject"
import { useEffect, useState } from "react";
import "@/app/components/Styles/styles.css"
import * as Realm from "realm-web"
import UserDetails from "@/app/components/userDetails";
import LogoutButton from "../../components/Login_Logout/logoutButton";





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

const RegisterForm = () =>{
  const [email,setEmail]=useState<string>("");
  const [password,setPassword]=useState<string>("");
  return(
    <form 
      onSubmit={async(event)=>{
        event.preventDefault();
        await app.emailPasswordAuth.registerUser({email,password})
        //.then(()=>{goToNextPage})
      
      }}
//add functionality to redirect you to a verification page where it tells them to check their email


      className="flex flex-col gap-2 px-3 py-2">
      
      <input
        onChange={(event)=>{setEmail(event.target.value);}}
        className="py-1 px-2"
        placeholder="Email" type={"email"} minLength={10} required/>
      
      <input
        onChange={(event)=>{setPassword(event.target.value);}}
        className="py-1 px-2"
        placeholder="Password" type={"password"} minLength={10} required/>

      <button 
        className="border bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded-md">
        Submit
      </button>
    </form>
  )
}

export default UserPage;