import { ReactNode } from "react";

export const MultipleRowsWrapper = ({children}:{children:ReactNode}) => (
  <div className="flex flex-col w-full gap-y-8 items-center 
    lg:grid lg:grid-cols-2 lg:gap-x-20 
    lg:items-start lg:place-items-center
    relative lg:h-full">

      {children}
    
  </div>
)

export const SimpleMultipleRowsWrapper = ({children}:{children:ReactNode}) => (
  <div className="flex flex-col w-full items-center gap-y-8">
    {children}
  </div>
)