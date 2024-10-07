import { S3Client } from "@aws-sdk/client-s3";

const KeyID = process.env.ACESSKEYID as string;
const SecretKey = process.env.SECRETACCESSKEY as string;

export const client = new S3Client({
  forcePathStyle: true,
  region: "us-east-1",
  endpoint: "https://izalkffitpywrrlhomsn.supabase.co/storage/v1/s3",
  credentials: {
    accessKeyId: KeyID,
    secretAccessKey: SecretKey,
  },
});
