import { EvaluationCollection, Prisma } from "@prisma/client";
import { GetResult } from "@prisma/client/runtime/library";
import prisma from "../../prismaClient";
import { clearCollectionLoaders, clearCollectionLoadersById, clearCollectionLoadersByModule } from "../dataLoaders/collection";
import { clearEvaluationLoaders, clearEvaluationLoadersById } from "../dataLoaders/evaluation";
import { UpdateClassParticipationEvaluationInput, UpdateDefaultEvaluationInput } from "../../types";
import { mapUpdateClassParticipationEvaluationInput, mapUpdateDefaultEvaluationInput } from "../utils/mappers";

type CreateCollectionReturnType<T extends Prisma.EvaluationCollectionCreateArgs> = GetResult<Prisma.$EvaluationCollectionPayload, T, "create">;

export async function createCollection<T extends Prisma.EvaluationCollectionCreateArgs>(
  moduleId: string,
  args: T
): Promise<CreateCollectionReturnType<T>> {
  const createdCollection = (await prisma.evaluationCollection.create(args)) as CreateCollectionReturnType<T>;

  // Clear the DataLoader cache for this collection
  await clearCollectionLoadersByModule(moduleId);

  return createdCollection;
}

export async function deleteCollection(id: string): Promise<EvaluationCollection> {
  const deletedCollection = await prisma.evaluationCollection.delete({
    where: { id },
    include: {
      evaluations: {
        select: { id: true, evaluationCollectionId: true },
      },
    },
  });

  // Clear the DataLoader cache for this collection
  clearCollectionLoaders(deletedCollection);
  deletedCollection.evaluations.forEach((evaluation) => clearEvaluationLoaders(evaluation));

  return deletedCollection;
}

type EvaluationCollectionUpdateInput = Prisma.EvaluationCollectionUpdateInput | Prisma.EvaluationCollectionUncheckedUpdateInput;

type UpdateCollectionWithoutEvaluations = Omit<Prisma.EvaluationCollectionUpdateArgs, "data"> & {
  data?: Omit<EvaluationCollectionUpdateInput, "evaluations">;
};

type UpdateCollectionReturnType<T extends UpdateCollectionWithoutEvaluations> = GetResult<Prisma.$EvaluationCollectionPayload, T, "update">;

export async function clearUpdateLoaders(collectionId: string, evaluations?: { id: string }[]): Promise<void> {
  const evaluationLoaderClearPromises = evaluations?.map((it) => clearEvaluationLoadersById(it.id)) || [];
  await Promise.all([clearCollectionLoadersById(collectionId), ...evaluationLoaderClearPromises]);
}

export async function updateClassParticipationCollection<T extends UpdateCollectionWithoutEvaluations>(
  id: string,
  args: Omit<T, "where">,
  evaluations?: UpdateClassParticipationEvaluationInput[]
): Promise<UpdateCollectionReturnType<T>> {
  const { data, ...rest } = args;

  const updateInput: EvaluationCollectionUpdateInput = {
    ...data,
    evaluations: {
      update: evaluations?.map((evaluation) => ({
        data: mapUpdateClassParticipationEvaluationInput(evaluation),
        where: { id: evaluation.id },
      })),
    },
  };

  const updatedCollection = (await prisma.evaluationCollection.update({
    ...rest,
    data: updateInput,
    where: { id },
  })) as UpdateCollectionReturnType<T>;

  // Clear the DataLoader cache for this collection
  await clearUpdateLoaders(id, evaluations);

  return updatedCollection;
}

export async function updateDefaultCollection<T extends UpdateCollectionWithoutEvaluations>(
  id: string,
  args: Omit<T, "where">,
  evaluations?: UpdateDefaultEvaluationInput[]
): Promise<UpdateCollectionReturnType<T>> {
  const { data, ...rest } = args;

  const updateInput: EvaluationCollectionUpdateInput = {
    ...data,
    evaluations: {
      update: evaluations?.map((evaluation) => ({
        data: mapUpdateDefaultEvaluationInput(evaluation),
        where: { id: evaluation.id },
      })),
    },
  };

  const updatedCollection = (await prisma.evaluationCollection.update({
    ...rest,
    data: updateInput,
    where: { id },
  })) as UpdateCollectionReturnType<T>;

  // Clear the DataLoader cache for this collection
  await clearUpdateLoaders(id, evaluations);

  return updatedCollection;
}
