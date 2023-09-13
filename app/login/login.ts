"use server"

import { SupabaseClient, createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { supabaseCredentials } from "../(supabase)/global";
import { redirect } from "next/navigation";


export const guestLogin = async()=>{
  const supabase = createServerActionClient({cookies},supabaseCredentials);

  const email = 'anonymous@no.email';
  const password = "123123123";

  await serverActionLogin(supabase,email,password);
}

export const emailLogin = async(formData:FormData)=>{

  const email = String(formData.get('email'));
  const password = String(formData.get('password'));

  const supabase = createServerActionClient(
    {cookies},supabaseCredentials
  )

  await serverActionLogin(supabase,email,password);

}



const serverActionLogin = async(
  supabaseClient:SupabaseClient<any, "public", any>,
  email:string,
  password:string
  
  ) => {
  
  
  const supabase = supabaseClient;
  
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
      if (err=='Invalid login credentials'){
        err += ' (account might not exist)'
      }
     redirect(`/login/email?error=${err}`)
    }
  );
  redirect('/')
}
