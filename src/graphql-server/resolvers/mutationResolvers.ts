import revalidateIfProd from "@/utils/revalidate";
import { compare, hash } from "bcryptjs";
import ValidationError from "../errors/ValidationError";
import { MutationResolvers } from "../types";
import { CustomContext } from "../types/contextTypes";

const BRCRYPT_SALT_ROUNDS = 12;

const resolvers: MutationResolvers<CustomContext> = {
  register: async (_, { data }, { prisma }) => {
    const { password, email } = data;
    const matchingTeacher = await prisma.teacher.findFirst({
      where: { email },
    });
    if (matchingTeacher)
      throw new ValidationError(`Sähköposti '${email}' on jo käytössä`);
    const passwordHash = await hash(password, BRCRYPT_SALT_ROUNDS);
    const teacher = await prisma.teacher.create({
      data: {
        email,
        passwordHash,
      },
    });
    return teacher;
  },
  login: async (_, { email, password }, { prisma }) => {
    const matchingTeacher = await prisma.teacher.findFirst({
      where: { email },
    });
    if (!matchingTeacher)
      throw new ValidationError(
        `Käyttäjää ei löytynyt sähköpostilla '${email}'`
      );
    const isValidPassword = await compare(
      password,
      matchingTeacher.passwordHash
    );
    if (!isValidPassword)
      throw new ValidationError(`Annettu salasana oli väärä.`);
    return {
      teacher: matchingTeacher,
    };
  },
  createClass: async (_, { data }, { prisma, res }) => {
    const { students, ...rest } = data;
    const createdClass = await prisma.class.create({
      data: {
        ...rest,
        students: students
          ? {
              createMany: { data: students },
            }
          : undefined,
      },
    });

    await revalidateIfProd(res, `/${createdClass.teacherId}`);
    return createdClass;
  },
  createCollection: async (_, { data, classId }, { prisma, res }) => {
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
    // TODO: teacher info should probably come from context
    const teacher = await prisma.teacher.findFirstOrThrow({
      where: { class: { some: { id: classId } } },
    });
    await revalidateIfProd(res, `/${teacher.id}/class/${classId}`);
    return createdCollection;
  },
  updateEvaluations: async (_, { data, collectionId }, { prisma, res }) => {
    const promises = data.map((it) => {
      const { id, ...rest } = it;
      return prisma.evaluation.update({
        where: { id },
        data: {
          ...rest,
          evaluationCollectionId: collectionId,
        },
      });
    });
    const results = await Promise.all(promises);

    // TODO: teacher info should probably come from context
    const teacher = await prisma.teacher.findFirstOrThrow({
      where: {
        class: {
          some: { evaluationCollections: { some: { id: collectionId } } },
        },
      },
    });
    await revalidateIfProd(res, `/${teacher.id}/collection/${collectionId}`);

    return results.length;
  },
};

export default resolvers;
