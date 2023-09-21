import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { getUserInfo } from "../(mongodb)/user"

const UserRedirect = async({searchParams}:{searchParams:{error?:string}}) => {
  
  const supabase = createServerComponentClient(
    {cookies},
    {supabaseKey:process.env.supabaseKey,
    supabaseUrl:process.env.supabaseUrl}
  )

  const error = searchParams.error;

  const session = await supabase.auth.getSession();
  const user = session.data.session?.user;

  const signedUserEmail = user?.email;

  const userInfo = await getUserInfo(({email:String(signedUserEmail)}));


  if (user){
    if (userInfo){
      if (error){
        redirect(`/user/${userInfo.username}?error=${error}`);
      }

      redirect(`/user/${userInfo.username}`);
    }
    else{
      if (error){
        redirect(`/user/${user.id}?error=${error}`);
      }
      redirect(`/user/${user.id}`);
    }
  }
  else{
    redirect(`/login`);
  }
}

export default UserRedirect;