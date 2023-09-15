"use server"
import { redirect } from "next/navigation";
import { userObject } from "../(mongodb)/user";
import { revalidatePath } from "next/cache";
import {  formatDateUTC } from "../(lib)/formatDate";
import { uploadToAwsPublic } from "./s3";



export const handleImageForm = async(formData:FormData,username:string)=>{
  // const imgSource = URL.createObjectURL(e.target.files[0]);

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
          //we should return the image url (which is public/filename) and upload it on mongodb on user/avatarSrc.
          console.log(`Success! Your image is ${res.url}`)
        }
        else{
          throw "Upload failed"
        }
      })
      revalidatePath('/');
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
