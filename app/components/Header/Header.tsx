'use client'
import Link from "next/link"
import Image from "next/image"
import { Neucha } from 'next/font/google'
import { ReactNode, useContext, useEffect, useState } from "react"
import Time from "./Header_time"
  const neucha = Neucha({subsets:['latin'],weight:"400"})
import {app} from "@/app/components/appObject"

import "@/app/components/Styles/styles.css"
import { appContext } from "@/app/components/ContextComponent/contextComp"




const Header = () => (
  <header 
    className="fixed w-full z-10">
      <SiteLogo/>
      <GuestOptions/>
  </header>
)

const SiteLogo = () => (
  <div
  className="
    text-3xl  flex justify-center
    bg-neutral-800 p-2">

    <span className={neucha.className}>
      <Link href="/" className=' flex items-center gap-x-3 text-yellow-200 hover:text-yellow-100'>
        Social App
        <Image alt="Page icon" width={30} height={30} src="/favicon.svg"/>
      </Link>
    </span>
  </div>

)

const GuestOptions = () => {
  const [pageLoad,setPageLoad]=useState(false);
  const {user}=useContext(appContext)


  return(
  <div 
  className="w-full bg-neutral-800 
  flex justify-between gap-2 
  py-2 px-2 border-t border-zinc-400
  ">


    <div>
      <HeaderButton>
        <Time/>
      </HeaderButton>
    </div>

    {/* If not Signed In show the following else show "Profile Button" */}
    {!user&&
    <div className="animate-appearance">

        <Link href="/login">
        <HeaderButton>
          Log in
        </HeaderButton>
      </Link>
      


    </div>
      }

{user&&
    <div className="animate-appearance">

        <Link href="/user">
        <HeaderButton>
          Profile
        </HeaderButton>
      </Link>

    </div>
      }
    
    {/*  */}

  </div>
)}

const HeaderButton = (props:{children:ReactNode}) => (
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