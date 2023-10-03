"use server"

import { redirect } from "next/navigation";
import { postPost } from "./postPost";
import { revalidatePath } from "next/cache";
import { getBinaryData } from "../../../(lib)/getBinaryData";
import { uploadToAwsPosts } from "../../(aws)/images";
import { formatDateUTC } from "../../../(lib)/formatDate";
import { MongoClient } from "mongodb";
import { getMongoClient } from "@/app/(lib)/mongoClient";

export const handleCreatePost = async (formData: FormData) => {

  const client = getMongoClient();
  const textContent = formData.get('post');

  //@ts-ignore
  const image: File | undefined = formData.get('image');

  try {


    if (!textContent || textContent.length < 6) {
      throw "Post too short";
    }

    await sendPost(image,String(textContent),client);

    revalidatePath('/');

  }
  catch (err) {
    redirect(`/explore?error=${err}`);
  }
  finally{
    await client.close();
  }

}



const sendPost = async(image:File|undefined,textContent:string,client:MongoClient) => {

  if (image && image.size>0){


    if (image.size > 2097152) {
      throw "Maximum allowed file size is 2MB";
    }
    if (!image.type.includes('image')) {
      throw "Only images are allowed";
    }
    
    const date = new Date();

    const fileExtension = image.type.includes('svg')?'svg':image.type.slice(image.type.indexOf('/')+1);

    const binaryData = await getBinaryData(image);
    const filename = `IMG_${formatDateUTC(date)}_${date.getUTCHours()}h${date.getUTCMinutes()}m${date.getUTCSeconds()}s${date.getUTCMilliseconds()}ms.${fileExtension}`;
    
    const imageURL = await uploadToAwsPosts(binaryData,filename,image.type);
    return await postPost({textContent:String(textContent),imageURL:String(imageURL)},client);
  }

  else{
    return await postPost({ textContent: String(textContent) },client);
  }

}