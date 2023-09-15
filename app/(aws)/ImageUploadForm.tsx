import { ImageInput } from "./ImageInput";
import { handleImageForm } from "./imageUploadServer";

export const ChangeProfilePicture = ({ username }: { username: string }) => {

  return (

    <form
      className="flex flex-col items-center"
      action={handleImageForm}>



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

