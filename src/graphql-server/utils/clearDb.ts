/* eslint-disable no-console */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const clearDb = async () => {
  const deletes = await prisma.teacher.deleteMany();
  console.log("Deleted: ", deletes);
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
