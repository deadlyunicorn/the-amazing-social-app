import { headers } from "next/headers";

export const LogOutForm = async() => {

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
    
  return (
  <form
        action={`${process.env.SERVER_URL}/api/auth/signout`}
        method="POST">
        <input name="csrfToken" readOnly value={csrfToken} hidden/>
        <button className="text-link">Logout</button>
  </form>
  )
}
