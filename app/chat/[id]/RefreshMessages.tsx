"use client"
import { useRouter } from "next/navigation";
import { useEffect } from "react"

export const RefreshMessage = () => {

  const router = useRouter();

  useEffect(()=>{

    const interval = setInterval( ()=> {
      router.refresh();
    },
    10000)

    return ()=>{ clearInterval(interval)};

  },[])

  return (
    <></>
  )
}