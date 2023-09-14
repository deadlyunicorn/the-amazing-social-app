import { SubmitButtonClient } from "../(components)/SubmitButtonClient";
import { userObject } from "../(mongodb)/user";
import { handleImageForm } from "./imageUploadServer";

export const ChangeProfilePicture = ({username}:{username:string}) => {

  return (

    <form
      action={async(formData)=>{
        "use server"
        await handleImageForm(formData,username)}}>
      <label
        className="
                px-2 py-1
                cursor-pointer"
        id="fileLabel"
        htmlFor="imgFile">

              Change avatar

        </label>

          <input
            className="hidden"
            id="imgFile"
              accept="image/*"
              name="imgFile"
              type="file" />

          <SubmitButtonClient/>
      </form>

    )
}

