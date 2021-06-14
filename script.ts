import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// A `main` function so that you can use async/await
async function main() {
  await prisma.$connect();

  const users = await prisma.user
    .findMany({
      where: {
        email: { contains: "@" },
      },
      include: {
        posts: true,
      },
    })
    .then(log);

  const posts = await prisma.user
    .findFirst({
      where: {
        email: { contains: "second" },
      },
    })
    .posts({
      include: { author: true },
    })
    .then(log);
}

function log(data: any[]) {
  return console.dir(data, { depth: Infinity });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
