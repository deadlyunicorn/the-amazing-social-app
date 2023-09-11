import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { supabaseCredentials } from "../(supabase)/global";
import { cookies } from "next/headers";
import { EmailPasswordForm } from "../(components)/EmailPasswordForm";
import { emailRegister } from "./register";
import { ErrorSection } from "../(components)/ErrorSection";
import { MultipleRowsWrapper } from "../(components)/FormWrapper";
import { LogOutForm } from "../(components)/LogoutForm";

const RegisterPage = async ({ searchParams }: { searchParams: { error: string } }) => {

  const supabase = createServerComponentClient({ cookies }, supabaseCredentials);
  const user = (await supabase.auth.getUser()).data.user

  return (




    user

      ? <section className="flex flex-col items-center">
        <p>You already have an account!</p>
        <LogOutForm />
        <span>&nbsp;to signup for a new account.</span>
      </section>

      :
      <MultipleRowsWrapper>
         
          <EmailPasswordForm
            formHeader="Signup today!"
            action={emailRegister} />


        {searchParams.error &&

          <ErrorSection>
            {searchParams.error}
          </ErrorSection>
        }
      </MultipleRowsWrapper>



  )
}



export default RegisterPage;