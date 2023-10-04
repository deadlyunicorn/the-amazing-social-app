import { ErrorSection } from "@/app/(components)/ErrorSection";
import { MultipleRowsWrapper } from "@/app/(components)/FormWrapper";
import { SubmitButtonClient } from "@/app/(components)/SubmitButtonClient";
import { getSessionDetails } from "@/app/(mongodb)/user";
import { redirect } from "next/navigation";
import { deleteAccountAction } from "./deleteAction";

const DeleteAccountSection = async({searchParams}:{searchParams:{error:string}}) => {
  


  const session = await getSessionDetails();
  const email = session?.email;

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