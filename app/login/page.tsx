import "@/app/(styles)/styles.css"
import { ErrorSection } from "@/app/(components)/ErrorSection"
import { MultipleRowsWrapper } from "@/app/(components)/FormWrapper"
import { Suspense } from "react"
import { LoginPageSynced } from "./AsyncDetails"
import { LoadingScreen } from "../(components)/Loading/LoadingAnimation"
import { getSupabaseSession } from "../(mongodb)/user"
import { redirect } from "next/navigation"

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

      <Suspense fallback={<LoadingScreen height={200} />}>
        <LoginPageSynced/>
      </Suspense>
      
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




















