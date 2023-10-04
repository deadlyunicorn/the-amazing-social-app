import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { withRetry } from "../lib/retry"
import { getUserInfo } from "../api/mongodb/user"

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

  //@ts-ignore
  const userInfo = await withRetry(getUserInfo,5,[{email:String(signedUserEmail)}]).catch(err=>null);


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