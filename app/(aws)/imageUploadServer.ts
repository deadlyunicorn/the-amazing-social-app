"use server"
import { redirect } from "next/navigation";
import { userObject } from "../(mongodb)/user";
import { revalidatePath } from "next/cache";
import { formatDate } from "../(lib)/formatDate";
import { uploadToAwsPublic } from "./s3";
import fs from 'fs';



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
    await uploadImage(image);
    revalidatePath('/');
  }
  catch(err){
    redirect(`user/${username}?error=${err}`);
  }
}


const uploadImage = async(image:File) => {

  const date = new Date();
  const fileName = `IMG_${formatDate(date).replaceAll('/','')}_${date.getHours()}h${date.getMinutes()}m${date.getSeconds()}s${date.getMilliseconds()}ms.${image.type.slice(image.type.indexOf('/')+1)}`;

  

  throw 'not yet implemented:)';
  const toBase64 = (file: File): Promise<string> => (new Promise((res, err) => {

      fs.readFile(file,(err,data)=>{
      
      });
      const reader = new filereader();
      reader.readAsDataURL(file);
      reader.onload = () => (res(reader.result as string))
      reader.onerror = () => { alert("There was an error reading your file.") }
    }));
        
            

    const encodedFile: string = await toBase64(image)
      .then(res => res.slice(res.indexOf('base64,') + 'base64,'.length));


      if (encodedFile) {
          return await uploadToAwsPublic(encodedFile,fileName)
          .then( async(res) => {
              console.log(res);
              if (res.$metadata.httpStatusCode==200){
                //we should return the image url (which is public/filename) and upload it on mongodb on user/avatarSrc.
                console.log('Success!')
              }
              else{
                throw "Upload failed"
              }
             
          })
         
      }
      

    }