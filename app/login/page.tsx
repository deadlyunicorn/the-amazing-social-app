import "@/app/(styles)/styles.css"
import { ErrorSection } from "@/app/(components)/ErrorSection"
import { MultipleRowsWrapper } from "@/app/(components)/FormWrapper"
import { EmailPasswordForm } from "@/app/(components)/EmailPasswordForm"
import Link from "next/link"
import { emailLogin } from "./login"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { LogOutForm } from "../(components)/LogoutForm"

const LoginPage = async(
  { searchParams }: {
    searchParams: {
      error?: string
    }
  }) => {

    const supabase = createServerComponentClient(
      {cookies},
      {supabaseKey:process.env.supabaseKey,
      supabaseUrl:process.env.supabaseUrl}
    )
    
    const session = (await supabase.auth.getSession()).data.session;
  


  return (
    <MultipleRowsWrapper>

      {session
        ?
        <section> 
          <center>
            <h2>Hello there!</h2>
            <p>You are logged in with {session.user.email}.</p>
            <LogOutForm/>
          </center>
        </section>
        
        : 
        <>
          <EmailPasswordForm
            formHeader="Login today!"
            action={emailLogin}
          />

          <section className="text-center">
              <Link 
                tabIndex={0} href="/account/recover">
                I forgot my password :&#40;
              </Link>
            <SignUpAside />
          </section>
        </>
        
        }
        {
          searchParams.error &&

          <ErrorSection path="/login">
            {searchParams.error}
          </ErrorSection>
        }
      </MultipleRowsWrapper>
  )
}



export default LoginPage;






const SignUpAside = () => {

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













