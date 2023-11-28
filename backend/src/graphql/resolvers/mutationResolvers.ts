import { compare, hash } from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { getEnvironment } from "../../utils/subjectUtils";
import { fixTextGrammatics, generateStudentSummary } from "../../utils/openAI";
import ValidationError from "../../errors/ValidationError";
import { MutationResolvers } from "../../types";
import { CustomContext } from "../../types/contextTypes";
import { mapUpdateCollectionInput, mapUpdateEvaluationInput, mapUpdateGroupInput, mapUpdateStudentInput } from "../utils/mappers";
import {
  REQUEST_PASSWORD_RESET_EXPIRY_IN_MS,
  validateChangeGroupLevelInput,
  validateCreateCollectionInput,
  validateCreateGroupInput,
  validateCreateStudentInput,
  validatePasswordResetCode,
  validateRegisterInput,
  validateRequestPasswordReset,
  validateUpdateCollectionInput,
  validateUpdateEvaluationsInput,
  validateUpdateStudentInput,
} from "../utils/validators";
import { updateEvaluation } from "../utils/resolverUtils";
import {
  checkAuthenticatedByCollection,
  checkAuthenticatedByEvaluation,
  checkAuthenticatedByGroup,
  checkAuthenticatedByStudent,
} from "../utils/auth";
import { initSession, logOut } from "../../utils/auth";
import { grantAndInitSession, grantToken } from "../../routes/auth";
import { generateCode } from "../../utils/passwordRecovery";
import { sendMail } from "../../utils/mail";
import { BRCRYPT_SALT_ROUNDS, MATOMO_EVENT_CATEGORIES } from "../../config";
import matomo from "../../matomo";

