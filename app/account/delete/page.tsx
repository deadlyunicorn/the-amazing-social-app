import { ErrorSection } from "@/app/lib/components/ErrorSection";
import { MultipleRowsWrapper } from "@/app/lib/components/FormWrapper";
import { SubmitButtonClient } from "@/app/lib/components/SubmitButtonClient";
import { redirect } from "next/navigation";
import { deleteAccountAction } from "./deleteAction";
import { getAuthSession } from "@/app/api/mongodb/user/user";
import { headers } from "next/headers";

const DeleteAccountSection = async({searchParams}:{searchParams:{error:string}}) => {
  

  const user = await getAuthSession();
  const email = user?.email;
  const username =  user?.name;

  if ( email || username ) {

    const headerList = headers();
    const cookieHeader = String( headerList.get('cookie') );
    const authHeader =   String( headerList.get('authorization') );
  
    const csrfToken = await fetch(`${process.env.SERVER_URL}/api/auth/csrf`,{
      headers:[
        ["cookie",cookieHeader],
        ["authorization", authHeader]
      ],
    })
    .then( async( res ) => await res.json() )
    .then( csrfTokenObject => csrfTokenObject?.csrfToken );
      
    return(

     <MultipleRowsWrapper>
    
      <section>
        <h1>Account deletion</h1>
        <h3
          className="my-4 text-center">You are about to delete your account 
          <br/>with the {email? "email" :"username"}: <span className="underline">{ email? email :username }</span>
        </h3>
        <form 
          action={deleteAccountAction}
          className="flex flex-col gap-y-4 items-center">
          <p >Enter your {email? "email" :"username"} to confirm deletion</p>
          <input 
            placeholder={`Your ${email? "email" :"username"}`}
            title={`Please enter your ${`${email? "email" :"username"}`}.`}
            required
            pattern={email? email :username||undefined}
            type={email? "email": "text"}/>
          <input 
            name="csrfToken"
            value={csrfToken}
            hidden
            readOnly
          />
          <SubmitButtonClient/>

        </form>

        
      </section>

      {searchParams.error && 
        <ErrorSection path="/account/delete">{searchParams.error}</ErrorSection>
      }

    </MultipleRowsWrapper>

    )
  }
  else {
    redirect('/');
  }
}



export default DeleteAccountSection