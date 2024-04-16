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

  type Pagination {
    """The current page of the lottie animations result"""
    currentPage: Int
    """Next page number"""
    nextPage: Int
    """Previous page number"""
    prevPage: Int
    """First page number"""
    firstPage: Int
    """Last page number"""
    lastPage: Int
    """The total items in the database"""
    total: Int
  }
  

  type Metadata {
    """The pagination metadata of the lottie animations result"""
    pagination: Pagination!
  }

  type GetLottieResponse {
    """Get a list of lottie animations"""
    result: [Lottie!]
    """The metadata of the lottie animations result"""
    metadata: Metadata!
  }

  input GetLottieParams {
    """The page number of the lottie animations"""
    page: Int
    """The limit of the lottie animations"""
    limit: Int
    """The search query for the lottie animations"""
    search: String
  }

  input GetLottieInput {
    id: ID!
  }

  extend type Query {
    """Get a list of lottie animations"""
    lotties(input: GetLottieParams): GetLottieResponse!
    """Get a lottie animation by id"""
    lottie(input: GetLottieInput!): Lottie!
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
    """Clone lotties for testing"""
    cloneLotties: String!
    """Delete cloned lotties"""
    deleteClonedLotties: String!
    """Clear all lotties"""
    clearLotties: String!
  }
`;
