import { PutObjectCommand, CreateBucketCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { S3Client } from '@aws-sdk/client-s3'


const region = 'eu-central-1';

const client = new S3Client(
  {
    region: region,
    credentials: {
      accessKeyId: String(process.env.accessKeyId),
      secretAccessKey: String(process.env.secretAccessKey)
    }
  }
);

const bucket = {
  name: "the-amazing-social-app",

}

export const uploadToAwsPublic = async (binaryData: Buffer, fileName: string, fileType: string) => {

  // try {
  return await client.send(new PutObjectCommand({
    Bucket: bucket.name,
    Key: `public/${fileName}`,
    Body: binaryData,
    ContentType: fileType
  }))



  // }
  // finally{
  //   console.log("Done.");
  // }
}

export const deleteImageAWS = async (url: string) => {

  // try {

  const key = url.slice(url.indexOf('public'));

  await client.send(new DeleteObjectCommand({
    Bucket: bucket.name,
    Key: key,
  }));



  // }
  // finally{
  //   console.log("Done.");
  // }
}
