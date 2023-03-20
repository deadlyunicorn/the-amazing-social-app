import {app} from "@/app/components/appObject"
import {  FormEvent, useState } from "react";
import * as Realm from "realm-web"


const RegisterForm = () =>{
  const [email,setEmail]=useState<string>("");
  const [password,setPassword]=useState<string>("");
  const [loading,setLoading]=useState(false);


  const registerSubmit = async(event:FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
        if(!loading){
          setLoading(true);
          try{
            await app.emailPasswordAuth.registerUser({email,password})
          }
          catch(error){
            alert(`Error email is already in use. ${error}`)
          }
          finally{
            setLoading(false);
            //.then(()=>{goToNextPage})
          }
        }
  }

  return(
    <form 
      onSubmit={registerSubmit}
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

export default RegisterForm;