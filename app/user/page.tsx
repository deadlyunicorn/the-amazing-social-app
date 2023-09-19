import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { getUserInfo } from "../(mongodb)/user"


export const dynamic = 'force-dynamic'

const UserRedirect = async() => {
  
  const supabase = createServerComponentClient(
    {cookies},
    {supabaseKey:process.env.supabaseKey,
    supabaseUrl:process.env.supabaseUrl}
  )

  const session = await supabase.auth.getSession();
  const user = session.data.session?.user;

  const signedUserEmail = user?.email;

  const userInfo = await getUserInfo(({email:String(signedUserEmail)}));


  if (user){
    if (userInfo){
      redirect(`/user/${userInfo.username}`);
    }
    else{
      redirect(`/user/${user.id}`);
    }
  }
  else{
    redirect(`/login`);
  }
}

export default UserRedirect;