export const LottieTypes = `#graphql
  type LottieMetadata {
    """The author of the lottie animation"""
    author: String,
    """The description of the lottie animation"""
    description: String,
    """The generator which generated the lottie animation"""
    generator: String,
    """The width of the lottie animation"""
    width: Int,
    """The height of the lottie animation"""
    height: Int,
    """The frame rate of the lottie animation"""
    frameRate: Int,
    """The number of layers in the lottie animation"""
    layerCount: Int,
    """The number of frames in the lottie animation"""
    totalFrames: Int,
    """The duration of the lottie animation in seconds"""
    duration: Int,
    """The user allotted filename"""
    userFilename: String,
  }
  
  type Lottie {
    """The unique mongodb identifier of the lottie animation"""
    _id: ID,
    """The unique identifier of the lottie animation"""
    animationId: String!,
    """The name of the lottie animation"""
    filename: String!,
    """The filesize of the lottie animation"""
    filesize: Int!,
    """The URL of the lottie animation"""
    url: String!,
    """The upload status of the lottie animation (UPLOADING, UPLOADED, FAILED)"""
    uploadStatus: String!,
    """Lottie user metadata"""
    metadata: LottieMetadata
  }

  extend type Query {
    """Get a list of lottie animations"""
    lotties: [Lottie!]
  }

  input LottieUploadURLInput {
    """The __filename__ to upload"""
    filename: String!
    """The __filesize__ of the file to upload"""
    filesize: Int!
  }

  input LottieMetadataInput {
    """The unique mongodb identifier of the lottie animation"""
    _id: String!
    """The name of the lottie animation"""
    filename: String!
    """The unique identifier of the lottie animation"""
    animationId: String!
  }

  extend type Mutation {
    """Upload a lottie animation"""
    generateUploadLottieURL(input: LottieUploadURLInput!): Lottie!
    """Save the metadata of a lottie animation"""
    saveLottieMetadata(input: LottieMetadataInput!): String!
  }
`;
