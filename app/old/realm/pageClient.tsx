'use client'

import * as Realm from "realm-web";
import {  useEffect, useState } from "react";
import { app } from '@/app/utils/mongo_client'



const UserPage = () => {


  const [user,setUser]=useState<Realm.User|null>(null);

  //const [isLoading,setIsLoading]=useState(true);
  //^^^^^ not used but a good idea for future debugging..

  useEffect(()=>{
    //during the initial load, first 
    //check if there is already a logged in session
    setUser(app.currentUser);
      
  },[])


  return (
    <>
      <div className=" bg-white flex flex-col gap-2 p-2 rounded-xl text-center">
        <div>
          Hello world {(user&&user["id"])?JSON.stringify(user["id"]):"null"}
        </div>

        <LoginButton setUser={setUser}/>
        <LogoutButton setUser={setUser}/>
        <UserCondition user={user}/>


      </div>


    </>
  )
  
  //Managed to make it work without if else statements..
  //Maybe things that helped
  //set initial user -> null
  //inside useEffect make it app.currentUser so that it somewhat renders
  //https://nextjs.org/docs/messages/react-hydration-error
  //also on all the conditional renderings use the State of 'user' instead of app.currentUser..


  ///Things to do for tomorrow:
  ///Make it so that the log in button appears after 1 second of being
  //on the website so that it has time to fistly  check if user == null
  // and then it apperas if it's null, else it doesn't appear.
  //
  //You can also make the same for the other user interface that
  //conditionally renders.. add some loading animation the first second
  //if it's null
  //or load instantly if it is not null something like that..

//   else return( ///This if - else finally enlightened my path..
// // I am no longer getting hydrations errors...
// //The loading below works as a loader??
//   <>
//     is loading
//   </>
// )




}

export default UserPage;


const LoginButton = (
  
  {setUser}: { setUser: (user:Realm.User) =>void }
  
  ) => {


  const loginFunction = async () => {
    if(!app.currentUser){ //Login only if there is 
      //no current user logged in.
      const anonymous = Realm.Credentials.anonymous();
      const user = await app.logIn(anonymous);
      setUser(user);
    }
  }

  return (
    <div>
    Pressed the button below to log in <br/>

    <button 
      className="border-black border rounded-md px-2 py-1 bg-gradient-to-b from-cyan-400 to-green-200"
      onClick={()=>{loginFunction()}}
      >
      Login
    </button>
  </div>
  )
}

const LogoutButton = (

  {setUser}: { setUser: (user:Realm.User|null) =>void }

) => {

  const logoutFunction = async () => {
    if(app.currentUser){
      await app.removeUser(app.currentUser);
      setUser(null);
    }
  }
``
  return (
    <div>
    Pressed the button below to log out <br/>

    <button 
      className="border-black border rounded-md px-2 py-1 bg-gradient-to-b from-cyan-400 to-green-200"
      onClick={()=>{
        logoutFunction();
      }}
      >
      Logout
    </button>
  </div>
  )
}

const UserCondition = ({user}:any) => {
  
  if(user){
    return(
      <div>
        User is logged in..
      </div>
    )
  }
  else return(
    <div>
      No user logged in..
      {(user&&user["id"])?user["id"]:<span>No one</span>}
    </div>
  )
}

