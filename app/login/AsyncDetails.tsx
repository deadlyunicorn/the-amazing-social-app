import Link from "next/link";
import { EmailPasswordForm } from "../(components)/EmailPasswordForm";
import { getSessionDetails } from "../(mongodb)/user"
import { emailLogin } from "./login";
import { LogOutForm } from "../settings/LogoutForm";

export const LoginPageSynced = async () => {

  const session = await getSessionDetails();
  
  return (
    session ?

    <section className="flex flex-col justify-between items-center"> 
        <h2>Hello there!</h2>
        <p>You are logged in with {session.email}.</p>
        <LogOutForm/>
    </section>
    
    : <>
      <EmailPasswordForm
        formHeader="Login today!"
        action={emailLogin}
      />

      <section className="text-center flex flex-col justify-between">
          <Link 
            tabIndex={0} href="/account/recover">
            I forgot my password :&#40;
          </Link>
        <SignUpAside />
      </section>
    </>
  )
}

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