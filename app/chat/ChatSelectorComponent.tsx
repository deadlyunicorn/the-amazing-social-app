import Link from "next/link";
import Image from "next/image";
import { getUserDetails, userObject } from "../api/mongodb/user/user";


export const ChatSelectorComponent = async( {availableUsers}: {availableUsers: userObject[]}) => {

  const sender = await getUserDetails();
  const currentYear = new Date().getFullYear();
  
  return (
  <section className="
    flex flex-col animate-none lg:top-[15vh] lg:sticky">
    <h1 
      className="border-0 text-center">Users</h1>

    <ul className="
      flex gap-x-10 overflow-x-auto px-10 pb-8 my-4
      lg:flex-col lg:gap-y-4 lg:items-start lg:max-h-96 lg:py-4
      ">
    { availableUsers.map( receiver=> 
      <li 
        className="
          group
          relative items-center
          flex flex-col
          lg:flex-row lg:gap-x-2
          flex-shrink-0" key={receiver._id.toString()}>

        <div className="
          lg:group-hover:hidden
          bg-neutral-700 px-2 rounded-md
          text-secondary
          absolute -bottom-8 
          hidden group-hover:inline 
          text-center">
          {receiver.username}
        </div>
        <div className="absolute -bottom-8 lg:hidden group-hover:hidden">
          {currentYear - receiver.age} y.o.
        </div>
        

        <Link 
          className="peer"
          href={ ( sender && sender._id )
              ?`/chat/${sender._id.toString() + receiver._id.toString() }`
              :"/login"
          }>
          <Image
            className="
            hover:brightness-125
            rounded-full h-12 w-12 
            object-cover bg-slate-400 bg-opacity-40"
            width={48}
            height={48}
            alt={`${receiver.username}'s avatar`}
            src={receiver.avatarSrc || '/favicon.svg'}>

          </Image>
        </Link> 

        <div className="
          hidden
          lg:flex flex-col 
          peer peer-hover:group">
          <div className="flex gap-x-2">
            <Link
              className="group-hover:text-blue-400" 
              href={ ( sender && sender._id )
                  ?`/chat/${sender._id.toString() + receiver._id.toString() }`
                  :"/login"
              }>
              {receiver.username}
            </Link>
            <span className="text-xs place-self-end"> { currentYear - receiver.age } y.o.</span>
          </div>
          <p>{receiver.description || "Hello world!"}</p>
        </div>
        
      </li>
    )}
    </ul>
    <p className="text-center">
      Select one of the available users to select a chat!
    </p>
  </section>
  )
}