'use client'
import {app} from "../../components/appObject"
import * as Realm from "realm-web"

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

export default LogoutButton;