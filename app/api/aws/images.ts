import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { bucket, client } from "./s3";

export const uploadToAwsAvatars = async (binaryData: Buffer, fileName: string, fileType: string) => {

  // try {
  return await client.send(new PutObjectCommand({
    Bucket: bucket,
    Key: `public/avatars/${fileName}`,
    Body: binaryData,
    ContentType: fileType
  }))



  // }
  // finally{
  //   console.log("Done.");
  // }
}

export const deleteAvatarAws = async (url: string) => {

  // try {

  const key = url.slice(url.indexOf('public'));

  await client.send(new DeleteObjectCommand({
    Bucket: bucket,
    Key: key,
  }));



  // }
  // finally{
  //   console.log("Done.");
  // }
}