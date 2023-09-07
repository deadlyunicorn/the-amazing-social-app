'use client'

import Link from "next/link"
import { useContext } from "react"
import { appContext } from "../components/ContextComponent/contextComp"


export const SignUpSection = () => {

  const {user}=useContext(appContext)


  return (!user ? 
    <aside className="flex flex-col items-center mt-4">
          <p>
            Don&apos;t have an account?
          </p>
          <Link href="/register">
              Sign up
          </Link>
    </aside>
    :<></>
    )
}