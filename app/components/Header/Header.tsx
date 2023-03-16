import Link from "next/link"
import { Neucha } from 'next/font/google'
import { ReactNode } from "react"
import Time from "./Header_time"
  const neucha = Neucha({subsets:['latin'],weight:"400"})



const Header = () => (
  <header 
    className="absolute w-full ">
      <SiteLogo/>
      <GuestOptions/>
  </header>
)

const SiteLogo = () => (
  <div
  className="
    text-3xl  flex justify-center
    text-neutral-300 bg-neutral-800 p-2">

    <span className={neucha.className}>
      <Link href="/" className='underline'>
        Social App
      </Link>
    </span>
  </div>

)

const GuestOptions = () => (
  <div 
  className="w-full bg-neutral-800 
  flex justify-between gap-2 
  py-2 px-2 border-t border-zinc-400">


    <div>
      <Authenticate>
        <Time/>
      </Authenticate>
    </div>

    {/* If not Signed In show the following else show "Profile Button" */}
    <div>
      <Link href="/login">
        <Authenticate>
          Log in
        </Authenticate>
      </Link>
      
      <Link href="/register">
        <Authenticate>
          Sign up
        </Authenticate>
      </Link>

    </div>
    {/*  */}

  </div>
)

const Authenticate = (props:{children:ReactNode}) => (
  <button 
  className='
    border-b-zinc-400 hover:border-b-zinc-200 border-b 
    border-r-black border-r-2
    h-8
    py-1 px-2 rounded-md
    text-zinc-400 hover:text-zinc-200'>
    
    <span>
      {props.children}
    </span>
  </button>
)

export default Header;