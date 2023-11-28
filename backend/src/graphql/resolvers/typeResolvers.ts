import { getEnvironment, getAllEnvironments, getLearningObjectives, getModuleInfo, getSubject } from "../../utils/subjectUtils";
import { EducationLevel, Resolvers } from "../../types";

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
    isMPassIDConnected: async ({ mPassID }) => {
      return !!mPassID;
    },
  },
  Group: {
    currentModule: async ({ currentModuleId }, _, { prisma }) => {
      const module = await prisma.module.findUniqueOrThrow({
        where: {
          id: currentModuleId,
        },
      });
      return module;
    },
    modules: async ({ id }, _, { prisma }) => {
      const modules = await prisma.module.findMany({
        where: {
          groupId: id,
        },
      });
      return modules;
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
      if (!matchingSubject) throw new Error(`Subject not found with code: ${subjectCode}`);
      return {
        code: matchingSubject.code,
        label: matchingSubject.label,
      };
    },
    collectionTypes: async ({ id }, _, { prisma }) => {
      const collectionTypes = await prisma.collectionType.findMany({
        where: {
          groupId: id,
        },
      });
      return collectionTypes;
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
    module: async ({ moduleId }, _, { prisma }) => {
      const module = await prisma.module.findUniqueOrThrow({
        where: {
          id: moduleId,
        },
      });
      return module;
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
      if (!environment) throw new Error(`Environment not found with code: ${environmentCode}`);
      return environment;
    },
    learningObjectives: async ({ moduleId, learningObjectiveCodes }, _, { prisma }) => {
      const module = await prisma.module.findUniqueOrThrow({
        where: {
          id: moduleId,
        },
      });
      const group = await prisma.group.findFirstOrThrow({
        where: {
          modules: { some: { id: moduleId } },
        },
      });
      const subjectObjectives = getLearningObjectives(group.subjectCode, module.educationLevel as EducationLevel, module.learningObjectiveGroupKey);
      return subjectObjectives.filter((objective) => learningObjectiveCodes.includes(objective.code));
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
    currentModuleEvaluations: async ({ id, groupId }, _, { prisma }) => {
      const group = await prisma.group.findUniqueOrThrow({
        where: { id: groupId },
      });
      const evaluations = await prisma.evaluation.findMany({
        where: {
          studentId: id,
          AND: [
            {
              studentId: id,
            },
            {
              evaluationCollection: {
                module: {
                  id: group.currentModuleId,
                },
              },
            },
          ],
        },
      });
      return evaluations;
    },
  },
  Subject: {
    environments: ({ code }) => {
      return getAllEnvironments(code);
    },
  },
  Module: {
    info: async ({ educationLevel, learningObjectiveGroupKey, groupId }, _, { prisma }) => {
      const group = await prisma.group.findUniqueOrThrow({
        where: {
          id: groupId,
        },
      });
      const info = getModuleInfo(group.subjectCode, educationLevel as EducationLevel, learningObjectiveGroupKey);
      if (!info)
        throw new Error(
          `Module info not found with subjectCode: ${group.subjectCode}, educationLevel: ${educationLevel}, learningObjectiveGroupKey: ${learningObjectiveGroupKey}`
        );
      return info;
    },
    group: async ({ groupId }, _, { prisma }) => {
      const group = await prisma.group.findUniqueOrThrow({
        where: {
          id: groupId,
        },
      });
      return group;
    },
    evaluationCollections: async ({ id }, _, { prisma }) => {
      const collections = await prisma.evaluationCollection.findMany({
        where: {
          moduleId: id,
        },
      });
      return collections;
    },
    students: async ({ id }, _, { prisma }) => {
      const students = await prisma.student.findMany({
        where: {
          modules: { some: { id } },
        },
      });
      return students;
    },
  },
  CollectionType: {
    group: async ({ groupId }, _, { prisma }) => {
      const group = await prisma.group.findUniqueOrThrow({
        where: {
          id: groupId,
        },
      });
      return group;
    },
  },
};

export default resolvers;
