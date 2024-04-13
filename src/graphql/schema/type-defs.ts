import { LottieTypes } from './lotties';

// remember we only use gql in this file. types in other files are just simple strings
const typeDefs = `#graphql
  type Query
  type Mutation
  scalar Upload
  ${LottieTypes}
`;

export default typeDefs;
