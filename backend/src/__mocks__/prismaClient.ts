import { PrismaClient } from "@prisma/client";
import { v4 } from "uuid";
import { execSync } from "child_process";

const generateDatabaseURL = (databaseName: string) => {
  if (!process.env.DATABASE_URL) {
    throw new Error("please provide a database url");
  }
  const url = new URL(process.env.DATABASE_URL);
  url.pathname = `/${databaseName}`;
  return url.toString();
};

const databaseName = `arwi-test-${v4()}`;
const url = generateDatabaseURL(databaseName);
const prisma = new PrismaClient({
  datasources: { db: { url } },
});

beforeAll(async () => {
  const adminPrisma = new PrismaClient();

  await adminPrisma.$executeRawUnsafe(`CREATE DATABASE "${databaseName}";`);
  await adminPrisma.$disconnect();

  execSync(`npx prisma migrate dev`, {
    env: {
      ...process.env,
      DATABASE_URL: url,
    },
  });
});

afterAll(async () => {
  await prisma.$disconnect();
  const adminPrisma = new PrismaClient();

  await adminPrisma.$executeRawUnsafe(`DROP DATABASE IF EXISTS "${databaseName}";`);
  await adminPrisma.$disconnect();
});

export default prisma;
