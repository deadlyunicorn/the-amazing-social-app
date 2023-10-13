import "@/app/styles/styles.css"
import { ErrorSection } from "@/app/lib/components/ErrorSection"
import { MultipleRowsWrapper, SimpleMultipleRowsWrapper } from "@/app/lib/components/FormWrapper"
import { redirect } from "next/navigation"
import { CredentialsForm } from "../lib/components/CredentialsForm"
import { getAuthSession } from "../api/mongodb/user/user"
import Link from "next/link"
import { SignUpAside } from "./SignUpPromptComponent"
import { OAuthOptions } from "./OauthComponent"
import { headers } from "next/headers"
import { cookies } from "next/headers"
import { SetCsrfToken } from "./setCsrfCookie"

const LoginPage = async(
  { searchParams }: {
    searchParams: {
      error?: string,
      callbackUrl?: string
    }
  }) => {

  const authSession = await getAuthSession();
  if ( authSession ) {
    redirect(`/account/settings`);
  }

  const headerList = headers();
  const cookieHeader = String( headerList.get('cookie') );
  const authHeader =   String( headerList.get('authorization') );

  //can't get cookie as it is Http only - secure
  const csrfCookie = cookies().get('next-auth.csrf-token') || cookies().get('auth_consent');

  const csrfToken = await fetch(`${process.env.SERVER_URL}/api/auth/csrf`,{
    headers:[
      ["cookie",cookieHeader],
      ["authorization", authHeader]
    ],
  })
  .then( async( res ) => await res.json() )
  .then( csrfTokenObject => csrfTokenObject?.csrfToken );

  const error = searchParams.error;
  const callbackURL = searchParams.callbackUrl
    

  return (
    <SimpleMultipleRowsWrapper>

      { !csrfCookie && <SetCsrfToken/>}

        {
           error &&

          <ErrorSection path="/login">
            { (()=>{

              switch (error){
                case "EmailSignin":
                  return "Failed sending the verification email. Please try again";
                case "OAuthSignin": 
                  return "Username already taken, \
                  or there is already an account with your email, \
                  but created with a different provider \
                  (e.g. you created you account with Github\
                  and there is an account with the same email\
                  created with Gmail)";
                default: 
                  return error;
              }
            })() 
            }
          </ErrorSection>
        }
        {
          callbackURL && 
            <ErrorSection path="/login">
              There was an error,
              please try again. 
              Maybe there is already an account with your email,
              but created with a different provider 
              (e.g. you created you account with Github
              and there is an account with the same email using Google)
            </ErrorSection>
        }
      <MultipleRowsWrapper>

        <CredentialsForm action="login" csrfToken={csrfToken}/>
        <OAuthOptions csrfToken={csrfToken}/>
      </MultipleRowsWrapper>
      <section className="text-center flex flex-col justify-between">
          <Link 
            tabIndex={0} href="/account/recovery">
            I forgot my password :&#40;
          </Link>
        <SignUpAside />
      </section>
      
        
      </SimpleMultipleRowsWrapper>
  )
}



export default LoginPage;




















