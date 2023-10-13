import { ErrorSection } from "@/app/lib/components/ErrorSection";
import { SubmitButtonClient } from "@/app/lib/components/SubmitButtonClient";
import { MessageTextarea } from "./MessageTextarea";
import { RecoveryAction } from "./recoveryAction";
import { SimpleMultipleRowsWrapper } from "@/app/lib/components/FormWrapper";

const AccountRestore = ({searchParams}:{searchParams:{error:string}}) =>{


  return (

    <SimpleMultipleRowsWrapper>

      <section className="flex flex-col items-center">
        <h1 className="text-center">Account Recovery</h1>
        <form 
          action={RecoveryAction}
          className="my-2 flex flex-col max-w-md items-center w-full gap-y-2">

          <label htmlFor="message">What is your issue? Which is your username?</label>
          <MessageTextarea/>
          <label htmlFor="contact">Where can we contact you?</label>
          <input
            id="contact"
            placeholder="your@email.com"
            className="bg-slate-200" 
            name="contact" minLength={6} type="email"/>
          <SubmitButtonClient/>
          
        </form>
      </section>
      {searchParams.error &&
        <ErrorSection path="/account/recovery">
          {searchParams.error}
        </ErrorSection>
      }

      </SimpleMultipleRowsWrapper>
  )
}

export default AccountRestore;
