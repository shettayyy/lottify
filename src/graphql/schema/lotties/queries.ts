import { GraphQLError } from 'graphql'; // Import GraphQLError

import { GetParams } from '@/common/types/http';

import { getLotties } from './db';

export const LottieQueries = {
  lotties: async (_: unknown, args: { input: GetParams }) => {
    const { page, limit, search = '' } = args.input;

    try {
      // Call the getLotties function to fetch lotties
      return await getLotties({ page, limit, search });
    } catch (error) {
      throw new GraphQLError((error as Error).message);
    }
  },
};
