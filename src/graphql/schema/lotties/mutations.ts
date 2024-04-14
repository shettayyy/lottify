import { GraphQLError } from 'graphql';
// https://github.com/ai/nanoid
import { nanoid } from 'nanoid';
import { parse } from 'path';

import { getSignedUploadUrl } from '@/config/cloud-storage';

// import { saveLottieMetadata } from './service';
import { UploadURLLottieInput } from './types';

export const LottieMutations = {
  generateUploadLottieURL: async (_: unknown, args: UploadURLLottieInput) => {
    const {
      input: { filename },
    } = args;

    const { ext, name } = parse(filename);

    // validate if the file is a lottie animation
    if (ext !== '.json') {
      throw new GraphQLError('Invalid lottie file', {
        extensions: {
          code: 'INVALID_LOTTIE_FILE',
        },
      });
    }

    // TODO: Validate further the file contents to ensure it's a valid lottie animation

    const formattedName = name.replace(/([^a-z0-9 ]+)/gi, '-').replace(' ', '_');
    const animationID = nanoid();
    const formattedNameWithExt = `${formattedName}.json`;

    // Specify the S3 key where the file will be uploaded
    const key = `${animationID}/${formattedNameWithExt}`;

    const res = await getSignedUploadUrl(key);

    if (!res) {
      throw new GraphQLError('Failed to generate upload URL', {
        extensions: {
          code: 'UPLOAD_URL_GENERATION_FAILED',
        },
      });
    }

    return res;
  },
};
