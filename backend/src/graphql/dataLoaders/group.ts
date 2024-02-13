import { Group } from "@prisma/client";
import prisma from "../../prismaClient";
import CustomDataLoader from "./CustomDataLoader";
import NotFoundError from "../../errors/NotFoundError";

export type ClearGroupLoadersArgs = Pick<Group, "id" | "teacherId">;

export const clearGroupLoaders = (args: ClearGroupLoadersArgs) => {
  groupsByTeacherLoader.clear(args.teacherId);
  groupLoader.clear(args.id);
};

export const clearGroupLoadersByTeacher = async (teacherId: string) => {
  const groups = await groupsByTeacherLoader.load(teacherId);
  groups.forEach((group) => groupLoader.clear(group.id));
  groupsByTeacherLoader.clear(teacherId);
};

export const clearGroupLoadersByModule = async (moduleId: string) => {
  const groups = await prisma.group.findMany({
    where: {
      modules: {
        some: {
          id: moduleId,
        },
      },
    },
  });
  groups.forEach((group) => clearGroupLoaders(group));
};

export const clearGroupLoadersById = async (groupId: string) => {
  const group = await groupLoader.load(groupId);
  if (group) {
    clearGroupLoaders(group);
  }
};

export const groupsByTeacherLoader = new CustomDataLoader<string, Group[]>(async (teacherIds) => {
  const groups = await prisma.group.findMany({
    where: {
      teacherId: {
        in: [...teacherIds],
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  const groupsMap: Record<string, Group[]> = {};

  for (const group of groups) {
    if (!groupsMap[group.teacherId]) {
      groupsMap[group.teacherId] = [];
    }
    groupsMap[group.teacherId].push(group);
  }

  return teacherIds.map((id) => groupsMap[id] || []);
});

export const groupLoader = new CustomDataLoader<string, Group>(async (groupIds) => {
  const groups = await prisma.group.findMany({
    where: {
      id: {
        in: [...groupIds],
      },
    },
  });

  const groupsMap: Record<string, Group> = {};

  for (const group of groups) {
    groupsMap[group.id] = group;
  }

  return groupIds.map((id) => groupsMap[id] || new NotFoundError());
});

export default {
  groupsByTeacherLoader,
  groupLoader,
};
