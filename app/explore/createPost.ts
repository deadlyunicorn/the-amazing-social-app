"use server"

import { redirect } from "next/navigation";
import { postPost } from "../(mongodb)/postPost";
import { revalidatePath } from "next/cache";
import { getBinaryData } from "../(lib)/getBinaryData";
import { uploadToAwsPosts } from "./(aws)/images";
import { formatDateUTC } from "../(lib)/formatDate";

export const handleCreatePost = async (formData: FormData) => {

  const textContent = formData.get('post');

  //@ts-ignore
  const image: File | undefined = formData.get('image');


  try {
    if (!textContent || textContent.length < 6) {
      throw "Post too short";
    }

    if (image && image.size>0){

      if (image.size > 2097152) {
        throw "Maximum allowed file size is 2MB";
      }
      if (!image.type.includes('image')) {
        throw "Only images are allowed";
      }
      
      const date = new Date();

      const binaryData = await getBinaryData(image);
      const filename = `IMG_${formatDateUTC(date)}_${date.getUTCHours()}h${date.getUTCMinutes()}m${date.getUTCSeconds()}s${date.getUTCMilliseconds()}ms.${image.type.slice(image.type.indexOf('/')+1)}`;
      
      const imageURL = await uploadToAwsPosts(binaryData,filename,image.type);
      await postPost({textContent:String(textContent),imageURL:String(imageURL)});
    }

    else{
      await postPost({ textContent: String(textContent) });
    }

    revalidatePath('/');



  }
  catch (err) {
    redirect(`/explore?page=1&error=${err}`);
  }

}