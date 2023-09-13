import { MultipleRowsWrapper } from "@/app/(components)/FormWrapper"
import { LogOutForm } from "@/app/(components)/LogoutForm"
import { getUserInfo } from "@/app/(mongodb)/user"
import { supabaseCredentials } from "@/app/(supabase)/global"
import {  createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import Link from "next/link"
import { UserInfoComponent } from "./UserInfoComponent"
import { ProfileCreationForm } from "./ProfileCreationForm"

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



  return (
    <MultipleRowsWrapper>
      {
      userInfo 
      ? 
        <>
        <UserInfoComponent userInfo={userInfo}/>
          {
            (userInfo.email == signedUserEmail) 
            && <AccountOptions/>
          }
        </>
          
      : params.id == signedUserId
        
        ?<>
          <section className="text-center">

          You have successfully registered your account.
          <br/>Now you can choose a username to start socializing!
          <br/>(no pun intended)


          <ProfileCreationForm email={String(signedUserEmail)}/>

          </section>
          <AccountOptions/>
        </>
          


        :<section>
          the user you are looking for doesn&apos;t exist
        </section>
        }
        </MultipleRowsWrapper>

  )
}



const AccountOptions = () => (
  <aside className="w-fit self-center">
    <section className="flex flex-col gap-y-2 items-center">
      <LogOutForm/>
      <Link
        className="capitalize"
        href={'/account/delete'}>delete account</Link>


    </section>
  </aside>
)




export default UserProfile;