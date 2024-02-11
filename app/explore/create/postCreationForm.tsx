'use client'

import Link from "next/link";
import { SubmitButtonClient } from "../../lib/components/SubmitButtonClient";
import { ImageInputOptional } from "../../lib/components/ImageInput";
import { ResetOnSubmit } from "./ResetOnSubmit";
import { handleCreatePost } from "./api/createPostAction";
import { userDetailsClient } from "../page";
import { useState } from "react";


export const CreatePostSection = ({userDetails}:{userDetails:userDetailsClient|null}) => {


  return (
    <div className="w-full lg:h-full relative lg:flex">
    <section className="flex flex-col justify-between lg:sticky lg:w-full lg:top-[15vh]">
      <h2>Create a post!</h2>
      {/* add images as well !? */}

      {userDetails 
        ?<PostCreationForm/>
        :<LoginPrompt/>
      }

      { /*
      <aside tabIndex={0} className="text-center">

        <p>(Your post needs to be verified by the developer in order to be visible)</p>
        <p>You can check the functionality however 
          <Link 
            tabIndex={0} 
            href={'https://the-amazing-social-6msv74gbb-deadlyunicorn.vercel.app/explore'}>
              
            in some of the past dev deployments.
          </Link>
        </p>
        
      </aside>
      */}


    </section>
    </div>
  )
}

const PostCreationForm = () => {

  const formId = 'postForm';
  const [temp, setTemp] = useState<undefined | string>(undefined);


  return (
  
  <form
    onPaste={(e)=>{
      const file = e.clipboardData.items[0].getAsFile();
      if (file){
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        alert("Due to the project being in an archive state - we have disabled POST requests to the S3 bucket. Images won't be uploaded");
        // @ts-ignore
        document.getElementById('image').files=dataTransfer.files;
        setTemp(URL.createObjectURL(file));
      }
      
    }}
    id={formId}
    action={handleCreatePost}
    className="
        my-2
        flex flex-col 
        items-center gap-y-4">

    <label  
      aria-label="Attach photos to your post"
      tabIndex={0}
      className="
      hover:brightness-110
      border border-dashed border-primary 
      px-2 py-1 rounded-md
      text-link hover:cursor-pointer place-self-start"
      htmlFor="image">📷</label>
    <ImageInputOptional pixels={200} setTemp={setTemp} temp={temp} />


    <ResetOnSubmit formId={formId} />

    <textarea
      required
      minLength={6}
      maxLength={200}
      aria-label="Type your post's text content here."
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
      w-full mb-2">
      <p>
        <Link 
        tabIndex={0}
        href="/user">
          Set up your account
        </Link> 
        &nbsp;to start posting!
      </p>
    </div>
  )
}