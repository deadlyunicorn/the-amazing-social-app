import "@/app/styles/styles.css"
import { ErrorSection } from "@/app/lib/components/ErrorSection"
import { MultipleRowsWrapper } from "@/app/lib/components/FormWrapper"
import { redirect } from "next/navigation"
import { CredentialsForm } from "../lib/components/CredentialsForm"
import { getAuthSession } from "../api/mongodb/user/user"
import Link from "next/link"
import { SignUpAside } from "./SignUpPromptComponent"

const LoginPage = async(
  { searchParams }: {
    searchParams: {
      error?: string
    }
  }) => {

  const authSession = await getAuthSession();
  if ( authSession ) {
    redirect(`/account/settings`);
  }

  return (
    <MultipleRowsWrapper>


      <CredentialsForm action="login"/>
      <section className="text-center flex flex-col justify-between">
          <Link 
            tabIndex={0} href="/account/recover">
            I forgot my password :&#40;
          </Link>
        <SignUpAside />
      </section>
      
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




















