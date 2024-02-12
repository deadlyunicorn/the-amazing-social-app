"use client"

import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";

export const MessageTextAreaClient = () => {

  const [message,setMessage] = useState("");
  const { pending } = useFormStatus();

  useEffect( ()=> {
    if( !pending ){
      setMessage('');
    }
  },[pending])

  return (
    <textarea 
      className="w-full px-2 py-1 rounded-md resize-none min-h-14"
      name="message"
      placeholder="Enter your message.."
      value={message}
      onChange={(e)=>{
        e.target.style.height = `${e.target.scrollHeight}px`;
        setMessage(e.target.value);
      }}
      minLength={2}
      maxLength={300}/>
  )
}
