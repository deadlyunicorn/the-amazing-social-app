'use client'
import {app} from "@/app/components/appObject"
import { useContext, useState } from "react"
import { appContext } from "@/app/components/ContextComponent/contextComp"

import * as Realm from "realm-web"

interface MongoError{
  error:string;
  errorCode:string|null;
};

const LogoutButton = () => {

  const {setUser,setErrorCode}=useContext(appContext)
  const [loading,setLoading]=useState(false);



      //removeUser -> Logouts
      //deleteUser -> Deletes user from DB as well
  const deleteUser = async() =>{
    if (app.currentUser&&!loading){
      try{
        setLoading(true)
        setErrorCode('Loading')
        await app.deleteUser(app.currentUser);
        setUser(null);
        setErrorCode(null);

      }
      catch(error){
        const JSONError=error as MongoError;
        setErrorCode(JSONError.errorCode||"Uknown Error")
      }
      finally{
        setLoading(false)
      }

    }
  }

  const logout = async() =>{
    if (app.currentUser&&!loading){
      try{
        setLoading(true)
        setErrorCode('Loading')
        await app.removeUser(app.currentUser);
        setUser(null);
        setErrorCode(null);
      }
      catch(error){
        const JSONError=error as MongoError;
        setErrorCode(JSONError.errorCode||"Uknown Error")
      }
      finally{
        setLoading(false)
      }
      //removeUser -> Logouts
      //deleteUser -> Deletes user from DB as well
    }
  }

    return(
      <div className="text-lg flex gap-x-3 justify-center">
      <button 
        className="hover:text-blue-400 text-blue-600"
        onClick={()=>{deleteUser();}}>
        Delete Account
      </button>
      {app.currentUser&&
      app.currentUser['identities'][0]['providerType']!="anon-user"&&
      <>
        &nbsp;or&nbsp;
        <button 
          className="hover:text-blue-400 text-blue-600"
          onClick={()=>{logout();}}>
          Logout
        </button>
      </>
      }
    </div>
    )
}

export default LogoutButton;