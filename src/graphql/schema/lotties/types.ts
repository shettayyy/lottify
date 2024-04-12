export const LottieTypes = `#graphql
  type Lottie {
    """The __name__ of the lottie animation"""
    name: String!
    """The __file size__ of the lottie animation"""
    fileSize: Int!
  }

  type Query {
    """Get a list of lottie animations"""
    lotties: [Lottie!]
  }
`;
