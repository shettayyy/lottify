export const LottieTypes = `#graphql
  type Lottie {
    """The unique identifier of the lottie animation"""
    id: String!,
    """The name of the lottie animation"""
    name: String!,
    """The URL of the lottie animation"""
    url: String!,
    """The upload status of the lottie animation (UPLOADING, UPLOADED, FAILED)"""
    uploadStatus: String!,
  }

  type LottieSignedUploadURL {
    """The unique identifier of the lottie animation"""
    id: String!,
    """The name of the lottie animation"""
    name: String!,
    """The URL of the lottie animation"""
    url: String!,
  }

  extend type Query {
    """Get a list of lottie animations"""
    lotties: [Lottie!]
  }

  input LottieUploadURLInput {
    """The __filename__ to upload"""
    filename: String!
  }

  extend type Mutation {
    """Upload a lottie animation"""
    generateUploadLottieURL(input: LottieUploadURLInput!): LottieSignedUploadURL!
  }
`;
