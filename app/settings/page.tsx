import { redirect } from "next/navigation";
import { getSessionDetails } from "../(mongodb)/user";
import { LogOutForm } from "./LogoutForm";
import Link from "next/link";

const SettingsPage = async()=>{

  const session = await getSessionDetails();

  if ( !session?.username ){
    redirect('/');
  }

  return (
    <section className="text-center flex flex-col">

      <h1 
        className="mb-2 border-none underline decoration-1"> 
        
        This is your account&apos;s settings page 
        
      </h1>

      
      <p>Change username</p>
      <p>Change age</p>
      <AccountOptions/>

    </section>
  )
}

export default SettingsPage;


const AccountOptions = () => (
  <aside className="w-fit self-center">
    <section className="flex flex-col gap-y-2 items-center">
      <LogOutForm/>
      <Link
        tabIndex={0}
        className="capitalize"
        href={'/account/delete'}>delete account</Link>


    </section>
  </aside>
)

