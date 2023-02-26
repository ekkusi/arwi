import { Prisma } from "@prisma/client";
import { compare, hash } from "bcrypt";
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
  createClass: async (_, { data }, { prisma }) => {
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
