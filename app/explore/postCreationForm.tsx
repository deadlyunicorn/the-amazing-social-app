import Link from "next/link";
import { SubmitButtonClient } from "../(components)/SubmitButtonClient";
import { getUserDetails } from "../(mongodb)/user";
import { ImageInputOptional } from "../user/updateImage/ImageInput";
import { ResetOnSubmit } from "./ResetOnSubmit";
import { handleCreatePost } from "./createPost";


export const CreatePostSection = async () => {

  const userDetails = await getUserDetails();

  return (
    <section>
      <h2>Create a post!</h2>
      {/* add images as well !? */}

      {userDetails 
        ?<PostCreationForm/>
        :<LoginPrompt/>
      }



    </section>
  )
}

const PostCreationForm = () => {

  const formId = 'postForm';

  return (<form
    id={formId}
    action={handleCreatePost}
    className="
        my-2
        flex flex-col 
        items-center gap-y-4">

    <label  
      tabIndex={0}
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
  )
}

const LoginPrompt = () => {


  return (
    <div className="
      flex items-center justify-center
      w-full">
      <p><Link 
        tabIndex={0}
        href="/user">Set up your account</Link> to start posting!</p>
    </div>
  )
}