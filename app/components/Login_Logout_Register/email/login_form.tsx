import {app} from "@/app/components/appObject"
import {  FormEvent, useState } from "react";
import * as Realm from "realm-web"

interface MongoError{
  error:string;
  errorCode:string|null;
};

const LoginForm = (
  {setErrorCode,
  email,setEmail,
  password,setPassword}:
  {setErrorCode:(error:string)=>void,
  email:string,setEmail:(email:string)=>void,
  password:string,setPassword:(password:string)=>void
  }
) =>{

  
  
  const [loading,setLoading]=useState(false);

  
  

  const loginSubmit = async(event:FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    if(!loading){
      setLoading(true);

      const credentials=Realm.Credentials.emailPassword(email,password);
      try{
        await app.logIn(credentials)
      }

      catch(error){
        const JSONError=error as MongoError;

        console.log(JSONError.error + "\nerror_code:" + JSONError.errorCode);

        if(JSONError.errorCode){
          setErrorCode(JSONError.errorCode);
        }
        else{
          setErrorCode("Uknown Error")
        }
      }
      finally{
        setLoading(false);
        //.then(()=>{goToNextPage})
      }
    }
  }


  return(

    <form 
    onSubmit={loginSubmit}
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

export default LoginForm;

