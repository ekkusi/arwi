import { Teacher } from "@prisma/client";
import prisma from "../../prismaClient";
import CustomDataLoader from "./CustomDataLoader";
import NotFoundError from "../../errors/NotFoundError";

export type ClearTeacherLoadersArgs = Pick<Teacher, "id">;

export const clearTeacherLoaders = (args: ClearTeacherLoadersArgs) => {
  teacherLoader.clear(args.id);
};

export const clearTeacherLoadersById = async (teacherId: string) => {
  teacherLoader.clear(teacherId);
  // const teacher = await teacherLoader.load(teacherId);
  // if (teacher) {
  //   clearTeacherLoaders(teacher);
  // }
};

export const teacherLoader = new CustomDataLoader<string, Teacher>(async (teacherIds) => {
  const teachers = await prisma.teacher.findMany({
    where: {
      id: {
        in: [...teacherIds],
      },
    },
  });

  const teachersMap: Record<string, Teacher> = {};

  for (const teacher of teachers) {
    teachersMap[teacher.id] = teacher;
  }

  return teacherIds.map((id) => teachersMap[id] || new NotFoundError());
});

export default { teacherLoader };
