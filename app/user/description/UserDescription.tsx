"use client"
import { SubmitButtonClient } from "@/app/(components)/SubmitButtonClient";
import { KeyboardEvent, ReactNode, useEffect, useState } from "react"
import { handleDescriptionForm } from "./putDescription";

export const UserDescription = ({ description, ownsProfile }: { description: string, ownsProfile : boolean }) => {

  const [editing, setEditing] = useState(false);

  useEffect(()=>{
    setEditing(false)
  },[description])


  return (

    <>
    {
      (editing && ownsProfile)
        ?<EditDescription>
          
          <textarea
              onKeyDown={handleEnter}
              name="description"
              placeholder = "Type your new description in here.."
              className ="resize-none
                w-full h-full
                text-center
                overflow-hidden
                bg-white bg-opacity-10"
            maxLength = {200} />

        </EditDescription>

      : <DisplayDescription description={description} />
    } 

    {ownsProfile &&
      (
        editing?
          <button
          className="
            absolute bottom-0 right-0
            text-error-light-reactive"
          onClick={() => { setEditing(!editing) }}>
            Discard
          </button>

      :<button
        onClick={() => { setEditing(!editing) }}
        className="text-link ">
        Update description
      </button>
      )
      
    }
      


    </>

  )
}


const DisplayDescription = ({ description }: { description: string }) => (

  <DescriptionWrap>

    <p className="
        flex items-center text-center ">

      {description}

    </p>

  </DescriptionWrap>

)



const EditDescription = ({children}:{children:ReactNode}) => {

  return (
    <form action={handleDescriptionForm}>
      <DescriptionWrap>

        {children}

      </DescriptionWrap>

      <SubmitButtonClient/>
    </form>

  )

}


export const DescriptionWrap = ({ children }: { children: ReactNode }) => (
  <article className="
  h-36 py-2 overflow-hidden 
  flex 
  w-full items-start justify-center">

    {children}

  </article>
)

const handleEnter = (e:KeyboardEvent) => {

  if (e.key=="Enter"){
    e.preventDefault();
  }
}