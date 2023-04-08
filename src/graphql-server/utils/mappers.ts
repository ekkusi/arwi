import { Prisma } from "@prisma/client";
import {
  UpdateCollectionInput,
  UpdateEvaluationInput,
  UpdateGroupInput,
  UpdateStudentInput,
} from "../types";

export const mapUpdateStudentInput = (
  data: UpdateStudentInput
): Prisma.StudentUpdateInput => {
  return {
    name: data.name ? data.name : undefined,
  };
};

export const mapUpdateGroupInput = (
  data: UpdateGroupInput
): Prisma.GroupUpdateInput => {
  return {
    name: data.name ? data.name : undefined,
  };
};

export const mapUpdateEvaluationInput = (
  data: UpdateEvaluationInput
): Prisma.EvaluationUpdateInput => {
  const { wasPresent, ...rest } = data;
  return {
    ...rest,
    // skillsRating: data.wasPresent === false ? null : data.skillsRating,
    // behaviourRating: data.wasPresent === false ? null : data.behaviourRating,
    wasPresent: wasPresent === null ? undefined : wasPresent,
  };
};

export const mapUpdateCollectionInput = (
  data: Omit<UpdateCollectionInput, "evaluations">
): Prisma.EvaluationCollectionUpdateInput => {
  return {
    ...data,
    type: data.type ? data.type : undefined,
    date: data.date ? new Date(data.date) : undefined,
  };
};
