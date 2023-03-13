'use client'
import * as Realm from "realm-web"
const {
  BSON: { ObjectId },
} = Realm;



import { useEffect, useState } from "react"
import "./styles.css"
import {app} from "./appObject"
import router from "next/router"

const Testing = () => {

  const [pageLoad,setPageLoad]=useState(false);
  setTimeout(()=>{
    setPageLoad(true);
  },500)

  const [user,setUser]=useState<Realm.User | null>(null);

  useEffect(()=>{
    setUser(app.currentUser);
  },[user])

  
  return (
    <>
      <div>
        <div className="bg-white p-4 rounded-lg w-96 h-48">
            <div className="text-center">Login to my App</div>
            <br/>
            <div
              data-pageLoad={pageLoad}
              className="data-[pageLoad=true]:inline animate-hidden hidden">
  
              <UserDetails user={user}/>
              <div className="flex justify-between">
                <LoginButton user={user} setUser={setUser}/>
                {user&&<LogoutButton setUser={setUser}/>}
              </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default Testing

const UserDetails = (
  {user}:{user:Realm.User|null}
) => {

  if(user){

    return(
      <>
      <div className="text-3xl">
        Logged in with <span className="text-lg">{user.id}</span>
      </div>
    </>
    )
  }
  else{
    return(
      <>
        <div className="text-3xl">
          Not logged in. <span className="text-lg">Consider&nbsp;logging&nbsp;in</span>
        </div>
      </>
    )
  }
}

const LoginButton = (

  {setUser,user}:{setUser:(user:Realm.User)=>void,user:Realm.User|null}
) =>{

  const login=async()=>{
    const user:Realm.User = await app.logIn(Realm.Credentials.anonymous()); 
    setUser(user);
  }
  
  if (!user)
  return (
    <>
      <button
        className="hover:text-blue-400 text-blue-600"
        onClick={()=>{login();}}>
        Login
      </button>
    </>
  )
  else return(<>hello?</>)
}

const LogoutButton = (
  {setUser}:{setUser:(user:Realm.User|null)=>void}
) => {


  const logout = async() =>{
    if (app.currentUser){
      await app.deleteUser(app.currentUser);
      //removeUser -> Logouts
      //deleteUser -> Deletes user from DB as well
      setUser(null);
    }
  }

    return(
      <>
      <button 
        className="hover:text-blue-400 text-blue-600"
        onClick={()=>{logout();}}>
        Logout
      </button>
    </>
    )
}