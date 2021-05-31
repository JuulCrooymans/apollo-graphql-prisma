import path from "path";
import { readFileSync } from "fs";
import { makeExecutableSchema, gql } from "apollo-server-micro";
import { resolvers } from "./resolvers";

const typeDefs = gql(
  readFileSync(
    path.join(process.cwd() + "/src/server/schema/typeDefs.graphql"),
    "utf8"
  )
);

export const schema = makeExecutableSchema({
  //@ts-ignore: types issue https://github.com/dotansimha/graphql-code-generator/issues/4206
  typeDefs,
  resolvers,
  resolverValidationOptions: {
    requireResolversForResolveType: false, // remove prisma warning: https://github.com/prisma/prisma1/issues/2225
  },
});
