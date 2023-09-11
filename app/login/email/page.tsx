import "@/app/(styles)/styles.css"
import { emailLogin } from "../login"
import { SignUpAside } from "../page"
import { ErrorSection } from "@/app/(components)/ErrorSection"
import { MultipleRowsWrapper } from "@/app/(components)/FormWrapper"
import { EmailPasswordForm } from "@/app/(components)/EmailPasswordForm"

const LoginForm = (
  { searchParams }: {
    searchParams: {
      error?: string
    }
  }) => {


  return (

    <MultipleRowsWrapper>

     
        <EmailPasswordForm
          formHeader="Login today!"
          action={emailLogin}
        />

      <section>
        <SignUpAside />
      </section>

      {searchParams.error &&

        <ErrorSection>
          {searchParams.error}
        </ErrorSection>
      }
    </MultipleRowsWrapper>
  )
}



export default LoginForm;




