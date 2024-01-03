import { Evaluation } from "@prisma/client";
import prisma from "../../prismaClient";
import CustomDataLoader from "./CustomDataLoader";
import NotFoundError from "../../errors/NotFoundError";

export type ClearEvaluationLoadersArgs = Pick<Evaluation, "id" | "evaluationCollectionId">;

export const clearEvaluationLoaders = (args: ClearEvaluationLoadersArgs) => {
  evaluationLoader.clear(args.id);
  evaluationsByCollectionLoader.clear(args.evaluationCollectionId);
};

export const clearEvaluationLoadersByCollection = async (collectionId: string) => {
  const evaluations = await evaluationsByCollectionLoader.load(collectionId);

  for (const evaluation of evaluations) {
    evaluationLoader.clear(evaluation.id);
  }
  evaluationsByCollectionLoader.clear(collectionId);
};

export const clearEvaluationLoadersById = async (id: string) => {
  const evaluation = await evaluationLoader.load(id);
  if (evaluation) {
    clearEvaluationLoaders(evaluation);
  }
};

export const evaluationsByCollectionLoader = new CustomDataLoader<string, Evaluation[]>(async (collectionIds) => {
  const evaluations = await prisma.evaluation.findMany({
    where: {
      evaluationCollectionId: {
        in: [...collectionIds],
      },
    },
  });

  const evaluationsMap: Record<string, Evaluation[]> = {};

  for (const evaluation of evaluations) {
    if (!evaluationsMap[evaluation.evaluationCollectionId]) {
      evaluationsMap[evaluation.evaluationCollectionId] = [];
    }
    evaluationsMap[evaluation.evaluationCollectionId].push(evaluation);
  }

  return collectionIds.map((id) => evaluationsMap[id] || []);
});

export const evaluationLoader = new CustomDataLoader<string, Evaluation>(async (ids) => {
  const evaluations = await prisma.evaluation.findMany({
    where: {
      id: {
        in: [...ids],
      },
    },
  });

  const evaluationMap: Record<string, Evaluation> = {};

  for (const evaluation of evaluations) {
    evaluationMap[evaluation.id] = evaluation;
  }

  return ids.map((id) => evaluationMap[id] || new NotFoundError());
});

export default {
  evaluationLoader,
  evaluationsByCollectionLoader,
};
