
import { loadEnvConfig } from "@next/env";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./src/generated/prisma/client";

loadEnvConfig(process.cwd());

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is missing. Check your .env file.");
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});

async function main() {
  const post = await prisma.post.findUnique({
    where: {
      slug: "pitrukaryas-in-varanasi",
    },
    select: {
      id: true,
      title: true,
      slug: true,
    },
  });

  if (!post) {
    console.log("Post not found. Nothing to delete.");
    return;
  }

  console.log("Deleting:", post.title);

  const result = await prisma.post.deleteMany({
    where: {
      slug: "pitrukaryas-in-varanasi",
    },
  });

  console.log(`Successfully deleted ${result.count} post(s).`);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
