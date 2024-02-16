import AuthenticationError from "../errors/AuthenticationError";
import prisma from "@/prismaClient";
import { CustomContext } from "../../types/contextTypes";
import { groupLoader } from "../dataLoaders/group";

type User = CustomContext["user"];

export const checkAuthenticatedByGroup = async (user: User, groupId: string) => {
  if (!user) throw new AuthenticationError();
  const matchingGroup = await groupLoader.load(groupId);
  if (matchingGroup.teacherId !== user.id) throw new AuthenticationError("Haettu ryhmä ei kuulu sinulle");
};

export const checkAuthenticatedByCollection = async (user: User, collectionId: string) => {
  if (!user) throw new AuthenticationError();

  const matchingGroup = await prisma.group.findFirstOrThrow({
    where: {
      modules: {
        some: {
          evaluationCollections: {
            some: {
              id: collectionId,
            },
          },
        },
      },
    },
    select: {
      teacherId: true,
    },
  });

  if (matchingGroup.teacherId !== user.id) throw new AuthenticationError("Haettu arviointikokoelma ei kuulu sinulle");
};

export const checkAuthenticatedByType = async (user: User, typeId: string) => {
  if (!user) throw new AuthenticationError();

  const matchingGroup = await prisma.group.findFirstOrThrow({
    where: {
      currentModule: {
        collectionTypes: {
          some: {
            id: typeId,
          },
        },
      },
    },
    select: {
      teacherId: true,
    },
  });

  if (matchingGroup.teacherId !== user.id) throw new AuthenticationError("Haettu arviointisisältö ei kuulu sinulle");
};

export const checkAuthenticatedByStudent = async (user: User, studentId: string) => {
  if (!user) throw new AuthenticationError();
  const matchingGroup = await prisma.group.findFirstOrThrow({
    where: {
      students: {
        some: {
          id: studentId,
        },
      },
    },
    select: {
      teacherId: true,
    },
  });
  if (matchingGroup.teacherId !== user.id) throw new AuthenticationError("Haettu oppilas ei kuulu sinun oppilaisiin");
};

export const checkAuthenticatedByEvaluation = async (user: User, evaluationId: string) => {
  if (!user) throw new AuthenticationError();
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
    select: {
      teacherId: true,
    },
  });
  if (matchingGroup.teacherId !== user.id) throw new AuthenticationError("Haettu arviointi ei kuulu sinulle");
};

export const checkAuthenticatedByTeacher = (user: User, teacherId: string) => {
  if (!user) throw new AuthenticationError();
  if (user.id !== teacherId) throw new AuthenticationError("Et voi hakea muiden opettajien tietoja kuin omiasi");
};
