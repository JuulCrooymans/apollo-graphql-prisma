import { context } from './context';
import { GraphQLScalarType, Kind } from 'graphql';
import { Resolvers } from './generated/graphql';

// custom date scalar because date type doesn't exists in graphql
// github issue: https://github.com/graphql/graphql-spec/issues/73
const dateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
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
    posts: () => context.prisma.post.findMany(),
    user: (_, { email }) => {
      return context.prisma.user.findUnique({
        where: {
          email: email,
        },
      });
    },
  },
  Mutation: {
    // TODO: research mutation parameters
    addPost: async (root, args, ctx) => {
      try {
        await context.prisma.post.create({
          data: { title: args.title, content: args.content },
        });
        return { success: true, message: 'Post added.' };
      } catch (err) {
        return { success: false, message: err };
      }
    },
  },
};
