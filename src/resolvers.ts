import { context } from "./context";
import { GraphQLScalarType, Kind } from "graphql";

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

export const resolvers = {
  Date: dateScalar,
  Query: {
    posts: () => context.prisma.post.findMany(),
  },
  Mutation: {
    addPost: async (
      parent,
      args,
      ctx,
      info
    ): Promise<{ success: boolean; message?: string }> => {
      try {
        await context.prisma.post.create({
          data: { title: args.title, content: args.content },
        });
        return { success: true, message: "Post added." };
      } catch (err) {
        return { success: false, message: err };
      }
    },
  },
};
