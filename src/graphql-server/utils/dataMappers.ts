import { Prisma } from "@prisma/client";
import { UpdateStudentInput } from "../types";

export const mapUpdateStudentInput = (
  data: UpdateStudentInput
): Prisma.StudentUpdateInput => {
  return {
    name: data.name ? data.name : undefined,
  };
};
