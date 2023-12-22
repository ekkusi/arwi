import { Prisma } from "@prisma/client";
import { CreateTeacherInput, UpdateCollectionInput, UpdateEvaluationInput, UpdateGroupInput, UpdateStudentInput } from "../../types";

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

export const mapUpdateGroupInput = (data: UpdateGroupInput): Prisma.GroupUpdateInput => {
  return {
    name: data.name ? data.name : undefined,
    archived: data.archived === null ? undefined : data.archived,
  };
};

export const mapUpdateEvaluationInput = (data: UpdateEvaluationInput): Prisma.EvaluationUpdateInput => {
  const { wasPresent, isStellar, ...rest } = data;
  return {
    ...rest,
    wasPresent: wasPresent === null ? undefined : wasPresent,
    isStellar: isStellar === null ? undefined : isStellar,
  };
};

export const mapUpdateCollectionInput = (
  data: Omit<UpdateCollectionInput, "evaluations">
): Omit<Prisma.EvaluationCollectionUpdateInput | Prisma.EvaluationCollectionUncheckedUpdateInput, "evaluations"> => {
  return {
    ...data,
    date: data.date ? new Date(data.date) : undefined,
    environmentCode: data.environmentCode || undefined,
    learningObjectiveCodes: data.learningObjectiveCodes || undefined,
  };
};
