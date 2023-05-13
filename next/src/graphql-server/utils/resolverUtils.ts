import prisma from "../prismaClient";
import { UpdateEvaluationInput } from "../types";
import { mapUpdateEvaluationInput } from "./mappers";
import { validateUpdateEvaluationInput } from "./validators";

export const updateEvaluation = async (data: UpdateEvaluationInput) => {
  await validateUpdateEvaluationInput(data);
  return prisma.evaluation.update({
    where: { id: data.id },
    data: {
      ...mapUpdateEvaluationInput(data),
    },
  });
};
