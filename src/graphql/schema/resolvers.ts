import GraphQLUpload from 'graphql-upload/GraphQLUpload.mjs';

import { LottieMutations, LottieQueries } from './lotties';

const resolvers = {
  Query: {
    ...LottieQueries,
  },
  Mutation: {
    ...LottieMutations,
  },
  Upload: GraphQLUpload,
};

export default resolvers;
