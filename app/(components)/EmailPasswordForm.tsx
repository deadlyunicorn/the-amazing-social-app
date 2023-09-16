import { SubmitButtonClient } from "./SubmitButtonClient"

export const EmailPasswordForm = (
  { action, formHeader }: {
    action: (formData: FormData) => Promise<void>,
    formHeader: string
  }) => {

  return (
    <section className=" bg-stone-800 max-w-md">

      <h3 className="
      
        text-white 
        text-center underline">{formHeader}!</h3>

      <form
        action={action}
        className="flex flex-col gap-2 px-3 py-2">

        <input
          name="email"
          className="py-1 px-2"
          placeholder="Email" type={"email"} minLength={10} required />

        <input
          name="password"
          className="py-1 px-2"
          placeholder="Password" type={"password"} minLength={6} required />

          
        <SubmitButtonClient/>

      </form>
    </section>
  )
}