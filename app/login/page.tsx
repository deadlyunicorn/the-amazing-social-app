import "@/app/(styles)/styles.css"
import { ErrorSection } from "@/app/(components)/ErrorSection"
import { MultipleRowsWrapper } from "@/app/(components)/FormWrapper"
import { Suspense } from "react"
import { LoginPageSynced } from "./AsyncDetails"
import { LoadingScreen } from "../(components)/Loading/LoadingAnimation"

const LoginPage = (
  { searchParams }: {
    searchParams: {
      error?: string
    }
  }) => {



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




















