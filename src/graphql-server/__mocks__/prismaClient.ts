import { PrismaClient } from "@prisma/client";
import { execSync } from "child_process";
import { URL } from "url";
import { v4 } from "uuid";

const generateDatabaseURL = (schema: string) => {
  if (!process.env.DATABASE_URL) {
    throw new Error("please provide a database url");
  }
  const url = new URL(process.env.DATABASE_URL);
  url.searchParams.append("schema", schema);
  return url.toString();
};

const schemaId = `test-${v4()}`;
const url = generateDatabaseURL(schemaId);
process.env.DATABASE_URL = url;
export const prisma = new PrismaClient({
  datasources: { db: { url } },
  log: ["query", "info", "warn"],
});

beforeAll(async () => {
  await prisma.$executeRawUnsafe(`CREATE SCHEMA IF NOT EXISTS "${schemaId}";`);
  await prisma.$executeRawUnsafe(`SET search_path TO "${schemaId}";`);
  await prisma.$executeRawUnsafe(`DROP EXTENSION IF EXISTS "uuid-ossp";`);
  await prisma.$executeRawUnsafe(
    `CREATE EXTENSION "uuid-ossp" SCHEMA "${schemaId}";`
  );
  // eslint-disable-next-line no-console
  console.log("Executing migrations to: ", generateDatabaseURL);

  execSync(`npx prisma migrate dev`, {
    env: {
      ...process.env,
      DATABASE_URL: generateDatabaseURL(schemaId),
    },
  });
});
afterAll(async () => {
  await prisma.$executeRawUnsafe(
    `DROP SCHEMA IF EXISTS "${schemaId}" CASCADE;`
  );
  await prisma.$disconnect();
});

export default prisma;
