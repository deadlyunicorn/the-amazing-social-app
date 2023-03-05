'use client'

import { useState } from "react"


const FetchButton = (props:{passDown:JSON[]}) =>{


  const newDoc=props.passDown;
  

  const finalFetch=newDoc[0]

    const [button,setButton]=useState(false);
    const [field,setField]=useState("genres");
    const [input,setInput]=useState("");


    return (
    <>
      <div className="text-center">
        <input type='text' onChange={(event)=>{setInput(event.target.value)}}/>
        <button 
          onClick={()=>{setButton(true);setField(input)}}
          className="border p-1 rounded-md bg-white bg-opacity-5 hover:bg-opacity-10">
            hello world!
        </button>
        {input}
        <div>
          {button&&JSON.stringify(finalFetch[field as keyof Object])}
        </div>
      </div>
    </>
  )
}

console.log('runs')

export default FetchButton;