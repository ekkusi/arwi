import { Group, Prisma } from "@prisma/client";
import { GetResult } from "@prisma/client/runtime/library";
import prisma from "../../prismaClient";
import { clearGroupLoaders, clearGroupLoadersById, clearGroupLoadersByTeacher } from "../dataLoaders/group";
import { clearModuleLoaders } from "../dataLoaders/module";
import { clearCollectionLoaders } from "../dataLoaders/collection";
import { clearEvaluationLoaders } from "../dataLoaders/evaluation";
import { clearStudentLoaders } from "../dataLoaders/student";
import { clearCollectionTypeLoaders } from "../dataLoaders/collectionType";

type UpdateGroupReturnType<T extends Prisma.GroupUpdateArgs> = GetResult<Prisma.$GroupPayload, T, "update">;

export async function updateGroup<T extends Prisma.GroupUpdateArgs>(id: string, args: Omit<T, "where">): Promise<UpdateGroupReturnType<T>> {
  const updatedGroup = (await prisma.group.update({
    ...args,
    where: { id },
  })) as UpdateGroupReturnType<T>;

  // Clear the DataLoader cache for this group
  await clearGroupLoadersById(id);

  return updatedGroup;
}

type UpdateGroupManyReturnType<T extends Prisma.GroupUpdateManyArgs> = GetResult<Prisma.$GroupPayload, T, "updateMany">;

export async function updateGroupMany<T extends Prisma.GroupUpdateManyArgs>(
  teacherId: string,
  args: Omit<T, "where">
): Promise<UpdateGroupManyReturnType<T>> {
  // Should always only find one group, updateMany only here because of typescript constraint
  const updatedGroups = (await prisma.group.updateMany({
    ...args,
    where: {
      teacherId,
    },
  })) as UpdateGroupManyReturnType<T>;

  // Clear the DataLoader cache for this group
  await clearGroupLoadersByTeacher(teacherId);

  return updatedGroups;
}

export async function updateGroupByModule<T extends Prisma.GroupUpdateManyArgs>(
  moduleId: string,
  groupId: string,
  args: Omit<T, "where">
): Promise<UpdateGroupManyReturnType<T>> {
  // Should always only find one group, updateMany only here because of typescript constraint
  const updatedGroups = (await prisma.group.updateMany({
    ...args,
    where: {
      modules: {
        some: {
          id: moduleId,
        },
      },
    },
  })) as UpdateGroupManyReturnType<T>;

  // Clear the DataLoader cache for this group
  await clearGroupLoadersById(groupId);

  return updatedGroups;
}

export async function deleteGroup(id: string): Promise<Group> {
  const deletedGroup = await prisma.group.delete({
    where: { id },
    include: {
      modules: {
        select: {
          id: true,
          groupId: true,
          evaluationCollections: {
            select: {
              id: true,
              moduleId: true,
              evaluations: {
                select: {
                  id: true,
                  evaluationCollectionId: true,
                },
              },
            },
          },
        },
      },
      collectionTypes: {
        select: {
          id: true,
          groupId: true,
        },
      },
      students: {
        select: {
          id: true,
          groupId: true,
        },
      },
    },
  });

  // Clear the DataLoader cache for this group
  clearGroupLoaders(deletedGroup);
  deletedGroup.modules.forEach((module) => {
    clearModuleLoaders(module);
    module.evaluationCollections.forEach((collection) => {
      clearCollectionLoaders(collection);
      collection.evaluations.forEach((evaluation) => {
        clearEvaluationLoaders(evaluation);
      });
    });
  });
  deletedGroup.students.forEach((student) => {
    clearStudentLoaders(student);
  });
  deletedGroup.collectionTypes.forEach((collectionType) => {
    clearCollectionTypeLoaders(collectionType);
  });

  return deletedGroup;
}

type CreateGroupReturnType<T extends Prisma.GroupCreateArgs> = GetResult<Prisma.$GroupPayload, T, "create">;

export async function createGroup<T extends Prisma.GroupCreateArgs>(teacherId: string, args: T): Promise<CreateGroupReturnType<T>> {
  const createdGroup = (await prisma.group.create(args)) as CreateGroupReturnType<T>;

  // Clear the DataLoader cache for this group
  await clearGroupLoadersByTeacher(teacherId);

  return createdGroup;
}
