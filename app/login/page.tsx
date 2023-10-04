import "@/app/styles/styles.css"
import { ErrorSection } from "@/app/lib/components/ErrorSection"
import { MultipleRowsWrapper } from "@/app/lib/components/FormWrapper"
import { redirect } from "next/navigation"
import { LoginForm } from "./loginForm"
import { getSupabaseSession } from "../api/mongodb/user"

const LoginPage = async(
  { searchParams }: {
    searchParams: {
      error?: string
    }
  }) => {

  const supabaseSession = await getSupabaseSession();
  if ( supabaseSession?.id ) {
    redirect(`/user`);
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




















