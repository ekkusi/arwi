import { CollectionType } from "@prisma/client";
import prisma from "../../prismaClient";
import CustomDataLoader from "./CustomDataLoader";
import NotFoundError from "../../errors/NotFoundError";

export type ClearCollectionTypeLoadersArgs = Pick<CollectionType, "id" | "groupId">;

export const clearCollectionTypeLoaders = (args: ClearCollectionTypeLoadersArgs) => {
  collectionTypeLoader.clear(args.id);
  collectionTypesByGroupLoader.clear(args.groupId);
};

export const clearCollectionTypeLoadersByGroup = async (groupId: string) => {
  const collectionTypes = await collectionTypesByGroupLoader.load(groupId);

  for (const collectionType of collectionTypes) {
    collectionTypeLoader.clear(collectionType.id);
  }
  collectionTypesByGroupLoader.clear(groupId);
};

export const clearCollectionTypeLoadersById = async (collectionTypeId: string) => {
  const collectionType = await collectionTypeLoader.load(collectionTypeId);
  if (collectionType) {
    clearCollectionTypeLoaders(collectionType);
  }
};

export const collectionTypesByGroupLoader = new CustomDataLoader<string, CollectionType[]>(async (groupIds) => {
  const collectionTypes = await prisma.collectionType.findMany({
    where: {
      groupId: {
        in: [...groupIds],
      },
    },
  });

  const collectionTypesMap: Record<string, CollectionType[]> = {};

  for (const collectionType of collectionTypes) {
    if (!collectionTypesMap[collectionType.groupId]) {
      collectionTypesMap[collectionType.groupId] = [];
    }
    collectionTypesMap[collectionType.groupId].push(collectionType);
  }

  return groupIds.map((id) => collectionTypesMap[id] || []);
});

export const collectionTypeLoader = new CustomDataLoader<string, CollectionType>(async (ids) => {
  const collectionTypes = await prisma.collectionType.findMany({
    where: {
      id: {
        in: [...ids],
      },
    },
  });

  const collectionTypeMap: Record<string, CollectionType> = {};

  for (const collectionType of collectionTypes) {
    collectionTypeMap[collectionType.id] = collectionType;
  }

  return ids.map((id) => collectionTypeMap[id] || new NotFoundError());
});

export default {
  collectionTypeLoader,
  collectionTypesByGroupLoader,
};
