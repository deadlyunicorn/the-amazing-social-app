import { cookies } from "next/headers";
import { supabaseCredentials } from "../(supabase)/global";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";

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