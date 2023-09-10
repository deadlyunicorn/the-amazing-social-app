import "@/app/(styles)/styles.css"
import { emailLogin } from "../login"

const LoginForm = (
  {searchParams}:{
  searchParams:{
    error? : string
  }
}) =>{


  return(
    <div className="flex flex-col w-full gap-y-8 items-center max-w-md">
    <section className=" bg-gray-900">

      

      <h3 className="
      
        text-white 
        text-center underline">Login today!</h3>
      <form 
        action={emailLogin}
        className="flex flex-col gap-2 px-3 py-2">
          
          <input
            name="email"
            className="py-1 px-2"
            placeholder="Email" type={"email"} minLength={10} required/>
          
          <input
            name="password"
            className="py-1 px-2"
            placeholder="Password" type={"password"} minLength={6} required/>

          <button 
            className="border bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded-md">
            Submit
          </button>

        </form>

        
      </section>

      {searchParams.error && 
        <section
          className="text-error-light text-center">
            {searchParams.error}
        </section>}
      </div>
  )
}

export default LoginForm;




