import { CollectionType, Evaluation, EvaluationCollection, Module, Prisma, Teacher } from "@prisma/client";
import {
  CreateClassParticipationEvaluationInput,
  CreateDefaultEvaluationInput,
  CreateTeacherInput,
  EducationLevel,
  MinimalModuleInfo,
  TeacherUsageData,
  TokenUseWarning,
  UpdateClassParticipationCollectionInput,
  UpdateClassParticipationEvaluationInput,
  UpdateDefaultCollectionInput,
  UpdateDefaultEvaluationInput,
  UpdateGroupInput,
  UpdateStudentInput,
  WarningInfo,
} from "../../types";
import { FeedbackGenerationEvaluationData } from "@/utils/openAI";
import { getEnvironment } from "@/utils/subjectUtils";
import { MONTHLY_TOKEN_USE_LIMIT, MONTHLY_TOKEN_USE_WARNING_THRESHOLDS } from "@/config";

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

export const mapEvaluationFeedbackData = (evaluation: EvaluationWithCollection, module: Module): FeedbackGenerationEvaluationData => {
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

export const mapWarningSeenUpdateData = (warning: TokenUseWarning): Prisma.TeacherUpdateInput => {
  switch (warning) {
    case "FIRST_WARNING":
      return { hasSeenFirstMonthlyTokenWarning: true };
    case "SECOND_WARNING":
    default:
      return {};
  }
};

export const mapTeacherUsageData = (teacher: Teacher): TeacherUsageData => {
  let warningData: WarningInfo | undefined;
  // Check if teacher has reached the first or second warning threshold and set warning data accordingly
  const monthlyTokensUtilizationRate = teacher.monthlyTokensUsed / MONTHLY_TOKEN_USE_LIMIT;
  if (monthlyTokensUtilizationRate > MONTHLY_TOKEN_USE_WARNING_THRESHOLDS.SECOND_WARNING && !teacher.hasSeenSecondMonthlyTokenWarning) {
    warningData = {
      warning: "SECOND_WARNING",
      threshhold: MONTHLY_TOKEN_USE_WARNING_THRESHOLDS.SECOND_WARNING,
    };
  } else if (
    monthlyTokensUtilizationRate > MONTHLY_TOKEN_USE_WARNING_THRESHOLDS.FIRST_WARNING &&
    !teacher.hasSeenFirstMonthlyTokenWarning &&
    !teacher.hasSeenSecondMonthlyTokenWarning
  ) {
    warningData = {
      warning: "FIRST_WARNING",
      threshhold: MONTHLY_TOKEN_USE_WARNING_THRESHOLDS.FIRST_WARNING,
    };
  }
  return {
    id: teacher.id,
    monthlyTokensUsed: teacher.monthlyTokensUsed,
    warning: warningData,
  };
};
