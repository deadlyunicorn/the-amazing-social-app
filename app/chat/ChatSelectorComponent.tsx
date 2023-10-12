import Link from "next/link";
import Image from "next/image";
import { userObject } from "../api/mongodb/user/user";


export const ChatSelectorComponent = ( {availableUsers}: {availableUsers: userObject[]}) => (

  <section className="flex flex-col animate-none">
    <h1 
      className="border-0 text-center">Users</h1>

    <ul className="flex gap-x-10 overflow-x-auto px-10 pb-8 my-4">
    { availableUsers.map( user=> 
      <li 
        className="
          group
          relative items-center
          flex flex-col
          flex-shrink-0" key={user._id.toString()}>
        <div className="
          bg-neutral-700 px-2 rounded-md
          text-secondary
          absolute -bottom-8 
          hidden group-hover:inline 
          text-center">
          {user.username}
        </div>
        <Link 
          href={`/chat/${user._id}`}>
          <Image
            className="
            hover:brightness-125
            rounded-full h-12 w-12 
            object-contain bg-slate-400 bg-opacity-40"
            width={48}
            height={48}
            alt={`${user.username}'s avatar`}
            src={user.avatarSrc || '/favicon.svg'}>

          </Image>
        </Link> 
      </li>
    )}
    </ul>
    Change ui so that its vertical on desktop and on the left side of the screen.
    Select one of the available users to select a chat!

  </section>
)