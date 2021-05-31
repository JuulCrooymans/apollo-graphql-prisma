import { prisma } from "./prisma";
import { Prisma } from "@prisma/client";
import bcrypt from "bcrypt";

// Empty database before seeding
async function emptyDatabase() {
  const tables = Prisma.dmmf.datamodel.models.map((model) => model.name);

  await Promise.all(
    tables.map((table) => prisma.$executeRaw(`DELETE FROM "${table}";`))
  );
}

async function main() {
  await emptyDatabase();
  await Promise.all([
    await prisma.user.create({
      data: {
        id: "user",
        email: "test@mail.com",
        username: "tester",
        password: await bcrypt.hash("123123", 10),
      },
    }),
  ]);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
