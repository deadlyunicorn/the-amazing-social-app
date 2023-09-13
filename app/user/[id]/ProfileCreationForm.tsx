import { SubmitButtonClient } from "@/app/(components)/SubmitButtonClient";
import { addUserToMongoDB } from "@/app/register/register";

export const ProfileCreationForm = ({email}:{email:string}) => (
  <form 
    action={addUserToMongoDB}
    className="my-2 flex flex-col gap-y-2 items-center ">

    <div className="flex gap-x-5">
      <input 
        readOnly
        name="email"
        value={email}
        className="hidden"/>
      <input 
        className="w-40 "
        required
        placeholder="username" name="username" minLength={6} maxLength={30}/>
      <input
        className="w-14"
        required type="number"
        placeholder="age" name="age" max={85} min={18}/>

    </div>

    <SubmitButtonClient/>

  </form>
  
)
