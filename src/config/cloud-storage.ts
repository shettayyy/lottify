import { PutObjectCommandInput, S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { GraphQLError } from 'graphql';

import { env } from './env';

export const cloudStorageClient = new S3Client({
  region: env.AWS_REGION,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
});

export const uploadFile = async (params: PutObjectCommandInput) => {
  const upload = new Upload({
    client: cloudStorageClient,
    params,
  });

  try {
    upload.on('httpUploadProgress', progress => {
      console.log(`Uploaded ${progress.loaded} of ${progress.total} bytes`);
    });

    await upload.done();
  } catch (error) {
    throw new GraphQLError(`Failed to upload file - ${(error as Error).message}`, {
      extensions: {
        code: 'UPLOAD_FAILED',
      },
    });
  }
};

export const cloudStorageBucketName = env.S3_BUCKET_NAME;
