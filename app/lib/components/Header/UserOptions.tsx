import Link from "next/link"
import { ReactNode } from "react"
import Time from "./Header_time"
import "@/app/styles/styles.css"
import { getAuthSession } from "@/app/api/mongodb/user/user"

export const UserOptions = async () => {
 
  const authSession = await getAuthSession();

  return (
    <div
      className="w-full bg-neutral-800 
    bg-opacity-80 backdrop-blur-md

    flex justify-between gap-2 
    py-2 px-2 border-t border-zinc-400
    ">


      <div>
        <HeaderButton>
          <Time/>
        </HeaderButton>
      </div>

      {/* If not Signed In show the following else show "Profile Button" */}
      <div className="animate-appearance">
        {authSession

        ?<Link href="/account/settings">
          <HeaderButton>
            Settings
          </HeaderButton>
        </Link>

        :<Link href="/login">
          <HeaderButton>
              Log in
          </HeaderButton>
        </Link>
        }

      </div>



      {/*  */}

    </div>
  )
}

const HeaderButton = (props: { children: ReactNode }) => (
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
