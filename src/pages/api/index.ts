import { ApolloServer } from "apollo-server-micro";
import { PrismaClient } from "@prisma/client";
import { prisma } from "../../server/prisma/prisma";
import { schema } from "../../server/schema";
import { handler } from "../../server/middleware/route";

interface ApiContext {
  prisma: PrismaClient;
}

export const config = {
  api: {
    bodyParser: false,
  },
};

handler.use(
  new ApolloServer({
    schema,
    context: (): ApiContext => {
      return {
        prisma,
      };
    },
  }).createHandler({
    path: "/api",
  })
);

export default handler;
