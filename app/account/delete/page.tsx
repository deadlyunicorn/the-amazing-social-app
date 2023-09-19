import { ErrorSection } from "@/app/(components)/ErrorSection";
import { MultipleRowsWrapper } from "@/app/(components)/FormWrapper";
import { SubmitButtonClient } from "@/app/(components)/SubmitButtonClient";
import { supabaseCredentials } from "@/app/(supabase)/global"
import { createServerActionClient, createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export const dynamic = 'force-dynamic'

const DeleteAccountSection = async({searchParams}:{searchParams:{error:string}}) => {
  


  const supabase = createServerComponentClient({cookies},supabaseCredentials);
  const session = await supabase.auth.getSession();
  const email = session.data.session?.user.email;

  if (email) return(

    <MultipleRowsWrapper>
    
      <section>
        <h1>Account deletion</h1>
        <h3
          className="my-4 text-center">You are about to delete your account 
          <br/>with the email: <span className="underline">{email}</span>
        </h3>
        <form 
          action={deleteAccount}
          className="flex flex-col gap-y-4 items-center">
          <p >Enter your email to confirm deletion</p>
          <input 
            placeholder="Your email"
            title="Please enter your email."
            required
            pattern={email}
            type="email"/>
          <SubmitButtonClient/>
        </form>

        
      </section>

      {searchParams.error && 
        <ErrorSection path="/account/delete">{searchParams.error}</ErrorSection>
      }

    </MultipleRowsWrapper>

  )
  else {
    redirect('/');
  }
}

const deleteAccount = async() => {
  "use server"

  const supabase = createServerActionClient({cookies},{supabaseKey:process.env.supabasePrivateKey,supabaseUrl:process.env.supabaseUrl});
  const id = (await supabase.auth.getSession()).data.session?.user.id;

  if (id){

    let success = false;
    try{
      await supabase
      .auth
      .admin
      .deleteUser(id);

      await supabase.auth.signOut()
      .then(res=>{
        if (res.error?.message){
          throw res.error.message; 
        }}
      );
      success =true;

    }
    catch(err){
      redirect(`/account/delete?error=${err}`);
    }
    finally{
      if (success){
       redirect('/account/success')
      }
    }
    
    

    


  }
  else{
    redirect('/');
  }

  

}

export default DeleteAccountSection