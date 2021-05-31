import { ApolloServer } from "apollo-server-micro";
import { PrismaClient } from "@prisma/client";
import { prisma } from "../../server/prisma/prisma";
import { schema } from "../../server/schema";

interface ApiContext {
  prisma: PrismaClient;
}

export const config = {
  api: {
    bodyParser: false,
  },
};

const server = new ApolloServer({
  schema,
  context: (): ApiContext => {
    return {
      prisma,
    };
  },
}).createHandler({
  path: "/api",
});

export default server;
