/* eslint-disable no-console */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const clearDb = async () => {
  await prisma.teacher.deleteMany();
};

console.log("Clearing DB...");
clearDb().then(
  () => {
    console.log("DB cleared");
  },
  (err) => {
    console.error("Something went wrong: ", err);
  }
);

export default clearDb;
