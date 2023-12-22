import { EvaluationCollection, Prisma } from "@prisma/client";
import { GetResult } from "@prisma/client/runtime/library";
import prisma from "../../prismaClient";
import { clearCollectionLoaders, clearCollectionLoadersById, clearCollectionLoadersByModule } from "../dataLoaders/collection";
import { UpdateEvaluationInput } from "../../types";
import { mapUpdateEvaluationInput } from "../utils/mappers";
import { clearEvaluationLoaders, clearEvaluationLoadersById } from "../dataLoaders/evaluation";

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

const mapCollectionUpdateData = (
  data: Prisma.EvaluationCollectionUpdateInput,
  evaluations?: UpdateEvaluationInput[]
): EvaluationCollectionUpdateInput => {
  return {
    ...data,
    evaluations: {
      update: evaluations
        ? evaluations.map((evaluation) => ({
            where: { id: evaluation.id },
            data: mapUpdateEvaluationInput(evaluation),
          }))
        : undefined,
    },
  };
};

export async function updateCollection<T extends UpdateCollectionWithoutEvaluations>(
  id: string,
  args: Omit<T, "where">,
  evaluations?: UpdateEvaluationInput[]
): Promise<UpdateCollectionReturnType<T>> {
  const { data, ...rest } = args;

  const updatedCollection = (await prisma.evaluationCollection.update({
    ...rest,
    data: mapCollectionUpdateData(data || {}, evaluations),
    where: { id },
  })) as UpdateCollectionReturnType<T>;

  // Clear the DataLoader cache for this collection
  const evaluationLoaderClearPromises = (evaluations ?? []).map((evaluation) => clearEvaluationLoadersById(evaluation.id));
  await Promise.all([clearCollectionLoadersById(id), ...evaluationLoaderClearPromises]);

  return updatedCollection;
}
