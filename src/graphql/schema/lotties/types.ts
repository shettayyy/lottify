import { Lottie } from '@/common/types/lottie';

export type LottieUploadURLInput = {
  input: {
    filename: Lottie['filename'];
    filesize: Lottie['filesize'];
  };
};

export type LottieMetadataInput = {
  input: {
    animationId: Lottie['animationId'];
    filename: Lottie['filename'];
    _id: Lottie['_id'];
  };
};
