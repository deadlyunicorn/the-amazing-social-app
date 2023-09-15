import { ReactNode } from "react";

export const MultipleRowsWrapper = ({children}:{children:ReactNode}) => (
  <div className="flex flex-col w-full gap-y-8 items-center ">

      {children}
    
  </div>
)