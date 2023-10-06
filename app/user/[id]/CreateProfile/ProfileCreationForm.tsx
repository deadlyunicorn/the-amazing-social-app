import { addUserToMongoDB } from "@/app/api/mongodb/createUserProfile";
import { SubmitButtonClient } from "@/app/lib/components/SubmitButtonClient";

export const ProfileCreationForm = () => (
  <form 
    action={addUserToMongoDB}
    className="my-2 flex flex-col gap-y-2 items-center ">

    <div className="flex gap-x-5">
      <input 
        pattern="^[A-Za-z][A-Za-z0-9\_]"
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
