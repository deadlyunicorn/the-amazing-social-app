'use client'
import { useContext, useEffect } from "react"
import { ReactNode } from "react";
import ErrorHandler from "./Login_Logout_Register/email/error_handling";
import { appContext } from "./ContextComponent/contextComp";

export default function WhiteBox ({children}:{children:ReactNode}) {


  const {errorCode,setErrorCode}=useContext(appContext)

  useEffect(()=>{
    setErrorCode(null);
  },[])
//

  return(
    <>
    <section className="
    bg-white
    mb-4 p-4 rounded-lg
    w-96 min-h-[192px] 
    animate-appearance 
    flex flex-col justify-between ">
      {children}
    </section>

    {errorCode&&
    <aside className="mt-4">
        <ErrorHandler/>
    </aside>
    }

    </>
  )
};