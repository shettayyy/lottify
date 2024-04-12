import { BookTypes } from './book';

// remember we only use gql in this file. types in other files are just simple strings
const typeDefs = `#graphql
  ${BookTypes}
`;

export default typeDefs;
