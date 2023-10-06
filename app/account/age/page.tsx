import { ErrorSection } from "@/app/lib/components/ErrorSection";
import { MultipleRowsWrapper } from "@/app/lib/components/FormWrapper";
import { redirect } from "next/navigation";
import { SubmitButtonClient } from "@/app/lib/components/SubmitButtonClient";
import { changeAge } from "./ageAction";
import { getUserDetails } from "@/app/api/mongodb/user/user";

const ChangeAgePage = async({searchParams}:{searchParams:{error:string}}) => {

  const user = await getUserDetails();
  if ( !user ){
    redirect('/user');
  }
  
  const currentYear = new Date().getFullYear();

  return (
  <MultipleRowsWrapper>
  <section>
    <h3 className="text-center">Your current birth year is set to: 
      <br/>{user.age}
    </h3>
    
    <form
      className="flex flex-col items-center gap-y-2 my-2"
      action={changeAge}
      >
      
      <label
        htmlFor="age">
          Enter the new birth year:
      </label>
      <input
        required
        id="age"
        placeholder="birth year" 
        aria-label="insert your correct birthyear"
        name="age"
        type="number"
        min={currentYear-110}
        max={currentYear-18}
        />
        
      <SubmitButtonClient/>
    </form>
    
  </section>

  {searchParams.error &&
  <ErrorSection path="/account/age">
    {searchParams.error}
  </ErrorSection>
  }
  </MultipleRowsWrapper>
  )

}


export default ChangeAgePage;