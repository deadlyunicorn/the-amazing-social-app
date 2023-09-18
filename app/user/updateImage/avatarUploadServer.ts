"use server"
import { redirect } from "next/navigation";
import { getUserDetails, getUserInfo, userObject } from "../../(mongodb)/user";
import { revalidatePath } from "next/cache";
import {  formatDateUTC } from "../../(lib)/formatDate";
import { setAvatarLink } from "../../(mongodb)/avatarUpload";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { supabaseCredentials } from "../../(supabase)/global";
import { cookies } from "next/headers";
import { deleteAvatarAws, uploadToAwsAvatars } from "@/app/(aws)/images";
import { getBinaryData } from "@/app/(lib)/getBinaryData";



export const handleAvatarForm = async(formData:FormData)=>{
  // const imgSource = URL.createObjectURL(e.target.files[0]);
  
  const userDetails = await getUserDetails();

  const username = String(userDetails?.username);
  const oldAvatarSrc = String(userDetails?.avatarSrc);

  try{
    const image = formData.get('imgFile') as File;
    if (image.size>2097152){
      throw "Maximum allowed file size is 2MB";
    }
    if (!image.type.includes('image')){
      throw "Only images are allowed";
    }

    await AvatarUploadAWS(image)
      .then(async(url)=>{
        await setAvatarLink(username,url)
      })
      .then(async()=>{
        // await ?? 
        await deleteAvatarAws(oldAvatarSrc);
      })


      revalidatePath(`/`);
  }
  catch(err){
    redirect(`user/${username}?error=${err}`);
  }
}


const AvatarUploadAWS = async(image:File) => {

  const date = new Date();

  const fileType = image.type;
  const fileName = `IMG_${formatDateUTC(date)}_${date.getUTCHours()}h${date.getUTCMinutes()}m${date.getUTCSeconds()}s${date.getUTCMilliseconds()}ms.${image.type.slice(fileType.indexOf('/')+1)}`;

  const imageBinary = await getBinaryData(image);

  return await uploadToAwsAvatars(imageBinary,fileName,fileType)
  .then(res=>{
    if (res.$metadata.httpStatusCode==200){
      return `https://the-amazing-social-app.s3.eu-central-1.amazonaws.com/public/avatars/${fileName}`;
    }
    else{
      throw "Upload failed";
    }
  })

 
  

}


