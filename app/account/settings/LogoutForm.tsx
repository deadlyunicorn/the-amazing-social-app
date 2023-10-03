import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { supabaseCredentials } from "@/app/(supabase)/global";

export const LogOutForm = async() => (
  <form
        action={
          async()=>{
            "use server"
            const supabase = createServerActionClient({cookies},supabaseCredentials);
            await supabase.auth.signOut();
          }}>
        <button className="text-link">Logout</button>
  </form>
)