import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import { env } from './env';

export const cloudStorageClient = new S3Client({
  region: env.AWS_REGION,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
});

// Generate a pre-signed URL for downloading a file from S3
export const getSignedUploadUrl = async (key: string) => {
  const command = new PutObjectCommand({
    Bucket: env.S3_BUCKET_NAME,
    Key: key,
    ContentType: 'application/json',
  });

  return getSignedUrl(cloudStorageClient, command, { expiresIn: 900 });
};

export const cloudStorageBucketName = env.S3_BUCKET_NAME;
