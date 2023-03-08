'use client'

import {motion} from "framer-motion"

function TimeLoadingTesting(){

  return(
  <motion.div className="h-8 w-12 
    flex items-center justify-center">
    
    <motion.div
      animate={{
        x:[-8,0,8],
        height:['8px','12px','8px']
      }}
      
      transition={{
        type:"spring",
        repeat:8,
        repeatType:"mirror",
        duration:1,
      }}
      className="border border-white bg-white w-1 drop-shadow-[0px_0px_4px_rgba(255,255,255,1)] rounded-full ">
      
    </motion.div>
  </motion.div>
  )
}
