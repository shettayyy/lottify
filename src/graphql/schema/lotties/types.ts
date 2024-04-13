import { FileUpload } from 'graphql-upload/processRequest.mjs';

export type UploadLottieInput = {
  input: {
    file: Promise<FileUpload>;
  };
};
