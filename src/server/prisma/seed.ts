import { prisma } from "./prisma";
import { Prisma } from "@prisma/client";

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
        password: "123123",
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
