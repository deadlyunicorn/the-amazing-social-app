import { ErrorSection } from "@/app/lib/components/ErrorSection";
import { MultipleRowsWrapper } from "@/app/lib/components/FormWrapper";
import { redirect } from "next/navigation";
import { changeUsername } from "./usernameAction";
import { SubmitButtonClient } from "@/app/lib/components/SubmitButtonClient";
import { getUserDetails } from "@/app/api/mongodb/user/user";

const ChangeUsernamePage = async({searchParams}:{searchParams:{error:string}}) => {

  const user = await getUserDetails();
  if ( !user ){
    redirect('/user');
  }
  

  return (
  <MultipleRowsWrapper>
  <section>
    <h3 className="text-center">Your current username is: 
      <br/>{user.username}
    </h3>
    
    <form
      className="flex flex-col items-center gap-y-2 my-2"
      action={changeUsername}>
      
      <label
        htmlFor="username">
          Enter your new username:
      </label>
      <input
        pattern="/^[A-Za-z]([A-Za-z0-9\_])\w+/g"
        required
        id="username"
        placeholder="New username" 
        aria-label="insert your new username"
        name="username" 
        minLength={6} maxLength={30}
        />
        <p className="text-xs text-center">
          letters, numbers and dashes allowed
          <br/>must start with letter
        </p>

      <SubmitButtonClient/>
    </form>
    
  </section>

  {searchParams.error &&
  <ErrorSection path="/account/username">
    {searchParams.error}
  </ErrorSection>
  }
  </MultipleRowsWrapper>
  )

}


export default ChangeUsernamePage;