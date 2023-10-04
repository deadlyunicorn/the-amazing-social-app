import { MultipleRowsWrapper } from "@/app/lib/components/FormWrapper"
import { supabaseCredentials } from "@/app/(supabase)/global"
import {  createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { UserInfoComponent } from "./UserInfo/UserInfoComponent"
import { ProfileCreationForm } from "./CreateProfile/ProfileCreationForm"
import { ErrorSection } from "@/app/lib/components/ErrorSection"
import { withRetry } from "@/app/lib/retry"
import { getUserInfo } from "@/app/api/mongodb/user"

export const generateMetadata = ({params}:{params:{id:string}}) =>  {

  return {
    title:params.id
  }
}

const UserProfile = async (
  {params,searchParams}
  :{
    params:{
      id:string
    },
    searchParams:{
      error?:string;
    }
  }
) => {


  const supabase = createServerComponentClient({cookies},supabaseCredentials);
  
  

  const supabaseUser = (await supabase.auth.getUser()).data.user;

  // params.id
  //@ts-ignore
  const profileInfo = await withRetry(getUserInfo,5,[{username:String(params.id)}]).catch(err=>null)
    .then(async(res)=>{
      if (!res){
          // @ts-ignore
        return await withRetry(getUserInfo,5,[{_id:String(params.id)}]).catch(err=>null);
      }
      return res
  });


  const ownsProfile = supabaseUser && ( supabaseUser?.email == profileInfo?.email ) || ( supabaseUser?.id == params.id );

  return (
    <MultipleRowsWrapper>

      {searchParams.error&&

        <ErrorSection 
          path={`/user/${params.id}`}>
            
            {searchParams.error}
          
        </ErrorSection>
        
      }
      {
        profileInfo?

          <>
          <UserInfoComponent 
            ownsProfile={ownsProfile}
            userInfo={profileInfo}/>
          </>
            
        : ownsProfile?
          
          <section className="text-center">


            You have successfully registered your account.
            <br/>Now you can choose a username to start socializing!
            <br/>(no pun intended)


            <ProfileCreationForm email={String(supabaseUser)}/>

          </section>

            


          :
            <section>
              The user you are looking for doesn&apos;t exist.
            </section>
        }

       
        </MultipleRowsWrapper>

  )
}





export default UserProfile;