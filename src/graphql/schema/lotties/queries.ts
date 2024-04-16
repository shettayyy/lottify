import { GraphQLError } from 'graphql'; // Import GraphQLError

import { GetParams } from '@/common/types/http';
import { Lottie } from '@/common/types/lottie';

import { getLottieById, getLotties } from './db';

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

  lottie: async (_: unknown, args: { input: { id: Lottie['_id'] } }) => {
    const { id } = args.input;

    try {
      // Call the getLottie function to fetch a lottie by id
      return await getLottieById(id);
    } catch (error) {
      throw new GraphQLError((error as Error).message);
    }
  },
};
