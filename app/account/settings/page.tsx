import { redirect } from "next/navigation";
import { LogOutForm } from "./LogoutForm";
import Link from "next/link";
import { getSessionDetails, getSupabaseSession } from "@/app/api/mongodb/user";

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
        
        Account Settings 
        
      </h1>

      <div className="flex flex-col">

        
        <AccountOptions/>
      </div>

    </section>
  )
}

export default SettingsPage;


const AccountOptions = () => (
  <aside className="w-fit">
    <section className="flex flex-col gap-y-2 min-h-fit">
      
      <Link
        tabIndex={0}
        className="capitalize"
        href={'/account/username'}>
          Change username
      </Link>
      <Link
        tabIndex={0}
        className="capitalize"
        href={'/account/age'}>
        Change age
      </Link>
      <LogOutForm/>
      <Link
        tabIndex={0}
        className="capitalize text-error-light-reactive"
        href={'/account/delete'}>
          delete account
      </Link>


    </section>
  </aside>
)

