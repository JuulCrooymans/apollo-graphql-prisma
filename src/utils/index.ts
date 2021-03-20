import { PrismaClient } from '@prisma/client';

// types
export interface Context {
  prisma: PrismaClient;
}

// prisma
const prisma = new PrismaClient();

export const context: Context = {
  prisma: prisma,
};

// JWT
