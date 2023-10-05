import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const LogOutForm = async() => (
  <form
        action={
          async()=>{
            "use server"
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

            await fetch(`${process.env.SERVER_URL}/api/auth/signout`,{
              method:"POST",
              headers:[
                ["cookie",cookieHeader],
                ["authorization", authHeader]
              ],
              body: JSON.stringify({
                csrfToken: csrfToken
              })
            })
            .then( async(res)=> {
              if ( res.ok ) {
                // const result = await res.json();
                // console.log(result)
                revalidatePath('/');
                redirect('/explore')
              }
            })
          }}>
        <button className="text-link">Logout</button>
  </form>
)