import { ErrorSection } from "@/app/lib/components/ErrorSection";
import { MultipleRowsWrapper } from "@/app/lib/components/FormWrapper";
import { SubmitButtonClient } from "@/app/lib/components/SubmitButtonClient";
import { supabaseCredentials } from "@/app/(supabase)/global"
import { createServerActionClient, createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const AccountRestore = async({searchParams}:{searchParams:{error:string}}) => {
  


  const supabase = createServerComponentClient({cookies},supabaseCredentials);
  const session = await supabase.auth.getSession();
  const email = session.data.session?.user.email;

  if (!email) return(

    <MultipleRowsWrapper>
    
      <section>
        <h1>Recover Account Passowrd</h1>
        <form 
          action={recoverAccount}
          className="flex flex-col gap-y-4 items-center mt-4">
          <p >Enter your email and we will send you a recovery link!</p>
          <input 
            name="email"
            placeholder="Your email"
            required
            type="email"/>
          <SubmitButtonClient/>
        </form>

        
      </section>

      {searchParams.error && 
        <ErrorSection path="/account/recover">{searchParams.error}</ErrorSection>
      }

    </MultipleRowsWrapper>

  )
  else {
    redirect('/');
  }
}

const recoverAccount = async(formData:FormData) => {
  "use server"

  const email = String(formData.get('email'));
  const supabase = createServerActionClient({cookies},supabaseCredentials);

  let success = false;

  try{
    await supabase.auth.resetPasswordForEmail(email)
    .then(res=>{

      if (res.error?.message){
        throw res.error.message; 
      }}
    );
    success = true;
  }
  catch(err){
    redirect(`/account/recover?error=${err}`)
  }
  finally{
    if(success){
      redirect('/account/success')
    }
  }

  

}

export default AccountRestore;