import { MultipleRowsWrapper } from "@/app/lib/components/FormWrapper"
import { UserInfoComponent } from "./UserInfo/UserInfoComponent"
import { ProfileCreationForm } from "./CreateProfile/ProfileCreationForm"
import { ErrorSection } from "@/app/lib/components/ErrorSection"
import { withRetry } from "@/app/lib/retry"
import { getAuthSession, getUserInfo } from "@/app/api/mongodb/user/user"

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


  const authSession = await getAuthSession();

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


  const ownsProfile = authSession && ( authSession.email == profileInfo?.email ) || ( authSession?.id == params.id );

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


            <ProfileCreationForm email={String(authSession)}/>

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