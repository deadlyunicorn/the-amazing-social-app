import { S3Client } from '@aws-sdk/client-s3'


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

