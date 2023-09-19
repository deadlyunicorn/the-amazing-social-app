import { SubmitButtonClient } from "../(components)/SubmitButtonClient";
import { ImageInputOptional } from "../user/updateImage/ImageInput";
import { ResetOnSubmit } from "./ResetOnSubmit";
import { handleCreatePost } from "./createPost";

export const CreatePostSection = () => {

  const formId = 'postForm';

  return (
    <section>
      <h2>Create a post!</h2>
      {/* add images as well !? */}

      <form
        id={formId}
        action={handleCreatePost}
        className="
        my-2
        flex flex-col 
        items-center gap-y-4">

        <label
          className="text-link hover:cursor-pointer"
          htmlFor="image">Add image</label>
        <ImageInputOptional pixels={200} />


        <ResetOnSubmit formId={formId} />

        <textarea
          required
          minLength={6}
          maxLength={200}
          placeholder="Today on my way to work.."
          className="
          px-2 py-1 rounded-sm
          bg-white bg-opacity-30
          w-full h-36 resize-none"
          name="post" />



        <SubmitButtonClient />
      </form>


    </section>
  )
}