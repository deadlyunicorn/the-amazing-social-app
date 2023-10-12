import { MultipleRowsWrapper } from "@/app/lib/components/FormWrapper";
import { CustomSubmitButtonClient } from "@/app/lib/components/SubmitButtonClient"
import { cookies, headers } from "next/headers";
import { SetCsrfToken } from "../../setCsrfCookie";
import { redirect } from "next/navigation";

const MagicLinkLoginPage = async( 
    { searchParams }: {
      searchParams:{
        email: string,
        tokenValue: string
      }
    } ) => {

      if ( !searchParams.email || !searchParams.tokenValue ){
        redirect('/login?error=Invalid token');
      }

      const headerList = headers();
      const cookieHeader = String( headerList.get('cookie') );
      const authHeader =   String( headerList.get('authorization') );
    
      const csrfToken = await fetch(`${process.env.SERVER_URL}/api/auth/csrf`,{
        headers:[
          ["cookie",cookieHeader],
          ["authorization", authHeader]
        ],
      })
      .then( async( res ) => await res.json() )
      .then( csrfTokenObject => csrfTokenObject?.csrfToken );

  
      
    const csrfCookie = cookies().get('next-auth.csrf-token') || cookies().get('auth_consent');


  return (
    <MultipleRowsWrapper>
      { !csrfCookie && <SetCsrfToken/>}

      <section className="flex flex-col justify-between">
        <h3 className="text-center">
          You are about to login with the email:
          <br/> {searchParams.email}
        </h3>
        <form 
          method="POST"
          action={`/api/auth/callback/credentials`}
          className="flex flex-col">
            <input 
              value={searchParams.email}
              readOnly
              hidden
              name="username"/>
            <input 
              value={searchParams.tokenValue}
              readOnly
              hidden
              name="password"/>
            <input
              value={csrfToken}
              readOnly
              hidden
              name="csrfToken"/>

          
          <div className="self-center">
            <CustomSubmitButtonClient>Procceed</CustomSubmitButtonClient>
          </div>
        </form>
      </section>
    </MultipleRowsWrapper>

  )
}

export default MagicLinkLoginPage;