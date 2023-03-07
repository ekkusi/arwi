import { Resolvers } from "../types";

type TypeResolvers = Omit<Resolvers, "Query" | "Mutation">;

const resolvers: TypeResolvers = {
  Teacher: {
    groups: async ({ id }, _, { prisma }) => {
      const groups = await prisma.group.findMany({
        where: {
          teacherId: id,
        },
      });
      return groups;
    },
  },
  Group: {
    evaluationCollections: async ({ id }, _, { prisma }) => {
      const collections = await prisma.evaluationCollection.findMany({
        where: {
          groupId: id,
        },
      });
      return collections;
    },
    students: async ({ id }, _, { prisma }) => {
      const students = await prisma.student.findMany({
        where: {
          groupId: id,
        },
      });
      return students;
    },
    teacher: async ({ id }, _, { prisma }) => {
      // TODO: Maybe implement custom NotFoundError
      const teacher = await prisma.teacher.findFirstOrThrow({
        where: {
          groups: {
            some: {
              id,
            },
          },
        },
      });
      return teacher;
    },
  },
  Evaluation: {
    collection: async ({ id }, _, { prisma }) => {
      const collection = await prisma.evaluationCollection.findFirstOrThrow({
        where: {
          evaluations: {
            some: {
              id,
            },
          },
        },
      });
      return collection;
    },
    student: async ({ id }, _, { prisma }) => {
      const student = await prisma.student.findFirstOrThrow({
        where: {
          evaluations: {
            some: {
              id,
            },
          },
        },
      });
      return student;
    },
  },
  EvaluationCollection: {
    group: async ({ id }, _, { prisma }) => {
      const matchingGroup = await prisma.group.findFirstOrThrow({
        where: {
          evaluationCollections: {
            some: {
              id,
            },
          },
        },
      });
      return matchingGroup;
    },
    evaluations: async ({ id }, _, { prisma }) => {
      const evaluations = await prisma.evaluation.findMany({
        where: {
          evaluationCollectionId: id,
        },
      });
      return evaluations;
    },
  },
  Student: {
    group: async ({ id }, _, { prisma }) => {
      const matchingGroup = await prisma.group.findFirstOrThrow({
        where: {
          students: {
            some: {
              id,
            },
          },
        },
      });
      return matchingGroup;
    },
    evaluations: async ({ id }, _, { prisma }) => {
      const evaluations = await prisma.evaluation.findMany({
        where: { studentId: id },
      });
      return evaluations;
    },
  },
};

export default resolvers;
