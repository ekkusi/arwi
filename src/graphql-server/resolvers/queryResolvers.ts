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
  getGroups: async (_, { teacherId }, { prisma }) => {
    const groups = await prisma.group.findMany({
      where: { teacherId },
    });
    return groups;
  },
  getGroup: async (_, { id }, { prisma }) => {
    const group = await prisma.group.findFirstOrThrow({
      where: { id },
    });
    return group;
  },
  getCollection: async (_, { id }, { prisma }) => {
    const matchingCollection =
      await prisma.evaluationCollection.findFirstOrThrow({
        where: { id },
      });

    return matchingCollection;
  },
  getStudent: async (_, { id }, { prisma }) => {
    const matchingStudent = await prisma.student.findFirstOrThrow({
      where: { id },
    });
    return matchingStudent;
  },
  getEvaluation: async (_, { id }, { prisma }) => {
    const matchingEvaluation = await prisma.evaluation.findFirstOrThrow({
      where: { id },
    });
    return matchingEvaluation;
  },
};

export default resolvers;
