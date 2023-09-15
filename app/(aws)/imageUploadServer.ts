"use server"
import { redirect } from "next/navigation";
import { getUserInfo, userObject } from "../(mongodb)/user";
import { revalidatePath } from "next/cache";
import {  formatDateUTC } from "../(lib)/formatDate";
import { deleteImageAWS, uploadToAwsPublic } from "./s3";
import { setAvatarLink } from "../(mongodb)/avatarUpload";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { supabaseCredentials } from "../(supabase)/global";
import { cookies } from "next/headers";



export const handleImageForm = async(formData:FormData)=>{
  // const imgSource = URL.createObjectURL(e.target.files[0]);
  const session = await createServerActionClient({cookies},supabaseCredentials).auth.getSession();
  const userDetails = await getUserInfo({email:session.data.session?.user.email});

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

    await handleUploadToAWS(image)
      .then(res=>{
        if (res.aws.$metadata.httpStatusCode==200){
          return res.url;
        }
        else{
          throw "Upload failed"
        }
      })

      .then(async(url)=>{
        await setAvatarLink(username,url)
      })
      .then(async()=>{
        // await ?? 
        await deleteImageAWS(oldAvatarSrc);
      })


      revalidatePath(`/`);
  }
  catch(err){
    redirect(`user/${username}?error=${err}`);
  }
}


const handleUploadToAWS = async(image:File) => {

  const date = new Date();

  const fileType = image.type;
  const fileName = `IMG_${formatDateUTC(date)}_${date.getUTCHours()}h${date.getUTCMinutes()}m${date.getUTCSeconds()}s${date.getUTCMilliseconds()}ms.${image.type.slice(fileType.indexOf('/')+1)}`;
  

  const imageReader = image.stream().getReader();
  const imageDataU8: number[] = [];
  //u8[]

  while (true){

    const {done,value} = await imageReader.read();
    if (done) break;

    imageDataU8.push(...value);

  }

  //@ts-ignore
  const imageBinary = Buffer.from(imageDataU8,'binary');



 
  return {aws:await uploadToAwsPublic(imageBinary,fileName,fileType),url:`https://the-amazing-social-app.s3.eu-central-1.amazonaws.com/public/${fileName}`};

}
