import Link from "next/link"
import { LoginOptions } from "./Options"
import { SupabaseClient, createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const LoginPage = async() => {
  
  const supabase = createServerComponentClient(
    {cookies},
    {supabaseKey:process.env.supabaseKey,
    supabaseUrl:process.env.supabaseUrl}
  )
  
  const session = (await supabase.auth.getSession()).data.session;

  return (
    <>

      <section>

        {session
        ? <center>
            <h2>Hello there</h2>
            <p>You are already logged in with {session.user.email}</p>
            Logout button'''' ' " "
          </center>
        : <>
            <LoginOptions/>
            <SignUpSection/>
          </>
        }
        
        
      </section>
    </>
  )
}

const SignUpSection = () => {

    return (
      <aside className="flex flex-col items-center mt-4">
            <p>
              Don&apos;t have an account?
            </p>
            <Link tabIndex={0} href="/register">
                Sign up
            </Link>
      </aside>
      )
}



export default LoginPage;










