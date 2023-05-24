import { ADMIN_USER } from "../config";
import AuthenticationError from "../errors/AuthenticationError";
import prisma from "../prismaClient";
import { CustomContext } from "../types/contextTypes";

type User = CustomContext["user"];

export const checkAuthenticatedByGroup = async (user: User, groupId: string) => {
  if (!user) throw new AuthenticationError();
  if (user.id === ADMIN_USER.id) return;
  const matchingGroup = await prisma.group.findUniqueOrThrow({
    where: {
      id: groupId,
    },
  });
  if (matchingGroup.teacherId !== user.id) throw new AuthenticationError("Haettu ryhmä ei kuulu sinulle");
};

export const checkAuthenticatedByCollection = async (user: User, collectionId: string) => {
  if (!user) throw new AuthenticationError();
  if (user.id === ADMIN_USER.id) return;
  const matchingGroup = await prisma.group.findFirstOrThrow({
    where: {
      classYears: {
        some: {
          evaluationCollections: {
            some: {
              id: collectionId,
            },
          },
        },
      },
    },
  });
  if (matchingGroup.teacherId !== user.id) throw new AuthenticationError("Haettu arviointikokoelma ei kuulu sinulle");
};

export const checkAuthenticatedByStudent = async (user: User, studentId: string) => {
  if (!user) throw new AuthenticationError();
  if (user.id === ADMIN_USER.id) return;
  const matchingGroup = await prisma.group.findFirstOrThrow({
    where: {
      students: {
        some: {
          id: studentId,
        },
      },
    },
  });
  if (matchingGroup.teacherId !== user.id) throw new AuthenticationError("Haettu oppilas ei kuulu sinun oppilaisiin");
};

export const checkAuthenticatedByEvaluation = async (user: User, evaluationId: string) => {
  if (!user) throw new AuthenticationError();
  if (user.id === ADMIN_USER.id) return;
  const matchingGroup = await prisma.group.findFirstOrThrow({
    where: {
      students: {
        some: {
          evaluations: {
            some: {
              id: evaluationId,
            },
          },
        },
      },
    },
  });
  if (matchingGroup.teacherId !== user.id) throw new AuthenticationError("Haettu arviointi ei kuulu sinulle");
};

export const checkAuthenticatedByTeacher = (user: User, teacherId: string) => {
  if (!user) throw new AuthenticationError();
  if (user.id === ADMIN_USER.id) return;
  if (user.id !== teacherId) throw new AuthenticationError("Et voi hakea muiden opettajien tietoja kuin omiasi");
};
