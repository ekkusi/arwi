import { Prisma } from "@prisma/client";
import { MutationResolvers } from "../types";
import { CustomContext } from "../types/contextTypes";

const resolvers: MutationResolvers<CustomContext> = {
  createTeacher: async (_, { data }, { prisma }) => {
    const teacher = await prisma.teacher.create({
      data: {
        ...data,
      },
    });
    return teacher;
  },
  createClass: async (_, { data }, { prisma }) => {
    const createdClass = await prisma.class.create({
      data,
    });
    // prisma.evaluationCollection.create({
    //   data: {
    //     evaluations: {
    //       createMany: {
    //         data: {}
    //       }
    //     }
    //   }
    // })
    return createdClass;
  },
  createCollection: async (_, { data, classId }, { prisma }) => {
    const { evaluations, ...rest } = data;
    const createdCollection = await prisma.evaluationCollection.create({
      data: {
        ...rest,
        classId,
        // Create evaluations if there are some in input
        evaluations: evaluations
          ? {
              createMany: {
                data: evaluations,
              },
            }
          : undefined,
      },
    });
    return createdCollection;
  },
  addEvaluations: async (_, { data, collectionId }, { prisma }) => {
    // TODO: Make separate mapper
    const dataWithCollectionIds = data.map<Prisma.EvaluationCreateManyInput>(
      (it) => ({
        ...it,
        evaluationCollectionId: collectionId,
      })
    );
    const evaluations = await prisma.evaluation.createMany({
      data: dataWithCollectionIds,
    });
    return evaluations.count;
  },
};

export default resolvers;
