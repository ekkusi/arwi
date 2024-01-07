import { CollectionType } from "@prisma/client";
import prisma from "../../prismaClient";
import { clearCollectionTypeLoaders } from "../dataLoaders/collectionType";
import { clearCollectionLoaders } from "../dataLoaders/collection";
import { clearEvaluationLoaders } from "../dataLoaders/evaluation";

// NOTE: This function is not used currently but is here for possible future use
export async function deleteCollectionType(id: string): Promise<CollectionType> {
  const collectionType = await prisma.collectionType.delete({
    where: { id },
    include: {
      collection: {
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
  });

  // Clear the DataLoader cache for this collectionType
  clearCollectionTypeLoaders(collectionType);
  collectionType.collection.forEach((collection) => {
    clearCollectionLoaders(collection);
    collection.evaluations.forEach((evaluation) => {
      clearEvaluationLoaders(evaluation);
    });
  });

  return collectionType;
}
