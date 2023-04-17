import { Resolvers } from "../types";
import { getEnvironment, getSubject } from "../utils/subjectUtils";

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
    teacher: async ({ teacherId }, _, { prisma }) => {
      // TODO: Maybe implement custom NotFoundError
      const teacher = await prisma.teacher.findUniqueOrThrow({
        where: {
          id: teacherId,
        },
      });
      return teacher;
    },
    subject: ({ subjectCode }) => {
      const matchingSubject = getSubject(subjectCode);
      if (!matchingSubject)
        throw new Error(`Subject not found with code: ${subjectCode}`);
      return {
        code: matchingSubject.code,
        label: matchingSubject.label,
      };
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
    environment: ({ environmentCode }) => {
      const environment = getEnvironment(environmentCode);
      if (!environment)
        throw new Error(`Environment not found with code: ${environmentCode}`);
      return environment;
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
    evaluations: async ({ id }, { wasPresent }, { prisma }) => {
      const evaluations = await prisma.evaluation.findMany({
        where: {
          studentId: id,
          wasPresent: wasPresent !== null ? { equals: wasPresent } : undefined,
        },
      });
      return evaluations;
    },
  },
  Subject: {
    environments: ({ code }) => {
      const subject = getSubject(code);
      if (!subject) throw new Error(`Subject not found with code: ${code}`);
      return subject.environments;
    },
  },
};

export default resolvers;
