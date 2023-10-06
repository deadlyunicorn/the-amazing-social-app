import { useState } from "react";

export const MessageTextarea = () => {
  
  return (
    <textarea 
      id="message"
      aria-label="Input field for commenting to the post above."
      
      name="message"
      minLength={100}
      maxLength={300}
      className="
        bg-slate-200
        px-2 py-1 rounded-md
        w-full resize-none"
      
      placeholder={`Please describe your situation..`}/>
  )}