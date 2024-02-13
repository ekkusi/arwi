import { EvaluationCollection } from "@prisma/client";
import prisma from "../../prismaClient";
import NotFoundError from "../../errors/NotFoundError";
import CustomDataLoader from "./CustomDataLoader";

export type ClearCollectionLoadersArgs = Pick<EvaluationCollection, "id" | "moduleId">;

export const clearCollectionLoaders = (args: ClearCollectionLoadersArgs) => {
  collectionLoader.clear(args.id);
  collectionsByModuleLoader.clear(args.moduleId);
};

export const clearCollectionLoadersByModule = async (moduleId: string) => {
  const collections = await collectionsByModuleLoader.load(moduleId);

  for (const collection of collections) {
    collectionLoader.clear(collection.id);
  }
  collectionsByModuleLoader.clear(moduleId);
};

export const clearCollectionLoadersById = async (id: string) => {
  const collection = await collectionLoader.load(id);
  if (collection) {
    clearCollectionLoaders(collection);
  }
};

export const collectionsByModuleLoader = new CustomDataLoader<string, EvaluationCollection[]>(async (moduleIds) => {
  const collections = await prisma.evaluationCollection.findMany({
    where: {
      moduleId: {
        in: [...moduleIds],
      },
    },
    orderBy: {
      date: "desc",
    },
  });

  const collectionsMap: Record<string, EvaluationCollection[]> = {};

  for (const collection of collections) {
    if (!collectionsMap[collection.moduleId]) {
      collectionsMap[collection.moduleId] = [];
    }
    collectionsMap[collection.moduleId].push(collection);
  }

  return moduleIds.map((id) => collectionsMap[id] || []);
});

export const collectionLoader = new CustomDataLoader<string, EvaluationCollection>(async (ids) => {
  const collections = await prisma.evaluationCollection.findMany({
    where: {
      id: {
        in: [...ids],
      },
    },
  });

  const collectionMap: Record<string, EvaluationCollection> = {};

  for (const collection of collections) {
    collectionMap[collection.id] = collection;
  }

  return ids.map((id) => collectionMap[id] || new NotFoundError());
});

export default {
  collectionLoader,
  collectionsByModuleLoader,
};
