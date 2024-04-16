import mongoose, { ObjectId } from 'mongoose';

import { Lottie, LottieMetadata } from '@/common/types/lottie';
import { UploadStatus } from '@/common/types/upload';

const lottieSchema = new mongoose.Schema({
  animationId: String,
  filename: String,
  filesize: Number,
  url: String,
  uploadStatus: String, // or whatever type you want to use for the upload status
  metadata: {
    author: String,
    generator: String,
    description: String,
    width: Number,
    height: Number,
    frameRate: Number,
    layerCount: Number,
    totalFrames: Number,
    duration: Number,
    userFilename: String,
  },
});

const LottieModel = mongoose.model('lottie', lottieSchema);

// Function to insert lotties data into MongoDB
export const createLottie = async (lottie: Omit<Lottie, '_id'>) => {
  try {
    // Create a new instance of the Lottie model
    const lottieMetadata = new LottieModel(lottie);

    // Save the lotties data to the database
    return await lottieMetadata.save();
  } catch (error) {
    throw new Error('Failed to save lottie data while generating upload URL');
  }
};

// Function to update existing lottie data in MongoDB
export const updateLottieMetadata = async (
  lottieId: ObjectId,
  metadata: Partial<LottieMetadata>,
  uploadStatus?: UploadStatus,
) => {
  try {
    // Throw error if lottieId is not provided
    if (!lottieId) {
      throw new Error('Lottie ID is required.');
    }

    // Check if a document with the given lottieId exists in the database
    const existingLottie = await LottieModel.findById(lottieId);

    // Throw error if document with lottieId is not found
    if (!existingLottie) {
      throw new Error(`Lottie with ID ${lottieId} not found.`);
    }

    // Extract the existing metadata from the found row
    const existingMetadata = existingLottie.metadata || {};

    // Update only the metadata property with the provided fields
    const updatedMetadata = { ...existingMetadata, ...metadata };

    const updateOperation: {
      $set: {
        metadata: typeof updatedMetadata;
        uploadStatus?: UploadStatus;
      };
    } = { $set: { metadata: updatedMetadata } };

    // Update the upload status if provided
    if (uploadStatus) {
      updateOperation.$set.uploadStatus = uploadStatus;
    }

    // Update the document's metadata property with the updated metadata
    await LottieModel.updateOne({ _id: lottieId }, updateOperation);

    return `Lottie with ID ${lottieId} metadata updated successfully`;
  } catch (error) {
    throw new Error(`Failed to update lottie metadata: ${(error as Error).message}`);
  }
};
