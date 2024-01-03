import { Evaluation, Prisma } from "@prisma/client";
import { GetResult } from "@prisma/client/runtime/library";
import prisma from "../../prismaClient";
import { clearEvaluationLoaders, clearEvaluationLoadersById } from "../dataLoaders/evaluation";

type CreateEvaluationReturnType<T extends Prisma.EvaluationCreateArgs> = Prisma.Prisma__EvaluationClient<
  GetResult<Prisma.$EvaluationPayload, T, "create">,
  never
>;

export function createEvaluation<T extends Prisma.EvaluationCreateArgs>(args: T): CreateEvaluationReturnType<T> {
  return prisma.evaluation.create(args) as CreateEvaluationReturnType<T>;
}

export async function deleteEvaluation(id: string): Promise<Evaluation> {
  const deletedEvaluation = await prisma.evaluation.delete({
    where: { id },
  });

  // Clear the DataLoader cache for this evaluation
  clearEvaluationLoaders(deletedEvaluation);

  return deletedEvaluation;
}

type UpdateEvaluationReturnType<T extends Prisma.EvaluationUpdateArgs> = GetResult<Prisma.$EvaluationPayload, T, "update">;

export async function updateEvaluation<T extends Prisma.EvaluationUpdateArgs>(
  id: string,
  args: Omit<T, "where">
): Promise<UpdateEvaluationReturnType<T>> {
  const updatedEvaluation = (await prisma.evaluation.update({
    ...args,
    where: { id },
  })) as UpdateEvaluationReturnType<T>;

  // Clear the DataLoader cache for this evaluation
  await clearEvaluationLoadersById(id);

  return updatedEvaluation;
}
