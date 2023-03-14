'use client'


import { motion } from "framer-motion"
//
import { useEffect, useState } from "react"
import "./styles.css"
import {app} from "./appObject"

//Realm
import * as Realm from "realm-web"

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
      <div>
        <div className="bg-white p-4 rounded-lg w-96 h-48">
            <div className="text-center">Login to my App</div>
            <br/>
            <div
              data-pageload={pageLoad}
              className="data-[pageload=true]:inline animate-hidden hidden">
  
              <UserDetails user={user}/>
              <div className="flex justify-between">
                <LoginButton user={user} setUser={setUser}/>
                {user&&<LogoutButton setUser={setUser}/>}
              </div>
            </div>
        </div>

        { user && <QueryField/>}
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

const QueryField = () =>{

  //We put them here so that we don't get 
  //"cannot read properties of undefined error"
  const mongo = app.currentUser!.mongoClient("mongodb-atlas");
  const collection = mongo.db("sample_mflix").collection("movies");


  const [titleInput,setTitleInput]=useState("");
  const [queryInput,setQueryInput]=useState("");

  const [dbGet,setDbGet]=useState(null);

  const getData = async()=>{
    await collection.aggregate([{$match:{title:titleInput}}])
    .then(data=>{setDbGet(data[0])});
  }

  return(
    <motion.div 
      animate={{
        opacity:[0,1],
        x:[-20,0],
        transition:{duration:2}
      }}
      className="bg-white p-4 rounded-lg w-96 min-h-96 mt-10">
        
        <div className="text-3xl ">
          Search something
        </div>

        <div className="my-6">
          <form 
            className="flex justify-around mb-1"
            onSubmit={(event)=>{
              event.preventDefault();
              getData();
            }}
            >

            <input 
              placeholder="Search Movie" 
              onChange={(event)=>{setTitleInput(event.target.value);}}
              className="bg-slate-50 px-2 py-1 rounded-md"/>
            <button className="border bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded-md">Search</button>
          </form>
          <p className="text-xs">Try typing a movie title &quot;Titanic&quot;,&quot;Spirited Away&quot;.</p>

        </div>

        <div className="my-6">
          <form 
            className="flex justify-around mb-1"
            onSubmit={(event)=>{
              event.preventDefault();
              getData();
            }}
            >

            <input 
              placeholder="Search metadata" 
              onChange={(event)=>{setQueryInput(event.target.value.toLowerCase());}}
              className="bg-slate-50 px-2 py-1 rounded-md"/>
            <button className="border bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded-md">Search</button>
          </form>
          <p className="text-xs">Try typing &quot;genres&quot;,&quot;languages&quot; or leave empty.</p>

        </div>

        <div>
          {/* {input} <br/> */}
          {(dbGet!=null && (dbGet[queryInput]!=null || queryInput==""))&&
          <>
           <div className="break-words text-center">
              { 
                (queryInput!="")?
                [dbGet[queryInput]].toString().replaceAll(",",", "):
                JSON.stringify(dbGet)
              }
            </div>

            <div className="my-6 text-center">
              <button 
                onClick={()=>{setDbGet(null)}}
                className="border bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded-md">
                Reset
              </button>
            </div>
          </>
            
          }
        </div>

    
    </motion.div>
  )
}