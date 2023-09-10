import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import { supabaseCredentials } from "../(supabase)/global";
// import { serverActionLogin } from "./page";
import { guestLogin } from "./login";

export const LoginOptions = (
  ) =>{
    return (
      <>
      <section className="flex justify-center items-center w-full gap-x-3">
          
          <form   
            className="hover:text-blue-400 text-blue-600"
            action={guestLogin}>
            <button>Anon Login</button>
          </form>
          
          <Link tabIndex={0} 
            href="/login/email">
            Email Login
          </Link>
        </section>
      </>
    )
}


  