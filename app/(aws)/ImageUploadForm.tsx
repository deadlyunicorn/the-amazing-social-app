import { SubmitButtonClient } from "../(components)/SubmitButtonClient";
import { userObject } from "../(mongodb)/user";
import { handleImageForm } from "./imageUploadServer";

export const ChangeProfilePicture = ({username}:{username:string}) => {

  return (

    <form
      className="flex flex-col items-center"
      action={async(formData)=>{
        "use server"
        await handleImageForm(formData,username)}}>


      <label
        htmlFor="imgFile"
        className="
        text-link hover:underline
          cursor-pointer">
          Change avatar
      </label>

          <input
            required
            className="hidden"
            id="imgFile"
              accept="image/*"
              name="imgFile"
              type="file" />

          <SubmitButtonClient/>
      </form>

    )
}

