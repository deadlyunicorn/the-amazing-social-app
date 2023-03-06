'use client'
import { useEffect, useState } from "react"


export default function Time(){
  
  
  const [time,setTime]=useState('00:00')
  const [minutes,setMinutes]=useState(-1)
  useEffect(()=>{

        

    const timer = setInterval(()=>{

      setTime( prevState=>{ //previous State
        
        const date = new Date;
        const currentTime = `${(date.getHours()<10?'0':'')+date.getHours()}:${(date.getMinutes()<10?'0':'')+date.getMinutes()}`
        
        if(prevState!==currentTime){
          setMinutes(minutes+1) 
        }
        return currentTime; //if prevState == currentTime, component doesn't rerender.
      });
    
    },1000); //update timer every 1 second

    return () => {clearInterval(timer)} //clearInterval clock


  },[time,minutes])
  //whenever either of these changes the hook reruns.
  //'change' changes only when time changes. we add it as a dependency
  //to make sure in case we use it somewhere else.
  return (
    <>
      {time}

      {/* //{minutes>-1&&`You've been in this website for ${minutes} minutes.`} */}
      
    </>
  )
} 
