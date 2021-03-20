import * as express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { context } from './utils';
import { schema } from './shema';

const server = new ApolloServer({
  schema,
  context: (req: any) => ({
    ...req,
    prisma: context.prisma,
  }),
});
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
