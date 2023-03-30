import { Resolvers } from "../types";

type TypeResolvers = Omit<Resolvers, "Query" | "Mutation">;

const resolvers: TypeResolvers = {
  Teacher: {
    groups: async ({ id }, _, { prisma }) => {
      const groups = await prisma.group.findMany({
        where: {
          teacherId: id,
        },
        orderBy: { updatedAt: "desc" },
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
    teacher: async ({ teacherId }, _, { prisma }) => {
      // TODO: Maybe implement custom NotFoundError
      const teacher = await prisma.teacher.findUniqueOrThrow({
        where: {
          id: teacherId,
        },
      });
      return teacher;
    },
  },
  Evaluation: {
    collection: async ({ evaluationCollectionId }, _, { prisma }) => {
      const collection = await prisma.evaluationCollection.findUniqueOrThrow({
        where: {
          id: evaluationCollectionId,
        },
      });
      return collection;
    },
    student: async ({ studentId }, _, { prisma }) => {
      const student = await prisma.student.findUniqueOrThrow({
        where: {
          id: studentId,
        },
      });
      return student;
    },
  },
  EvaluationCollection: {
    group: async ({ groupId }, _, { prisma }) => {
      const matchingGroup = await prisma.group.findUniqueOrThrow({
        where: {
          id: groupId,
        },
      });
      // console.log("fetching group in collection", matchingGroup);

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
    group: async ({ groupId }, _, { prisma }) => {
      const matchingGroup = await prisma.group.findUniqueOrThrow({
        where: {
          id: groupId,
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
