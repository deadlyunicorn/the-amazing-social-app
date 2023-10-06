import { registerAction } from "@/app/api/auth/credentials/register/registerAction";
import { SubmitButtonClient } from "./SubmitButtonClient";

export const CredentialsForm = async ( { action, csrfToken } : { action: string, csrfToken: string } ) => {

  const loginForm = action == "login";

  
  return (

      <section className=" bg-stone-800 max-w-md flex flex-col gap-y-2">
        <h1 className="text-white">Credentials</h1>
        <h3 className="
        text-white 
        text-center underline">
          {loginForm 
            ? "Login Today!"
            : "Register Today!"
          }
          
        </h3>
        <p className="text-xs text-white text-center">
            With a username and password no&nbsp;emails _ ensure privacy
        </p>

        <form
          method="POST"
          action={loginForm
            ?`/api/auth/callback/credentials`
            :registerAction}
          className="flex flex-col gap-2 px-3 py-2">

          <input
            name="username"
            className="py-1 px-2"
            placeholder="Username" type={"text"} minLength={6} maxLength={24} required />

          <input
            name="password"
            className="py-1 px-2"
            placeholder="Password" type={"password"} minLength={6} maxLength={24} required />

          {!loginForm &&
          <div className="flex gap-x-2 items-center place-self-center">
            <label 
              className="text-white"
              htmlFor="age">
              Age:
            </label>
            <input
              id="age"
              name="age"
              type="number"
              className="py-1 px-2 w-16"
              placeholder="18+" min={18} max={110} required />
          </div>
          }

          <input
            name="csrfToken"
            hidden
            readOnly
            value={csrfToken}/>
    
          <SubmitButtonClient/>

        </form>

      </section>
  )
}
