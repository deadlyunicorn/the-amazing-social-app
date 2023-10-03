import { ErrorSection } from "@/app/(components)/ErrorSection";
import { MultipleRowsWrapper } from "@/app/(components)/FormWrapper";
import { SubmitButtonClient } from "@/app/(components)/SubmitButtonClient";
import { supabaseCredentials } from "@/app/(supabase)/global"
import { createServerActionClient, createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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

          This action should find all comments,chats, posts
          and delete them. 
          Maybe replace comments with an id of 000000000000
          and have the username of that id as "User Deleted"
          and replace the textContent of the comments as 'comment unaivailable'.
          Also delete the images. Keep other comments etc. If a post 
          is by a deleted user we could disable further comments 
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