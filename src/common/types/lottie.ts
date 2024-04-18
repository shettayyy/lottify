import { ObjectId } from 'mongoose';

import { UploadStatus } from './upload';

export type LottieFileData = {
  w?: number;
  h?: number;
  fr?: number;
  layers?: Array<{
    ty: number;
  }>;
  op?: number;
  ip?: number;
  metadata?: {
    filename?: string;
  };
  nm?: string;
};

export type LottieMetadata = {
  author?: string;
  description?: string;
  // generator which generated the lottie animation
  generator?: string;
  // Dimensions of the lottie animation
  width?: number;
  height?: number;
  // Frame rate of the lottie animation
  frameRate?: number;
  // Number of layers in the lottie animation
  layerCount?: number;
  // Number of frames in the lottie animation
  totalFrames?: number;
  // Duration of the lottie animation in seconds
  duration?: number;
  // user allotted filename
  userFilename?: string;
};

export type Lottie = {
  _id: ObjectId;
  animationId: string;
  url: string;
  filename: string;
  filesize: number;
  uploadStatus: UploadStatus;
  metadata: LottieMetadata;
  createdAt?: Date;
  updatedAt?: Date;
};
