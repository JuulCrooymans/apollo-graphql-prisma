import { GraphQLScalarType, Kind } from "graphql";
import { Resolvers } from "../types/graphql";
import { ApolloError } from "apollo-server-express";
import * as bcrypt from "bcrypt";

// custom date scalar because date type doesn't exists in graphql
// github issue: https://github.com/graphql/graphql-spec/issues/73
const dateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar type",
  serialize(value) {
    return value.getTime();
  },
  parseValue(value) {
    return new Date(value);
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10));
    }
    return null;
  },
});

export const resolvers: Resolvers = {
  Date: dateScalar,
  Query: {
    user: (_, { email }, ctx) => {
      return ctx.prisma.user.findUnique({
        where: {
          email: email,
        },
      });
    },
  },
  Mutation: {
    // prisma error codes: https://www.prisma.io/docs/reference/api-reference/error-reference
    signup: async (_, { email, username, password }, ctx) => {
      try {
        if (password.length < 6) throw new ApolloError("Password to short.");

        const hash = await bcrypt.hash(password, 10);

        return await ctx.prisma.user.create({
          data: { email, username, password: hash },
        });
      } catch (err) {
        throw new ApolloError(err.message, err.code);
      }
    },
    login: async (_, { email, password }, ctx) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      if (!user) throw new ApolloError("No user found.");

      const isValid = await bcrypt.compare(password, user.password);

      if (!isValid) throw new ApolloError("Wrong password.");

      return user;
    },
  },
};
