import { ErrorSection } from "@/app/lib/components/ErrorSection";
import { MultipleRowsWrapper } from "@/app/lib/components/FormWrapper";
import { SubmitButtonClient } from "@/app/lib/components/SubmitButtonClient";
import { redirect } from "next/navigation";
import { deleteAccountAction } from "./deleteAction";
import { getUserDetails } from "@/app/api/mongodb/user/user";

const DeleteAccountSection = async({searchParams}:{searchParams:{error:string}}) => {
  


  const user = await getUserDetails();
  const email = user?.email;

  if (email) return(

    <MultipleRowsWrapper>
    
      <section>
        <h1>Account deletion</h1>
        <h3
          className="my-4 text-center">You are about to delete your account 
          <br/>with the email: <span className="underline">{email}</span>
        </h3>
        <form 
          action={deleteAccountAction}
          className="flex flex-col gap-y-4 items-center">
          <p >Enter your email to confirm deletion</p>
          <input 
            placeholder="Your email"
            title="Please enter your email."
            required
            pattern={email}
            type="email"/>
          <SubmitButtonClient/>

        </form>

        
      </section>

      {searchParams.error && 
        <ErrorSection path="/account/delete">{searchParams.error}</ErrorSection>
      }

    </MultipleRowsWrapper>

  )
  else {
    redirect('/');
  }
}



export default DeleteAccountSection