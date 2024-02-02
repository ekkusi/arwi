import { Prisma, Teacher } from "@prisma/client";
import { GetResult } from "@prisma/client/runtime/library";
import { clearTeacherLoaders, clearTeacherLoadersById } from "../dataLoaders/teacher";
import prisma from "../../prismaClient";
import { clearStudentLoaders } from "../dataLoaders/student";
import { clearEvaluationLoaders } from "../dataLoaders/evaluation";
import { clearCollectionLoaders } from "../dataLoaders/collection";
import { clearModuleLoaders } from "../dataLoaders/module";
import { clearGroupLoaders } from "../dataLoaders/group";
import { clearCollectionTypeLoaders } from "../dataLoaders/collectionType";

type CreateTeacherReturnType<T extends Prisma.TeacherCreateArgs> = Prisma.Prisma__TeacherClient<
  GetResult<Prisma.$TeacherPayload, T, "create">,
  never
>;

export function createTeacher<T extends Prisma.TeacherCreateArgs>(args: T): CreateTeacherReturnType<T> {
  return prisma.teacher.create(args) as CreateTeacherReturnType<T>;
}

export async function deleteTeacher(id: string): Promise<Teacher> {
  const deletedTeacher = await prisma.teacher.delete({
    where: { id },
    include: {
      groups: {
        select: {
          id: true,
          teacherId: true,
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
              collectionTypes: {
                select: {
                  id: true,
                  moduleId: true,
                },
              },
            },
          },
          students: {
            select: {
              id: true,
              groupId: true,
            },
          },
        },
      },
    },
  });

  // Clear the DataLoader cache for this teacher
  clearTeacherLoaders(deletedTeacher);
  deletedTeacher.groups.forEach((group) => {
    clearGroupLoaders(group);
    group.modules.forEach((module) => {
      module.collectionTypes.forEach((collectionType) => {
        clearCollectionTypeLoaders(collectionType);
      });
      clearModuleLoaders(module);
      module.evaluationCollections.forEach((collection) => {
        clearCollectionLoaders(collection);
        collection.evaluations.forEach((evaluation) => {
          clearEvaluationLoaders(evaluation);
        });
      });
    });
    group.students.forEach((student) => {
      clearStudentLoaders(student);
    });
  });

  return deletedTeacher;
}

type UpdateTeacherReturnType<T extends Prisma.TeacherUpdateArgs> = GetResult<Prisma.$TeacherPayload, T, "update">;

export async function updateTeacher<T extends Prisma.TeacherUpdateArgs>(id: string, args: Omit<T, "where">): Promise<UpdateTeacherReturnType<T>> {
  const updatedTeacher = (await prisma.teacher.update({
    ...args,
    where: { id },
  })) as UpdateTeacherReturnType<T>;

  // Clear the DataLoader cache for this teacher
  await clearTeacherLoadersById(id);

  return updatedTeacher;
}
