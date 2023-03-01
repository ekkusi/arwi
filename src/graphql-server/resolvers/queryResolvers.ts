import ValidationError from "../errors/ValidationError";
import { QueryResolvers } from "../types";
import { CustomContext } from "../types/contextTypes";

const resolvers: QueryResolvers<CustomContext> = {
  getTeacher: async (_, { id }, { prisma }) => {
    const teacher = await prisma.teacher.findUnique({
      where: {
        id,
      },
    });
    if (!teacher)
      throw new ValidationError(`Opettajaa ei löytynyt id:llä '${id}'`);
    return teacher;
  },
  getTeachers: async (_, __, { prisma }) => {
    const teachers = await prisma.teacher.findMany();
    return teachers;
  },
  getClasses: async (_, { teacherId }, { prisma }) => {
    const classes = await prisma.class.findMany({
      where: { teacherId },
    });
    return classes;
  },
  getClass: async (_, { id }, { prisma }) => {
    const matchingClass = await prisma.class.findFirstOrThrow({
      where: { id },
    });
    return matchingClass;
  },
};

export default resolvers;
