import { Prisma } from "@prisma/client";
import { GetResult } from "@prisma/client/runtime/library";
import prisma from "../../prismaClient";
import { feedbacksLoader } from "../dataLoaders/feedback";

type CreateFeedbackReturnType<T extends Prisma.FeedbackCreateArgs> = GetResult<Prisma.$FeedbackPayload, T, "create">;

export async function createFeedback<T extends Prisma.FeedbackCreateArgs>(args: T): Promise<CreateFeedbackReturnType<T>> {
  const createdFeedback = (await prisma.feedback.create(args)) as CreateFeedbackReturnType<T>;

  // Clear the DataLoader cache for this module
  feedbacksLoader.clear({ studentId: createdFeedback.studentId, moduleId: createdFeedback.moduleId });

  return createdFeedback;
}
