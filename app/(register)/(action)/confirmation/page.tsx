import "@/app/components/Styles/styles.css"
import {app} from "@/app/components/appObject"
import ErrorHandler from "@/app/components/Login_Logout_Register/email/error_handling";
import Link from "next/link";

interface MongoError{
  error:string;
  errorCode:string|null;
};


export default async function ConfirmationPage(
  
  //{params}=params.params
  {searchParams:{
    token,
    tokenId}}:
  {searchParams:{
    token:string,
    tokenId:string}})
{
  
  try{
    await app.emailPasswordAuth.confirmUser({token,tokenId})
  }
  catch(error){
    const JSONError=error as MongoError;
    alert(JSONError.errorCode);
  }


  

  return(
    <>
      <div className="bg-white p-4 rounded-lg w-96 h-44 mb-4 animate-appearance text-center ">
      {token&&tokenId&&
      <>
        Your email has been successfully confirmed!
        <br/>You can now&nbsp;
        <Link 
        className="w-fit hover:text-blue-400 text-blue-600"
        href="/login">login</Link>
      </>
      }
      <br/>
      {!token||!tokenId&&<PageNotFound/>}
      </div>
    </>
  )
}


const PageNotFound = () =>{
  return(
    <>
      You might have clicked on this page by mistake.
    </>
  )
}