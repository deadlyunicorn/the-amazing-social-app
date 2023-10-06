"use server"
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getBinaryData } from "@/app/lib/getBinaryData";
import { getUserDetails } from "@/app/api/mongodb/user/user";
import { setAvatarLink } from "@/app/api/mongodb/avatarUpload";
import { deleteAvatarAws, uploadToAwsAvatars } from "@/app/api/aws/images";
import { formatDateUTC } from "@/app/lib/formatDate";



export const handleAvatarForm = async(formData:FormData)=>{
  
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
  const fileExtension = image.type.includes('svg')?'svg':image.type.slice(image.type.indexOf('/')+1);

  const fileName = `IMG_${formatDateUTC(date)}_${date.getUTCHours()}h${date.getUTCMinutes()}m${date.getUTCSeconds()}s${date.getUTCMilliseconds()}ms.${fileExtension}`;

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


