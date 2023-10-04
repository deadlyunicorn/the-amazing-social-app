'use client'
import { useEffect, useState } from "react"
import {motion} from "framer-motion"


export default function Time(){
  
  
  const [time,setTime]=useState('30:00')
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
      <div className="w-12">

        <time>
          {time=="30:00"?<LoadingTime/>:time}
        </time>
      </div>


      {/* //{minutes>-1&&`You've been in this website for ${minutes} minutes.`} */}
      
    </>
  )
} 

const LoadingTime = () => (
    <motion.div className="h-6
      flex items-center justify-center">
      
      <motion.div
        animate={{
          x:[0,-8,0,8],
          height:['12px','8px','12px','8px']
        }}
        
        transition={{
          type:"keyframes",
          repeat:8,
          repeatType:"mirror",
          duration:1,
        }}
        className="border border-white bg-white w-1 h-3 drop-shadow-[0px_0px_4px_rgba(255,255,255,1)] rounded-full ">
        
      </motion.div>
    </motion.div>
)
