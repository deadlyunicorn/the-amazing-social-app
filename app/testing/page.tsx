import { createServerActionClient, createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import {redirect} from "next/navigation"
import { supabaseCredentials } from "../(supabase)/global";

export default async function Home(
  {searchParams}:{
    searchParams:{
      error? : string
    }
  }) {

  const supabase = createServerComponentClient(
    {cookies},
    {supabaseKey:process.env.supabaseKey,
    supabaseUrl:process.env.supabaseUrl}
  )
  
  const session = await supabase.auth.getSession();


  return (
    <section className="flex min-h-screen flex-col items-center justify-between p-24">
      
      {session.data.session?.user.email || " No user "}

        <h1>Login</h1>
        
        <form 
          action={loginForm}>
          <input 
            placeholder='email'
            name='email'/>
          <input 
            type='password'
            placeholder='password'
            name='password'/>
          <button>submit</button>
        </form>

        {searchParams.error && 
        <section
          className="text-error-light">
            {searchParams.error}
        </section>}
        
        
    </section>
  )
}


const loginForm = async(formData:FormData) => {
  "use server"
  
  const email = String(formData.get('email'));
  const password = String(formData.get('password'));

  const supabase = createServerActionClient(
    {cookies},supabaseCredentials
  )

  await supabase.auth.signInWithPassword({
      email: email,
      password: password
  })
  .then(data=>{
    if (data.error){
      throw data.error.message;
    }
  })
  .catch(
    err=>{
      redirect(`/testing?error=${err}`)
    }
  );
  redirect('/')


}
