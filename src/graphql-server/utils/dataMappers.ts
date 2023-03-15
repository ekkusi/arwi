import { Prisma } from "@prisma/client";
import { UpdateGroupInput, UpdateStudentInput } from "../types";

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
