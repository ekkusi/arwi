import { CollectionTypeCategory } from "@prisma/client";
import { getEnvironment, getAllEnvironments, getLearningObjectives, getModuleInfo, getSubject } from "../../utils/subjectUtils";
import { EducationLevel, Resolvers } from "../../types";
import MissingDataError from "../../errors/MissingDataError";

type TypeResolvers = Omit<Resolvers, "Query" | "Mutation">;

const resolvers: TypeResolvers = {
  Teacher: {
    groups: ({ id }, _, { dataLoaders }) => {
      return dataLoaders.groupsByTeacherLoader.load(id);
    },
    isMPassIDConnected: async ({ mPassID }) => {
      return !!mPassID;
    },
  },
  Group: {
    currentModule: ({ currentModuleId }, _, { dataLoaders }) => {
      return dataLoaders.moduleLoader.load(currentModuleId);
    },
    modules: ({ id }, _, { dataLoaders }) => {
      return dataLoaders.modulesByGroupLoader.load(id);
    },
    students: ({ id }, _, { dataLoaders }) => {
      return dataLoaders.studentsByGroupLoader.load(id);
    },
    teacher: ({ teacherId }, _, { dataLoaders }) => {
      return dataLoaders.teacherLoader.load(teacherId);
    },
    subject: ({ subjectCode }) => {
      const matchingSubject = getSubject(subjectCode);
      if (!matchingSubject) throw new Error(`Subject not found with code: ${subjectCode}`);
      return {
        code: matchingSubject.code,
        label: matchingSubject.label,
      };
    },
    collectionTypes: ({ id }, _, { dataLoaders }) => {
      return dataLoaders.collectionTypesByGroupLoader.load(id);
    },
  },
  DefaultEvaluation: {
    rating: ({ generalRating }) => generalRating,
    collection: ({ evaluationCollectionId }, _, { dataLoaders }) => {
      return dataLoaders.collectionLoader.load(evaluationCollectionId);
    },
    student: ({ studentId }, _, { dataLoaders }) => {
      return dataLoaders.studentLoader.load(studentId);
    },
  },
  ClassParticipationEvaluation: {
    collection: ({ evaluationCollectionId }, _, { dataLoaders }) => {
      return dataLoaders.collectionLoader.load(evaluationCollectionId);
    },
    student: ({ studentId }, _, { dataLoaders }) => {
      return dataLoaders.studentLoader.load(studentId);
    },
  },
  Evaluation: {
    __resolveType: async ({ evaluationCollectionId }, { dataLoaders }) => {
      const collection = await dataLoaders.collectionLoader.load(evaluationCollectionId);
      const type = await dataLoaders.collectionTypeLoader.load(collection.typeId);

      switch (type.category) {
        case CollectionTypeCategory.CLASS_PARTICIPATION:
          return "ClassParticipationEvaluation";
        case CollectionTypeCategory.EXAM:
        case CollectionTypeCategory.GROUP_WORK:
        case CollectionTypeCategory.WRITTEN_WORK:
        case CollectionTypeCategory.OTHER:
          return "DefaultEvaluation";
        default:
          return null;
      }
    },
  },
  ClassParticipationCollection: {
    environment: ({ environmentCode }) => {
      if (!environmentCode) throw new MissingDataError();
      const environment = getEnvironment(environmentCode);
      if (!environment) throw new MissingDataError(`Environment not found with code: ${environmentCode}`);
      return environment;
    },
    learningObjectives: async ({ moduleId, learningObjectiveCodes }, _, { dataLoaders }) => {
      const module = await dataLoaders.moduleLoader.load(moduleId);
      const group = await dataLoaders.groupLoader.load(module.groupId);
      const subjectObjectives = getLearningObjectives(group.subjectCode, module.educationLevel as EducationLevel, module.learningObjectiveGroupKey);
      return subjectObjectives.filter((objective) => learningObjectiveCodes.includes(objective.code));
    },
    type: ({ typeId }, _, { dataLoaders }) => {
      return dataLoaders.collectionTypeLoader.load(typeId);
    },
    module: ({ moduleId }, _, { dataLoaders }) => {
      return dataLoaders.moduleLoader.load(moduleId);
    },
    evaluations: ({ id }, _, { dataLoaders }) => {
      return dataLoaders.evaluationsByCollectionLoader.load(id);
    },
  },
  DefaultCollection: {
    type: ({ typeId }, _, { dataLoaders }) => {
      return dataLoaders.collectionTypeLoader.load(typeId);
    },
    module: ({ moduleId }, _, { dataLoaders }) => {
      return dataLoaders.moduleLoader.load(moduleId);
    },
    evaluations: ({ id }, _, { dataLoaders }) => {
      return dataLoaders.evaluationsByCollectionLoader.load(id);
    },
  },
  EvaluationCollection: {
    __resolveType: async ({ typeId }, { dataLoaders }) => {
      const type = await dataLoaders.collectionTypeLoader.load(typeId);

      switch (type.category) {
        case CollectionTypeCategory.CLASS_PARTICIPATION:
          return "ClassParticipationCollection";
        case CollectionTypeCategory.EXAM:
        case CollectionTypeCategory.GROUP_WORK:
        case CollectionTypeCategory.WRITTEN_WORK:
        case CollectionTypeCategory.OTHER:
          return "DefaultCollection";
        default:
          return null;
      }
    },
  },
  Student: {
    group: ({ groupId }, _, { dataLoaders }) => {
      return dataLoaders.groupLoader.load(groupId);
    },
    currentModuleEvaluations: async ({ id, groupId }, _, { prisma, dataLoaders }) => {
      const group = await dataLoaders.groupLoader.load(groupId);

      // A dataloader could be added for this but might be redundant as it is really specific.
      // The usage could be monitored and if this is queried a lot, a dataloader could be added.
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
    info: async ({ educationLevel, learningObjectiveGroupKey, groupId }, _, { dataLoaders }) => {
      const group = await dataLoaders.groupLoader.load(groupId);
      const info = getModuleInfo(group.subjectCode, educationLevel as EducationLevel, learningObjectiveGroupKey);
      if (!info)
        throw new Error(
          `Module info not found with subjectCode: ${group.subjectCode}, educationLevel: ${educationLevel}, learningObjectiveGroupKey: ${learningObjectiveGroupKey}`
        );
      return info;
    },
    group: ({ groupId }, _, { dataLoaders }) => {
      return dataLoaders.groupLoader.load(groupId);
    },
    evaluationCollections: ({ id }, _, { dataLoaders }) => {
      return dataLoaders.collectionsByModuleLoader.load(id);
    },
    students: async ({ id }, _, { prisma }) => {
      // A dataloader could be added for this but it would be complicated.
      // The usage could be monitored and if this is queried a lot, a dataloader could be added.
      const students = await prisma.student.findMany({
        where: {
          modules: { some: { id } },
        },
      });
      return students;
    },
  },
  CollectionType: {
    group: ({ groupId }, _, { dataLoaders }) => {
      return dataLoaders.groupLoader.load(groupId);
    },
  },
};

export default resolvers;
