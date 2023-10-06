import { SubmitButtonClient } from "../lib/components/SubmitButtonClient"

export const OAuthOptions = async( {csrfToken} : {csrfToken: string }) => {

  return (
    <section
      className=" bg-stone-800 max-w-md text-white 
        gap-y-2
        flex flex-col">

      <h1>OAuth Options</h1>
      <ul className="
        h-full
        flex flex-col gap-y-2 my-2
        items-center justify-between">
        <li>
          <form
            method="POST"
            action={`${process.env.SERVER_URL}/api/auth/signin/google`}>
            <input name="csrfToken" 
                hidden  readOnly required value={csrfToken}/>
            <button>Gmail</button>
          </form>
        </li>
        <li>
          <form
            method="POST"
            action={`${process.env.SERVER_URL}/api/auth/signin/github`}>
            <input name="csrfToken" 
                hidden  readOnly required value={csrfToken}/>
            <button>Github</button>
          </form>
        </li>
        <li className="
          rounded-md px-2 py-1 gap-y-2
          flex flex-col items-center">
          <h3><label htmlFor="email">Magic Link</label></h3>
          <form className="text-stone-800 flex flex-col gap-y-2">
            <input
              placeholder="your@email.com" 
              name="email" type="email" id="email"/>
            <input name="csrfToken" 
              hidden  readOnly required value={csrfToken}/>
            <SubmitButtonClient/>
            
          </form>
        </li>
      </ul>
    </section>
  )
}