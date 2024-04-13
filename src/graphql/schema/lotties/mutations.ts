import { GraphQLError } from 'graphql';
import { parse } from 'path';
import { v4 } from 'uuid';

import { cloudStorageBucketName, uploadFile } from '@/config/cloud-storage';

import { UploadLottieInput } from './types';

export const LottieMutations = {
  uploadLottie: async (_: unknown, args: UploadLottieInput) => {
    const {
      input: { file },
    } = args;

    const { filename, createReadStream } = await file;
    const { ext, name } = parse(filename);

    // validate if the file is a lottie animation
    if (ext !== '.json') {
      throw new GraphQLError('Invalid lottie file', {
        extensions: {
          code: 'INVALID_LOTTIE_FILE',
        },
      });
    }

    const stream = createReadStream();
    const formattedName = name.replace(/([^a-z0-9 ]+)/gi, '-').replace(' ', '_');

    const params = {
      Bucket: cloudStorageBucketName,
      // Create a unique name for the file
      Key: `${v4()}/${formattedName}.json`,
      Body: stream,
    };

    await uploadFile(params);

    return formattedName;
  },
};
