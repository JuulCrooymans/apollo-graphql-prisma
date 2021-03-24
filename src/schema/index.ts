import { readFileSync } from 'fs';
import { makeExecutableSchema, gql } from 'apollo-server-express';
import { resolvers } from './resolvers';

const typeDefs = gql(
  readFileSync(__dirname.concat('/typeDefs.graphql'), 'utf8')
);

export const schema = makeExecutableSchema({
  //@ts-ignore: types issue https://github.com/dotansimha/graphql-code-generator/issues/4206
  typeDefs,
  resolvers,
  resolverValidationOptions: {
    requireResolversForResolveType: false, // remove prisma warning: https://github.com/prisma/prisma1/issues/2225
  },
});
