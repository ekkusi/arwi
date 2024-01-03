import { Student } from "@prisma/client";
import prisma from "../../prismaClient";
import CustomDataLoader from "./CustomDataLoader";
import NotFoundError from "../../errors/NotFoundError";

export type ClearStudentLoadersArgs = Pick<Student, "id" | "groupId">;

export const clearStudentLoaders = (args: ClearStudentLoadersArgs) => {
  studentLoader.clear(args.id);
  studentsByGroupLoader.clear(args.groupId);
};

export const clearStudentLoadersByGroup = async (groupId: string) => {
  const students = await studentsByGroupLoader.load(groupId);

  for (const student of students) {
    studentLoader.clear(student.id);
  }
  studentsByGroupLoader.clear(groupId);
};

export const clearStudentLoadersById = async (id: string) => {
  const student = await studentLoader.load(id);
  if (student) {
    clearStudentLoaders(student);
  }
};

export const studentLoader = new CustomDataLoader<string, Student>(async (ids) => {
  const students = await prisma.student.findMany({
    where: {
      id: {
        in: [...ids],
      },
    },
  });

  const studentMap: Record<string, Student> = {};

  for (const student of students) {
    studentMap[student.id] = student;
  }

  return ids.map((id) => studentMap[id] || new NotFoundError());
});

export const studentsByGroupLoader = new CustomDataLoader<string, Student[]>(async (groupIds) => {
  const students = await prisma.student.findMany({
    where: {
      groupId: {
        in: [...groupIds],
      },
    },
  });

  const studentsMap: Record<string, Student[]> = {};

  for (const student of students) {
    if (!studentsMap[student.groupId]) {
      studentsMap[student.groupId] = [];
    }
    studentsMap[student.groupId].push(student);
  }

  return groupIds.map((id) => studentsMap[id] || []);
});

export default {
  studentLoader,
  studentsByGroupLoader,
};
