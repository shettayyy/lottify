import { GraphQLError } from 'graphql';
import { parse } from 'path';

import { LottieFileData, LottieMetadata } from '@/common/types/lottie';
import { UploadStatus } from '@/common/types/upload';
import { generateUniqueID } from '@/common/utils/id-generator';
import { getFileStreamFromCloud, getSignedUploadUrl } from '@/config/cloud-storage';

import { cloneLotties, createLottie, deleteAllClonedLotties, updateLottieMetadata } from './db';
import { LottieMetadataInput, LottieUploadURLInput } from './types';

const startMetadataUpdate = async (args: LottieMetadataInput) => {
  const { _id, animationId, filename } = args.input;

  // Retry logic with a maximum of 2 attempts
  let retryCount = 0;
  const maxRetries = 2;
  let success = false;

  while (retryCount < maxRetries && !success) {
    try {
      const s3Object = await getFileStreamFromCloud(`${animationId}/${filename}.json`);

      if (!s3Object || !s3Object.Body) {
        throw new GraphQLError('Failed to get file from cloud', {
          extensions: {
            code: 'FILE_RETRIEVAL_FAILED',
          },
        });
      }

      const jsonString = await s3Object.Body.transformToString();

      if (!jsonString) {
        throw new GraphQLError('Failed to convert file to string', {
          extensions: {
            code: 'FILE_CONVERSION_FAILED',
          },
        });
      }

      const data = JSON.parse(jsonString) as LottieFileData;

      const metadata: Partial<LottieMetadata> = {};
      if (data.w && data.h) {
        metadata.width = data.w;
        metadata.height = data.h;
      }

      if (data.fr) {
        metadata.frameRate = data.fr;
      }

      if (data.layers && data.layers.length) {
        metadata.layerCount = data.layers.length;
      }

      if (data.op) {
        metadata.totalFrames = data.op;
      }

      if (data.ip && data.op && data.fr) {
        metadata.duration = (data.op - data.ip) / data.fr;
      }

      if (data.metadata?.filename || data.nm) {
        metadata.userFilename = data.metadata?.filename || data.nm;
      }

      // Attempt to update metadata
      await updateLottieMetadata(_id, metadata, UploadStatus.UPLOADED);
      success = true; // Update successful
    } catch (error) {
      retryCount++;
      // Check if error indicates no retry needed
      const errorMessage = (error as Error).message;
      if (
        errorMessage.includes('Lottie ID is required.') ||
        errorMessage.includes(`Lottie with ID ${_id} not found.`)
      ) {
        break; // Stop retrying
      }
      // Log or handle the error as needed
      console.error(`Error updating metadata (attempt ${retryCount}):`, error);
    }
  }

  // If update failed after retrying, set upload status to failed
  if (!success) {
    await updateLottieMetadata(_id, {}, UploadStatus.FAILED);
  }
};

export const LottieMutations = {
  generateUploadLottieURL: async (_: unknown, args: LottieUploadURLInput) => {
    const {
      input: { filename, filesize },
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

    const formattedName = name.replace(/([^a-z0-9 ]+)/gi, '-').replace(' ', '_');
    const animationId = generateUniqueID();
    const formattedNameWithExt = `${formattedName}.json`;

    // Specify the S3 key where the file will be uploaded
    const key = `${animationId}/${formattedNameWithExt}`;

    const res = await getSignedUploadUrl(key);
    const url = res.split('?')[0];

    const finalResult = {
      animationId,
      url,
      uploadStatus: UploadStatus.UPLOADING,
      filename: formattedName,
      filesize,
      metadata: {},
    };
    const createdLottie = await createLottie(finalResult);

    if (!res) {
      throw new GraphQLError('Failed to generate upload URL', {
        extensions: {
          code: 'UPLOAD_URL_GENERATION_FAILED',
        },
      });
    }

    return {
      _id: createdLottie._id,
      ...finalResult,
    };
  },

  saveLottieMetadata: async (_: unknown, args: LottieMetadataInput) => {
    startMetadataUpdate(args);

    return 'Lottie metadata is being saved...';
  },

  cloneLotties: async () => {
    await cloneLotties();

    return 'Lotties have been cloned!';
  },

  deleteClonedLotties: async () => {
    await deleteAllClonedLotties();

    return 'Cloned lotties have been deleted!';
  },
};
