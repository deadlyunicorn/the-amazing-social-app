import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const UserRedirect = async() => {
  
  const supabase = createServerComponentClient(
    {cookies},
    {supabaseKey:process.env.supabaseKey,
    supabaseUrl:process.env.supabaseUrl}
  )

  const session = await supabase.auth.getSession();
  const user = session.data.session?.user;

  if (user){
    redirect(`/user/${user.id}`);
  }
  else{
    redirect(`/login`);
  }
}

export default UserRedirect;