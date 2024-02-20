import { CollectionType, Evaluation, EvaluationCollection, Module, Prisma } from "@prisma/client";
import {
  CreateClassParticipationEvaluationInput,
  CreateDefaultEvaluationInput,
  CreateTeacherInput,
  EducationLevel,
  MinimalModuleInfo,
  UpdateClassParticipationCollectionInput,
  UpdateClassParticipationEvaluationInput,
  UpdateDefaultCollectionInput,
  UpdateDefaultEvaluationInput,
  UpdateGroupInput,
  UpdateStudentInput,
} from "../../types";
import { ClassParticipationEvaluationData, DefaultEvaluationData } from "@/utils/openAI";
import { getEnvironment } from "@/utils/subjectUtils";

export const mapUpdateStudentInput = (data: UpdateStudentInput): Prisma.StudentUpdateInput => {
  return {
    name: data.name ? data.name : undefined,
  };
};

export const mapCreateTeacherInput = (data: Omit<CreateTeacherInput, "password">, passwordHash: string): Prisma.TeacherCreateInput => {
  return {
    email: data.email,
    passwordHash,
    languagePreference: data.languagePreference === null ? undefined : data.languagePreference,
    consentsAnalytics: data.consentsAnalytics === null ? undefined : data.consentsAnalytics,
  };
};

export const mapCreateClassParticipationEvaluationInput = (
  data: CreateClassParticipationEvaluationInput
): Prisma.EvaluationCreateManyEvaluationCollectionInput => {
  return {
    studentId: data.studentId,
    wasPresent: data.wasPresent,
    skillsRating: data.skillsRating,
    behaviourRating: data.behaviourRating,
    notes: data.notes,
  };
};

export const mapCreateDefaultEvaluationInput = (data: CreateDefaultEvaluationInput): Prisma.EvaluationCreateManyEvaluationCollectionInput => {
  return {
    studentId: data.studentId,
    wasPresent: data.wasPresent,
    notes: data.notes,
    generalRating: data.rating,
  };
};

export const mapUpdateGroupInput = (data: Omit<UpdateGroupInput, "collectionTypes">): Prisma.GroupUpdateInput => {
  return {
    name: data.name ? data.name : undefined,
    archived: data.archived === null ? undefined : data.archived,
  };
};

export const mapUpdateClassParticipationEvaluationInput = (data: UpdateClassParticipationEvaluationInput): Prisma.EvaluationUpdateInput => {
  return {
    behaviourRating: data.behaviourRating,
    skillsRating: data.skillsRating,
    notes: data.notes,
    wasPresent: data.wasPresent === null ? undefined : data.wasPresent,
  };
};

export const mapUpdateDefaultEvaluationInput = (data: UpdateDefaultEvaluationInput): Prisma.EvaluationUpdateInput => {
  return {
    generalRating: data.rating,
    notes: data.notes,
    wasPresent: data.wasPresent === null ? undefined : data.wasPresent,
  };
};

export const mapUpdateClassParticipationCollectionInput = (
  data: Omit<UpdateClassParticipationCollectionInput, "evaluations">
): Prisma.EvaluationCollectionUpdateInput | Prisma.EvaluationCollectionUncheckedUpdateInput => {
  return {
    ...data,
    date: data.date ? new Date(data.date) : undefined,
    environmentCode: data.environmentCode || undefined,
    learningObjectiveCodes: data.learningObjectiveCodes || undefined,
  };
};

export const mapUpdateDefaultCollectionInput = (
  data: Omit<UpdateDefaultCollectionInput, "evaluations">
): Prisma.EvaluationCollectionUpdateInput | Prisma.EvaluationCollectionUncheckedUpdateInput => {
  return {
    ...data,
    date: data.date ? new Date(data.date) : undefined,
  };
};

export const mapModuleInfo = (module: Module): MinimalModuleInfo => {
  return {
    ...module,
    educationLevel: module.educationLevel as EducationLevel,
  };
};

type CollectionTypeData = Pick<CollectionType, "name">;
type EvaluationWithCollection = Evaluation & {
  evaluationCollection: Pick<EvaluationCollection, "environmentCode" | "date"> & { type: CollectionTypeData };
};

export const mapEvaluationFeedbackData = (
  evaluation: EvaluationWithCollection,
  module: Module
): ClassParticipationEvaluationData | DefaultEvaluationData => {
  const { environmentCode } = evaluation.evaluationCollection;
  return environmentCode
    ? {
        environmentLabel: getEnvironment(environmentCode, mapModuleInfo(module))?.label.fi || "Ei ympäristöä",
        date: evaluation.evaluationCollection.date,
        skillsRating: evaluation.skillsRating,
        behaviourRating: evaluation.behaviourRating,
      }
    : {
        date: evaluation.evaluationCollection.date,
        generalRating: evaluation.generalRating,
        collectionTypeName: evaluation.evaluationCollection.type.name,
      };
};
