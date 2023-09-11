import { LogOutForm } from "@/app/(components)/LogoutForm"
import { getUserInfo, userObject } from "@/app/(mongodb)/user"
import { supabaseCredentials } from "@/app/(supabase)/global"
import {  createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

const UserProfile = async (
  {params}
  :{
    params:{
      id:string
    }
  }
) => {


  const supabase = createServerComponentClient({cookies},supabaseCredentials);
  
  
  let signedUserEmail;
  let signedUserId;


  await supabase.auth.getUser()
    .then(({data})=>{
        signedUserEmail = data.user?.email;
        signedUserId = data.user?.id;
  })
  // params.id
  const userInfo = await getUserInfo(String(signedUserEmail));

  //username:user id until changed.


  return (
      userInfo 
      ? <div className="w-full flex flex-col gap-y-10">
        <UserInfoComponent userInfo={userInfo}/>
        {(userInfo.email == signedUserEmail) && <LogOutSection/>}
        </div>
      : params.id == signedUserId
        
        ?<section>

        You have successfully registered your account.
        <br/>Now you can choose a username to start socializing!
        <br/>(no pun intended)"hehe"
        </section>

        :<section>
          the user you are looking for doesn't exist
        </section>
  )
}


const UserInfoComponent = ({userInfo}:{userInfo:userObject}) => {
  

  return (
    <section>
      {userInfo?.username}

    </section>
    
  )

}

const LogOutSection = () => (
  <aside className="w-fit self-center">
    <section>
      <LogOutForm/>
    </section>
  </aside>
)


export default UserProfile;