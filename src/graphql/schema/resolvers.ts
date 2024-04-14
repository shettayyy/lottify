import { LottieMutations, LottieQueries } from './lotties';

const resolvers = {
  Query: {
    ...LottieQueries,
  },
  Mutation: {
    ...LottieMutations,
  },
};

export default resolvers;
