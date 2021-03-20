import { makeExecutableSchema } from 'apollo-server-express';
import { resolvers } from './resolvers';
import { typeDefs } from './typeDefs';

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  resolverValidationOptions: {
    requireResolversForResolveType: false, // remove prisma warning: https://github.com/prisma/prisma1/issues/2225
  },
});
