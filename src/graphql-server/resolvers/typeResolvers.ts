import { Resolvers } from "../types";

type TypeResolvers = Omit<Resolvers, "Query" | "Mutation">;

const resolvers: TypeResolvers = {
  Teacher: {
    classes: async ({ id }, _, { prisma }) => {
      const classes = await prisma.class.findMany({
        where: {
          teacherId: id,
        },
      });
      return classes;
    },
  },
  Class: {
    evaluationCollections: async ({ id }, _, { prisma }) => {
      const collections = await prisma.evaluationCollection.findMany({
        where: {
          classId: id,
        },
      });
      return collections;
    },
    students: async ({ id }, _, { prisma }) => {
      const students = await prisma.student.findMany({
        where: {
          classId: id,
        },
      });
      return students;
    },
    teacher: async ({ id }, _, { prisma }) => {
      // TODO: Maybe implement custom NotFoundError
      const teacher = await prisma.teacher.findFirstOrThrow({
        where: {
          class: {
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
    class: async ({ id }, _, { prisma }) => {
      const matchingClass = await prisma.class.findFirstOrThrow({
        where: {
          evaluationCollections: {
            some: {
              id,
            },
          },
        },
      });
      return matchingClass;
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
};

export default resolvers;
