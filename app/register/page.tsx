import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { supabaseCredentials } from "../(supabase)/global";
import { cookies } from "next/headers";
import { EmailPasswordForm } from "../lib/components/EmailPasswordForm";
import { emailRegister } from "./registerAction";
import { ErrorSection } from "../lib/components/ErrorSection";
import { MultipleRowsWrapper } from "../lib/components/FormWrapper";
import { LogOutForm } from "../account/settings/LogoutForm";

const RegisterPage = async ({ searchParams }: { searchParams: { error: string } }) => {

  const supabase = createServerComponentClient({ cookies }, supabaseCredentials);
  const user = (await supabase.auth.getUser()).data.user

  return (

    user

      ? <section className="flex flex-col items-center">
        <p className="flex">
          You already have an account!
        </p>
        <p className="flex">
          <div className="w-fit"><LogOutForm /></div >&nbsp;to signup for a new account.</p> 

      </section>

      :
      <MultipleRowsWrapper>
         
          <EmailPasswordForm
            formHeader="Signup today!"
            action={emailRegister} />


        {searchParams.error &&

          <ErrorSection path="/register">
            {searchParams.error}
          </ErrorSection>
        }
      </MultipleRowsWrapper>



  )
}



export default RegisterPage;