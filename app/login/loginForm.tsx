import Link from "next/link";
import { CredentialsForm } from "../lib/components/CredentialsForm";
import { emailLogin } from "./loginAction";
import { LogOutForm } from "../account/settings/LogoutForm";
import { getUserDetails } from "../api/mongodb/user/user";

export const LoginForm = async () => {

  const user = await getUserDetails();
  
  return (
    user ?

    <section className="flex flex-col justify-between items-center"> 
        <h2>Hello there!</h2>
        <p>You are logged in with {user.email}.</p>
        <LogOutForm/>
    </section>
    
    : <>
      <CredentialsForm
        formHeader="Login today!"
        // action={emailLogin}
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