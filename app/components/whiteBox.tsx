import { ReactNode } from "react";

export default function WhiteBox ({children}:{children:ReactNode}) {

  return(
    <div className="
    bg-white
    mb-4 p-4 rounded-lg
    w-96 min-h-[192px] 
    animate-appearance 
    flex flex-col justify-between ">
      {children}
    </div>
  )
};