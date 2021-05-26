import * as express from 'express';
import * as session from 'express-session';
import { ApolloServer, AuthenticationError } from 'apollo-server-express';
import { context } from './prisma/prisma';
import { schema } from './schema';

const app = express();
const port = 4000;

// TODO: add session
// app.use(
//   session({
//     secret: 'secret-key', // TODO: change to secure key
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       maxAge: 1000 * 60 * 60 * 24, // TODO: research best maxAge for cookie
//       sameSite: true,
//       secure: process.env.NODE_ENV === 'production',
//     },
//   })
// );

const server = new ApolloServer({
  schema,
  context: (req) => {
    // Check user session
    // throw new AuthenticationError('Not authenticated.');

    return {
      ...req,
      prisma: context.prisma,
    };
  },
});

server.applyMiddleware({ app });

app.get('/', (req, res) => {
  res.send(
    `<p>apollo - express - graphql - prisma - postgresql</p>
    <p>Graphql at <a href="/graphql">http://localhost:4000${server.graphqlPath}</a></p>`
  );
});

app.listen(port);
