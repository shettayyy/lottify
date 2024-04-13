export const LottieTypes = `#graphql
  type Lottie {
    """The __name__ of the lottie animation"""
    name: String!
    """The __file size__ of the lottie animation"""
    fileSize: Int!
  }

  extend type Query {
    """Get a list of lottie animations"""
    lotties: [Lottie!]
  }

  input UploadLottieInput {
    """The __file__ to upload"""
    file: Upload!
  }

  extend type Mutation {
    """Upload a lottie animation"""
    uploadLottie(input: UploadLottieInput!): String!
  }
`;
