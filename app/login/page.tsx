import "@/app/styles/styles.css"
import { ErrorSection } from "@/app/lib/components/ErrorSection"
import { MultipleRowsWrapper } from "@/app/lib/components/FormWrapper"
import { redirect } from "next/navigation"
import { LoginForm } from "./loginForm"
import { getAuthSession } from "../api/mongodb/user/user"

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

      <LoginForm/>
      
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




















