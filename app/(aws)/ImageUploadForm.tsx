import { ImageInput } from "./ImageInput";
import { handleImageForm } from "./imageUploadServer";

export const ChangeProfilePicture = ({ username }: { username: string }) => {

  return (

    <form
      className="flex flex-col items-center"
      action={async (formData) => {
        "use server"
        //if you pass the username via formdata, anyone could change anyone's image.. 
        await handleImageForm(formData, username)
      }}>



      <label
        htmlFor="imgFile"
        className="
            text-link hover:underline
              cursor-pointer">
        Change avatar
      </label>
      <ImageInput />

    </form>

  )
}

