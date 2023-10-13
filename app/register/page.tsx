import { headers } from "next/headers";
import { CredentialsForm } from "../lib/components/CredentialsForm";
import { ErrorSection } from "../lib/components/ErrorSection";
import { MultipleRowsWrapper, SimpleMultipleRowsWrapper } from "../lib/components/FormWrapper";
import { getAuthSession } from "../api/mongodb/user/user";
import { redirect } from "next/navigation";
import { OAuthOptions } from "../login/OauthComponent";

const RegisterPage = async ({ searchParams }: { searchParams: { error: string } }) => {

  const authSession = await getAuthSession();
  if ( authSession ) {
    redirect(`/account/settings`);

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

  return (

    
      <SimpleMultipleRowsWrapper>

          {searchParams.error &&

          <ErrorSection path="/register">
            {searchParams.error}
          </ErrorSection>
          }

          <MultipleRowsWrapper>
         
          <CredentialsForm
            action="register"
            csrfToken={csrfToken} />

          <OAuthOptions 
            //not needed for /register rn
            //could be used in the future
            //to log the user in instantly
            csrfToken={csrfToken}/>

        </MultipleRowsWrapper>


        
      </SimpleMultipleRowsWrapper>



  )
}



export default RegisterPage;