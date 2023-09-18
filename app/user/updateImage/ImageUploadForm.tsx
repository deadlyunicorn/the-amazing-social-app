import { ImageInputStandalone } from "./ImageInput";
import { handleAvatarForm } from "./avatarUploadServer";

export const ChangeProfilePicture = ({ username }: { username: string }) => {

  return (

    <form
      className="flex flex-col items-center"
      action={handleAvatarForm}>



      <label
        tabIndex={0}
        htmlFor="imgFile"
        className="
            text-link hover:underline
              cursor-pointer">
        Change avatar
      </label>
      <ImageInputStandalone />

    </form>

  )
}