const resolvers: MutationResolvers<CustomContext> = {
  register: async (_, { data }, { prisma, req }) => {
    const { password, ...rest } = data;
    await validateRegisterInput(data);
    const passwordHash = await hash(password, BRCRYPT_SALT_ROUNDS);
    const teacher = await prisma.teacher.create({
      data: {
        passwordHash,
        ...rest,
      },
    });
    initSession(req, { ...teacher, type: "local" });
    return {
      userData: teacher,
    };
  },
  login: async (_, { email, password }, { prisma, req }) => {
    const matchingTeacher = await prisma.teacher.findFirst({
      where: { email },
    });
    const wrongCredentialsError = new ValidationError(`Annettu sähköposti tai salasana oli virheellinen.`);
    if (!matchingTeacher) throw wrongCredentialsError;
    if (!matchingTeacher.passwordHash || !matchingTeacher.email) throw new ValidationError(`Käyttäjällä ei ole sähköpostikirjautumista käytössä.`);
    const isValidPassword = await compare(password, matchingTeacher.passwordHash);
    if (!isValidPassword) throw wrongCredentialsError;
    initSession(req, { ...matchingTeacher, type: "local" });
    return {
      userData: matchingTeacher,
    };
  },
  mPassIDLogin: async (_, { code }, { req, OIDCClient }) => {
    if (process.env.NODE_ENV === "production") throw new Error("This endpoint is not available in production");
    if (!OIDCClient) throw new Error("Something went wrong, OIDC client is not initialized");

    const { isNewUser, user } = await grantAndInitSession(OIDCClient, code, req);
    return {
      payload: {
        userData: user,
      },
      newUserCreated: isNewUser,
    };
  },
  connectMPassID: async (_, { code }, { req, OIDCClient, user, prisma }) => {
    if (process.env.NODE_ENV === "production") throw new Error("This endpoint is not available in production");
    const currentUser = user!; // Safe cast after authenticated check
    if (!OIDCClient) throw new Error("Something went wrong, OIDC client is not initialized");
    if (currentUser.mPassID) throw new ValidationError("Tilisi on jo liitetty mpass-id tunnuksiin");
    const { userInfo, tokenSet } = await grantToken(OIDCClient, code);
    if (userInfo.mPassID) throw new Error("Something went wrong, mpass-id not found from user after grant");
    const matchingUser = await prisma.teacher.findFirst({ where: { mPassID: userInfo.sub } });
    if (matchingUser?.email) throw new ValidationError("Kyseinen mpass-id on jo liitetty toiseen käyttäjään");

    // If there is already an existing user with the mpass-id, merge it to the current user
    if (matchingUser) {
      // Update all groups where old user was teacher to new user
      await prisma.group.updateMany({
        where: {
          teacherId: matchingUser.id,
        },
        data: {
          teacherId: currentUser.id,
        },
      });
      // Delete old user
      await prisma.teacher.delete({
        where: {
          id: matchingUser.id,
        },
      });
    }
    const updatedUser = await prisma.teacher.update({
      where: {
        id: currentUser.id,
      },
      data: {
        mPassID: userInfo.sub,
      },
    });
    req.session.userInfo = updatedUser;
    req.session.tokenSet = tokenSet;
    return {
      userData: updatedUser,
    };
  },
  connectLocalCredentials: async (_, { email, password }, { req, prisma, user }) => {
    if (process.env.NODE_ENV === "production") throw new Error("This endpoint is not available in production");
    const currentUser = user!; // Safe cast after authenticated check
    if (currentUser.email) throw new ValidationError("Tilisi on jo liitetty lokaaleihin tunnuksiin");
    if (!currentUser.mPassID) throw new ValidationError("Sinun tulee olla kirjautunut mpass-id tunnuksilla liittääksesi lokaalit tunnukset");
    const matchingTeacher = await prisma.teacher.findFirst({
      where: { email },
    });
    if (!matchingTeacher) throw new ValidationError(`Käyttäjää ei löytynyt sähköpostilla '${email}'`);
    if (matchingTeacher.mPassID) throw new ValidationError(`Käyttäjä on jo liitetty mpass-id tunnuksiin`);
    if (!matchingTeacher.passwordHash || !matchingTeacher.email) throw new ValidationError(`Käyttäjällä ei ole sähköpostikirjautumista käytössä.`);
    const isValidPassword = await compare(password, matchingTeacher.passwordHash);
    if (!isValidPassword) throw new ValidationError(`Annettu salasana oli väärä.`);
    // Update all groups where old user was teacher to new user
    await prisma.group.updateMany({
      where: {
        teacherId: matchingTeacher.id,
      },
      data: {
        teacherId: currentUser.id,
      },
    });
    // Delete local credentials user
    await prisma.teacher.delete({
      where: {
        id: matchingTeacher.id,
      },
    });
    // Update old user with new credentials
    const updatedUser = await prisma.teacher.update({
      where: {
        id: currentUser.id,
      },
      data: {
        email: matchingTeacher.email,
        passwordHash: matchingTeacher.passwordHash,
      },
    });
    req.session.userInfo = updatedUser;
    return {
      userData: updatedUser,
    };
  },
  logout: async (_, __, { req, res }) => {
    await logOut(req, res);
    return true;
  },
  requestPasswordReset: async (_, { email }, { prisma, req }) => {
    const code = generateCode(6);
    const matchingTeacher = await prisma.teacher.findFirst({
      where: { email },
    });
    if (matchingTeacher) {
      let updatePromise;
      if (
        !matchingTeacher.passwordResetStartedAt ||
        matchingTeacher.passwordResetStartedAt.getTime() + REQUEST_PASSWORD_RESET_EXPIRY_IN_MS < Date.now()
      ) {
        // If there is no password reset started or the started at time is expired, reset the started at time
        updatePromise = prisma.teacher.update({
          where: { id: matchingTeacher.id },
          data: {
            passwordResetStartedAt: new Date(),
            passwordResetTries: 1,
          },
        });
      } else {
        // If there is already a password reset started and it hasn't expired, only update the amount of tries
        updatePromise = prisma.teacher.update({
          where: { id: matchingTeacher.id },
          data: {
            passwordResetTries: matchingTeacher.passwordResetTries + 1,
          },
        });
      }
      const updatedTeacher = await updatePromise;

      // Validate request after update to make sure started at date is set correctly
      await validateRequestPasswordReset(updatedTeacher);

      await sendMail(
        email,
        "Salasanan palautus",
        `Olet pyytänyt salasanan palautusta Arwi-sovellukseen. Käytä alla olevaa koodia salasanan palautukseen.
         Sinulla on 5 minuuttia aikaa ennen kuin koodi umpeutuu. <br /><br /> Koodi: <b>${code}</b><br /><br />
         Jos sinä et tehnyt kyseistä pyyntöä salasanan palautuksesta, suosittelemme ottamaan yhteyttä järjestelmänvalvontaan info@arwi.fi.`
      );

      matomo.trackEvent(MATOMO_EVENT_CATEGORIES.PASSWORD_RESET, "Request password reset", { userInfo: { uid: matchingTeacher.id } });

      req.session.recoveryCodeInfo = {
        userId: matchingTeacher.id,
        codeHash: await hash(code, BRCRYPT_SALT_ROUNDS),
        createdAt: Date.now(),
        amountsTried: 0,
      };
    }

    return true;
  },
  verifyPasswordResetCode: async (_, { code }, { req }) => {
    await validatePasswordResetCode(code, req.session);
    return true;
  },
  updatePassword: async (_, { newPassword, recoveryCode }, { prisma, req }) => {
    await validatePasswordResetCode(recoveryCode, req.session);
    const matchingTeacher = await prisma.teacher.findUnique({
      where: { id: req.session.recoveryCodeInfo?.userId },
    });
    if (!matchingTeacher) throw new Error("Unexpected error, teacher not found with recovery code info");
    await prisma.teacher.update({
      where: { id: matchingTeacher.id },
      data: {
        passwordHash: await hash(newPassword, BRCRYPT_SALT_ROUNDS),
      },
    });
    matomo.trackEvent(MATOMO_EVENT_CATEGORIES.PASSWORD_RESET, "Password updated", { userInfo: { uid: matchingTeacher.id } });
    // Clear recovery code info from session to prevent further use
    req.session.recoveryCodeInfo = undefined;
    return true;
  },
  createGroup: async (_, { data }, { prisma }) => {
    await validateCreateGroupInput(data);
    const { students: studentInputs, educationLevel, learningObjectiveGroupKey, collectionTypes, ...rest } = data;
    const groupId = uuidv4();
    const moduleId = uuidv4();
    const groupCreate = prisma.group.create({
      data: {
        ...rest,
        id: groupId,
        currentModuleId: moduleId,
        collectionTypes: {
          createMany: {
            data: collectionTypes,
          },
        },
      },
    });
    const moduleCreate = prisma.module.create({
      data: {
        id: moduleId,
        educationLevel,
        learningObjectiveGroupKey,
        groupId,
        students: {
          create: studentInputs.map((it) => ({
            groupId,
            ...it,
          })),
        },
      },
    });
    const [group] = await prisma.$transaction([groupCreate, moduleCreate]);
    return group;
  },
  createCollection: async (_, { data, moduleId }, { prisma }) => {
    await validateCreateCollectionInput(data, moduleId);
    const { evaluations, ...rest } = data;
    const createdCollection = await prisma.evaluationCollection.create({
      data: {
        ...rest,
        moduleId,
        // Create evaluations if there are some in input
        evaluations: evaluations
          ? {
              createMany: {
                data: evaluations.map((it) => ({
                  ...it,
                  isStellar: it.isStellar === null ? undefined : it.isStellar,
                })),
              },
            }
          : undefined,
      },
    });
    // Should always only find one group, updateMany only here because of typescript constraint
    await prisma.group.updateMany({
      data: {
        updatedAt: new Date(),
      },
      where: {
        modules: {
          some: {
            id: moduleId,
          },
        },
      },
    });
    return createdCollection;
  },
  createStudent: async (_, { data, moduleId }, { prisma }) => {
    await validateCreateStudentInput(data, moduleId);
    const module = await prisma.module.findUniqueOrThrow({
      where: { id: moduleId },
    });
    const createdStudent = await prisma.student.create({
      data: {
        ...data,
        groupId: module.groupId,
        modules: {
          connect: { id: moduleId },
        },
      },
    });
    return createdStudent;
  },
  updateEvaluations: async (_, { data, collectionId }, { prisma, user }) => {
    await checkAuthenticatedByCollection(user, collectionId);
    await validateUpdateEvaluationsInput(data, collectionId);
    await prisma.evaluationCollection.update({
      data: {
        evaluations: {
          update: data.map((it) => ({
            data: mapUpdateEvaluationInput(it),
            where: {
              id: it.id,
            },
          })),
        },
      },
      where: { id: collectionId },
    });
    return data.length;
  },
  updateEvaluation: async (_, { data }, { user }) => {
    await checkAuthenticatedByEvaluation(user, data.id);
    const updatedEvaluation = await updateEvaluation(data);
    return updatedEvaluation;
  },
  updateCollection: async (_, { data, collectionId }, { prisma, user }) => {
    await checkAuthenticatedByCollection(user, collectionId);
    await validateUpdateCollectionInput(data, collectionId);
    const { evaluations, ...rest } = data;
    const updatedCollection = await prisma.evaluationCollection.update({
      data: {
        ...mapUpdateCollectionInput(rest),
        evaluations: evaluations
          ? {
              update: evaluations.map((it) => ({
                data: mapUpdateEvaluationInput(it),
                where: {
                  id: it.id,
                },
              })),
            }
          : undefined,
      },
      where: { id: collectionId },
    });
    return updatedCollection;
  },
  updateStudent: async (_, { data, studentId }, { prisma, user }) => {
    await checkAuthenticatedByStudent(user, studentId);
    await validateUpdateStudentInput(data, studentId);
    const updatedStudent = await prisma.student.update({
      where: { id: studentId },
      data: mapUpdateStudentInput(data),
    });
    return updatedStudent;
  },
  updateGroup: async (_, { data, groupId }, { prisma, user }) => {
    await checkAuthenticatedByGroup(user, groupId);
    const updatedGroup = await prisma.group.update({
      where: { id: groupId },
      data: mapUpdateGroupInput(data),
    });
    return updatedGroup;
  },
  deleteStudent: async (_, { studentId }, { prisma, user }) => {
    await checkAuthenticatedByStudent(user, studentId);
    const student = await prisma.student.delete({
      where: { id: studentId },
    });
    return student;
  },
  deleteGroup: async (_, { groupId }, { prisma, user }) => {
    await checkAuthenticatedByGroup(user, groupId);
    const group = await prisma.group.delete({
      where: { id: groupId },
    });
    return group;
  },
  deleteCollection: async (_, { collectionId }, { prisma, user }) => {
    await checkAuthenticatedByCollection(user, collectionId);
    const collection = await prisma.evaluationCollection.delete({
      where: { id: collectionId },
    });
    return collection;
  },
  changeGroupModule: async (_, { data, groupId }, { prisma, user }) => {
    await checkAuthenticatedByGroup(user, groupId);
    await validateChangeGroupLevelInput(data, groupId);
    let newYear = await prisma.module.findFirst({
      where: { groupId, educationLevel: data.newEducationLevel, learningObjectiveGroupKey: data.newLearningObjectiveGroupKey },
    });
    const group = await prisma.group.findUniqueOrThrow({
      where: { id: groupId },
    });
    if (!newYear) {
      // Copy students from current year to new year
      const currentYearStudents = await prisma.student.findMany({
        where: {
          modules: {
            some: {
              id: group.currentModuleId,
            },
          },
        },
      });
      newYear = await prisma.module.create({
        data: {
          educationLevel: data.newEducationLevel,
          learningObjectiveGroupKey: data.newLearningObjectiveGroupKey,
          groupId,
          students: {
            connect: currentYearStudents.map((it) => ({ id: it.id })),
          },
        },
      });
    }
    const updatedGroup = await prisma.group.update({
      data: {
        currentModuleId: newYear.id,
      },
      where: { id: groupId },
    });
    return updatedGroup;
  },
  generateStudentFeedback: async (_, { studentId, moduleId }, { user, prisma }) => {
    await checkAuthenticatedByStudent(user, studentId);
    const student = await prisma.student.findUnique({
      where: { id: studentId },
    });
    if (!student) throw new Error(`Student with id ${studentId} not found`);
    const evaluations = await prisma.evaluation.findMany({
      where: {
        studentId,
        evaluationCollection: {
          moduleId,
        },
      },
      include: {
        evaluationCollection: {
          select: {
            environmentCode: true,
            date: true,
          },
        },
      },
    });
    const mappedEvaluations = evaluations.map((it) => ({
      ...it,
      environmentLabel: getEnvironment(it.evaluationCollection.environmentCode)?.label.fi,
      date: it.evaluationCollection.date,
    }));
    const summary = await generateStudentSummary(mappedEvaluations, user!.id); // Safe cast after authenticated check
    return summary;
  },
  fixTextGrammatics: async (_, { studentId, text }, { user }) => {
    await checkAuthenticatedByStudent(user, studentId);
    const summary = await fixTextGrammatics(text, user!.id); // Safe cast after authenticated check
    return summary;
  },
};

export default resolvers;
