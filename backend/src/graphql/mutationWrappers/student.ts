import { Prisma, Student } from "@prisma/client";
import { GetResult } from "@prisma/client/runtime/library";
import prisma from "../../prismaClient";
import { clearStudentLoaders, clearStudentLoadersByGroup, clearStudentLoadersById } from "../dataLoaders/student";
import { clearEvaluationLoaders } from "../dataLoaders/evaluation";

type CreateStudentReturnType<T extends Prisma.StudentCreateArgs> = GetResult<Prisma.$StudentPayload, T, "create">;

export async function createStudent<T extends Prisma.StudentCreateArgs>(groupId: string, args: T): Promise<CreateStudentReturnType<T>> {
  const student = (await prisma.student.create(args)) as CreateStudentReturnType<T>;

  // Clear the DataLoader cache for this student
  await clearStudentLoadersByGroup(groupId);

  return student;
}

export async function deleteStudent(id: string): Promise<Student> {
  const deletedStudent = await prisma.student.delete({
    where: { id },
    include: {
      evaluations: {
        select: {
          id: true,
          evaluationCollectionId: true,
        },
      },
    },
  });

  // Clear the DataLoader cache for this student
  clearStudentLoaders(deletedStudent);
  deletedStudent.evaluations.forEach((evaluation) => {
    clearEvaluationLoaders(evaluation);
  });

  return deletedStudent;
}

type UpdateStudentReturnType<T extends Prisma.StudentUpdateArgs> = GetResult<Prisma.$StudentPayload, T, "update">;

export async function updateStudent<T extends Prisma.StudentUpdateArgs>(id: string, args: Omit<T, "where">): Promise<UpdateStudentReturnType<T>> {
  const updatedStudent = (await prisma.student.update({
    ...args,
    where: { id },
  })) as UpdateStudentReturnType<T>;

  // Clear the DataLoader cache for this student
  await clearStudentLoadersById(id);

  return updatedStudent;
}
