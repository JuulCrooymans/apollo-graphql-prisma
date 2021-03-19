import * as express from 'express';
import { makeExecutableSchema, ApolloServer } from 'apollo-server-express';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  resolverValidationOptions: {
    requireResolversForResolveType: false, // remove prisma warning: https://github.com/prisma/prisma1/issues/2225
  },
});

const server = new ApolloServer({ schema });
const app = express();
const port = 4000;

server.applyMiddleware({ app });

app.get('/', (req, res) => {
  res.send(
    `<p>apollo - express - graphql - prisma - postgresql</p> 
    <p>Graphql at <a href="/graphql">http://localhost:4000${server.graphqlPath}</a></p>`
  );
});

app.listen(port);
