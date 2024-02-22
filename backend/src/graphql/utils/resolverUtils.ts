import { Prisma } from "@prisma/client";
import { CreateClassParticipationCollectionInput, CreateDefaultCollectionInput } from "../../types";
import { createCollection } from "../mutationWrappers/collection";
import { updateGroupByModule } from "../mutationWrappers/group";
import { updateTeacher } from "../mutationWrappers/teacher";

// Data validations should be done before calling this function
export async function createCollectionAndUpdateGroup(
  data: Omit<CreateDefaultCollectionInput | CreateClassParticipationCollectionInput, "evaluations">,
  moduleId: string,
  evaluations?: Prisma.EvaluationCreateManyEvaluationCollectionInput[]
) {
  const createdCollection = await createCollection(moduleId, {
    data: {
      ...data,
      moduleId,
      // Create evaluations if there are some in input
      evaluations: evaluations
        ? {
            createMany: {
              data: evaluations,
            },
          }
        : undefined,
    },
    include: {
      module: true,
    },
  });
  // Should always only find one group, updateMany only here because of typescript constraint
  await updateGroupByModule(moduleId, createdCollection.module.groupId, {
    data: { updatedAt: new Date() },
  });

  return createdCollection;
}
