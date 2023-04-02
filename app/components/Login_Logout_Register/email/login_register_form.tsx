import {app} from "@/app/components/appObject"
import { useRouter } from "next/navigation";
import {  FormEvent, useState } from "react";
import * as Realm from "realm-web"

interface MongoError{
  error:string;
  errorCode:string|null;
};

const Form = (
  {formType,
  setErrorCode,
  email,setEmail,
  password,setPassword,
  setUser
  }:
  {formType:string,setErrorCode:(error:string|null)=>void,
  email:string,setEmail:(email:string)=>void,
  password:string,setPassword:(password:string)=>void,
  setUser?:(user:Realm.User|null)=>void
  }
) =>{

  
  
  const [loading,setLoading]=useState(false);

  const router = useRouter();
  

  const loginSubmit = async()=>{
    if(!loading){
      setErrorCode("Loading")
      setLoading(true);

      const credentials=Realm.Credentials.emailPassword(email,password);
      try{
        await app.logIn(credentials)
        if(setUser)setUser(app.currentUser);
        setErrorCode(null);
        router.push('/')
        
      }

      catch(error){
        const JSONError=error as MongoError;

//        console.log(JSONError.error + "\nerror_code:" + JSONError.errorCode);

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


  const registerSubmit = async()=>{
        if(!loading){
          setLoading(true);
          try{
            setErrorCode("Loading");
            await app.emailPasswordAuth.registerUser({email,password})
            setErrorCode("register_complete");//prompt user to check email for confirmation.
          }
          catch(error){
            const JSONerror=error as MongoError;
            if (JSONerror.errorCode){
              setErrorCode(JSONerror.errorCode);
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

  const FormSubmit=(event:FormEvent<HTMLFormElement>)=>{
    event.preventDefault();

    switch(formType){
      case "register":
        registerSubmit();
        break;

      case "login":
        loginSubmit();
        break;
    }

  }


  return(

    <form 
    onSubmit={FormSubmit}
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

export default Form;

