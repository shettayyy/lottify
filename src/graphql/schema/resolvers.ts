import { BookQuery } from './book';

const resolvers = {
  Query: {
    ...BookQuery,
  },
};

export default resolvers;
