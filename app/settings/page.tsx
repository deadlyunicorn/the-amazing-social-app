import { redirect } from "next/navigation";
import { getSessionDetails, getSupabaseSession } from "../(mongodb)/user";
import { LogOutForm } from "./LogoutForm";
import Link from "next/link";

const SettingsPage = async()=>{

  const session = await getSessionDetails();
  const supabaseSession = await getSupabaseSession();

  if ( !session?.username ){
    if ( supabaseSession?.id ){
      redirect('/user')
    }
    else{
      redirect('/');
    }
  }

  return (
    <section className="text-center flex flex-col justify-between items-center">

      <h1 
        className="mb-2 border-none underline decoration-1"> 
        
        This is your account&apos;s settings page 
        
      </h1>

      <div className="flex flex-col">

        <p>Change username</p>
        <p>Change age</p>
        <AccountOptions/>
      </div>

    </section>
  )
}

export default SettingsPage;


const AccountOptions = () => (
  <aside className="w-fit">
    <section className="flex flex-col gap-y-2 min-h-fit">
      <LogOutForm/>
      <Link
        tabIndex={0}
        className="capitalize"
        href={'/account/delete'}>delete account</Link>


    </section>
  </aside>
)

