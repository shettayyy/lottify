import { Lottie } from '@/common/types/lottie';

export const saveLottieMetadata = async (uploadedAnimation: Lottie) => {
  // Save metadata to MongoDB
  console.log('Saving metadata to MongoDB', uploadedAnimation);
  return uploadedAnimation;
};
