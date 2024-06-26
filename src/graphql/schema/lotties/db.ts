import mongoose, { ObjectId } from 'mongoose';

import { GetParams } from '@/common/types/http';
import { Lottie, LottieMetadata } from '@/common/types/lottie';
import { UploadStatus } from '@/common/types/upload';

const lottieSchema = new mongoose.Schema(
  {
    animationId: String,
    filename: { type: String, text: true },
    filesize: Number,
    url: String,
    uploadStatus: String, // or whatever type you want to use for the upload status
    metadata: {
      author: { type: String, text: true },
      generator: String,
      description: { type: String, text: true },
      width: Number,
      height: Number,
      frameRate: Number,
      layerCount: Number,
      totalFrames: Number,
      duration: Number,
      userFilename: { type: String, text: true },
    },
  },
  {
    timestamps: true,
  },
);

export const LottieModel = mongoose.model('lottie', lottieSchema);

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

// Function to fetch paginated lotties data from MongoDB
export const getLotties = async ({ page, limit, search }: GetParams) => {
  try {
    // Define the regex pattern for the search term
    const regex = new RegExp(search, 'i'); // 'i' flag for case-insensitive search

    // Define the query based on the search term
    const query = search
      ? {
          $or: [
            { filename: { $regex: regex } },
            { 'metadata.author': { $regex: regex } },
            { 'metadata.description': { $regex: regex } },
            { 'metadata.userFilename': { $regex: regex } },
          ],
        }
      : {};

    // Fetch lotties based on the query
    const lotties = await LottieModel.find(query)
      .sort({ createdAt: -1, _id: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    // Count the total number of lotties based on the query
    const totalLotties = await LottieModel.countDocuments(query);

    // Calculate the total number of pages
    const totalPages = Math.ceil(totalLotties / limit);

    // Determine pagination info
    const pagination = {
      currentPage: page,
      nextPage: page < totalPages ? page + 1 : null,
      prevPage: page > 1 ? page - 1 : null,
      firstPage: 1,
      lastPage: totalPages,
      total: totalLotties,
    };

    return {
      result: lotties,
      metadata: {
        pagination,
      },
    };
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

// Function to fetch a single lottie by ID from MongoDB
export const getLottieById = async (lottieId: ObjectId) => {
  try {
    // Fetch the lottie by ID
    const lottie = await LottieModel.findById(lottieId);

    if (!lottie) {
      throw new Error(`Lottie with ID ${lottieId} not found`);
    }

    return lottie;
  } catch (error) {
    throw new Error(`Failed to fetch lottie with ID ${lottieId}: ${(error as Error).message}`);
  }
};

// Function to fetch top 1 lottie from LottieModel
// Make 10 copies of it with new _id
export const cloneLotties = async () => {
  try {
    // Fetch the top n lotties from the LottieModel
    const topLotties = await LottieModel.find().sort({ _id: 1 }).limit(4);

    const clonedLotties = Array.from({ length: 10 }, (_, index) => {
      const selectedIndex = index < 4 ? index : index % 4;
      const topLottie = topLotties[selectedIndex];
      const clonedLottie = {
        ...topLottie.toObject(),
        _id: new mongoose.Types.ObjectId(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      return clonedLottie;
    });

    // Insert the cloned lotties into the LottieModel
    await LottieModel.insertMany(clonedLotties);

    return 'Lotties cloned successfully';
  } catch (error) {
    throw new Error(`Failed to clone lotties: ${(error as Error).message}`);
  }
};

// Function to delete all lotties from LottieModel except the top 4
export const deleteAllClonedLotties = async () => {
  try {
    // Fetch the top 4 lotties from the LottieModel
    const topLotties = await LottieModel.find().limit(4);

    // Delete all lotties except the top 4
    await LottieModel.deleteMany({ _id: { $nin: topLotties.map(lottie => lottie._id) } });

    return 'All lotties deleted successfully';
  } catch (error) {
    throw new Error('Failed to delete lotties');
  }
};

// Clear all lotties from the LottieModel
export const clearAllLotties = async () => {
  try {
    await LottieModel.deleteMany({});

    return 'All lotties cleared successfully';
  } catch (error) {
    throw new Error('Failed to clear lotties');
  }
};
