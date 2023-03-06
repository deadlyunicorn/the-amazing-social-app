'use client'

import { useState,useEffect } from "react"


const FetchButton = (props:{passDown:(string)[]}) =>{




    const [button,setButton]=useState(false);
    const [input,setInput]=useState("");
    //maybe useRef??

    //const [hasData,setHasData]=useState(0);
    const [field,setField]=useState("genres");
    const [query,setquery]=useState("Loading Data..");



    useEffect(()=>{

        if (props.passDown.length>0){
          //setHasData(1);
          const firstDocument=((JSON.parse(props.passDown[0])[field]));
          if (firstDocument!=undefined){
            setquery(firstDocument.toString());
          }
          else setquery("Not found..");

        
        }
        else setquery("Loading Data..");

    },[props.passDown,field])


    return (
    <>
      <div className="text-center">
        <input 
          type='text' 
          placeholder="genres,languages,title"
          onChange={(event)=>{
            setInput(event.target.value)
            }}/>

        <button 
          onClick={()=>{
            setButton(true);setField(input)
          }}
          className="border p-1 rounded-md 
          bg-white bg-opacity-5 hover:bg-opacity-10">
        
            hello world!
        </button>
        <div>
          <div>
            {/* {hasData} */}
          </div>
        </div>

        <div className="border break-all">
          {(button&&query!=null)&&query}
        </div>
      
      </div>
    </>
  )
}

console.log('runs')

export default FetchButton;