import { CollectionType } from "@prisma/client";
import prisma from "../../prismaClient";
import CustomDataLoader from "./CustomDataLoader";
import NotFoundError from "../../errors/NotFoundError";

export type ClearCollectionTypeLoadersArgs = Pick<CollectionType, "id" | "moduleId">;

export const clearCollectionTypeLoaders = (args: ClearCollectionTypeLoadersArgs) => {
  collectionTypeLoader.clear(args.id);
  collectionTypesByModuleLoader.clear(args.moduleId);
};

export const clearCollectionTypeLoadersByModule = async (moduleId: string) => {
  const collectionTypes = await collectionTypesByModuleLoader.load(moduleId);

  for (const collectionType of collectionTypes) {
    collectionTypeLoader.clear(collectionType.id);
  }
  collectionTypesByModuleLoader.clear(moduleId);
};

export const clearCollectionTypeLoadersById = async (collectionTypeId: string) => {
  const collectionType = await collectionTypeLoader.load(collectionTypeId);
  if (collectionType) {
    clearCollectionTypeLoaders(collectionType);
  }
};

export const collectionTypesByModuleLoader = new CustomDataLoader<string, CollectionType[]>(async (groupIds) => {
  const collectionTypes = await prisma.collectionType.findMany({
    where: {
      moduleId: {
        in: [...groupIds],
      },
    },
  });

  const collectionTypesMap: Record<string, CollectionType[]> = {};

  for (const collectionType of collectionTypes) {
    if (!collectionTypesMap[collectionType.moduleId]) {
      collectionTypesMap[collectionType.moduleId] = [];
    }
    collectionTypesMap[collectionType.moduleId].push(collectionType);
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
  collectionTypesByModuleLoader,
};
