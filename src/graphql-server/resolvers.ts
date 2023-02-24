import { PrismaClient } from "@prisma/client";
import { Resolvers } from "./types";

const prisma = new PrismaClient();
const resolvers: Resolvers = {
  Query: {
    getTeacher: async (_, { id }) => {
      const teacher = await prisma.teacher.findUnique({
        where: {
          id,
        },
      });
      if (!teacher) throw new Error(`No teacher found with id '${id}'`);
      return teacher;
    },
    greetings: () => {
      return "Hello";
    },
  },
  Mutation: {
    createTeacher: async (_, { data }) => {
      const teacher = await prisma.teacher.create({
        data: {
          ...data,
        },
      });
      return teacher;
    },
  },
};

export default resolvers;
