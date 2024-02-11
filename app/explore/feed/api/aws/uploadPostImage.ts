import { PutObjectCommand } from "@aws-sdk/client-s3";
import { S3Client } from '@aws-sdk/client-s3'

export const uploadToAwsPosts = async (binaryData: Buffer, fileName: string, fileType: string) => {

  throw "Images are disabled.";
  // try {
  return await client.send(new PutObjectCommand({
    Bucket: bucket,
    Key: `public/posts/${fileName}`,
    Body: binaryData,
    ContentType: fileType
  }))
  .then(res=>{
    if (res.$metadata.httpStatusCode==200){
      return `https://the-amazing-social-app.s3.eu-central-1.amazonaws.com/public/posts/${fileName}`;
    }
    else{
      throw "Upload failed";
    }
  })



  // }
  // finally{
  //   console.log("Done.");
  // }
}


const region = 'eu-central-1';

export const client = new S3Client(
  {
    region: region,
    credentials: {
      accessKeyId: String(process.env.accessKeyId),
      secretAccessKey: String(process.env.secretAccessKey)
    }
  }
);

export const bucket = "the-amazing-social-app"

