import { compare, hash } from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { getEnvironment } from "../../utils/subjectUtils";
import { fixTextGrammatics, generateStudentSummary } from "../../utils/openAI";
import ValidationError from "../../errors/ValidationError";
import { MutationResolvers } from "../../types";
import { CustomContext } from "../../types/contextTypes";
import {
  mapCreateClassParticipationEvaluationInput,
  mapCreateDefaultEvaluationInput,
  mapCreateTeacherInput,
  mapModuleInfo,
  mapUpdateClassParticipationCollectionInput,
  mapUpdateClassParticipationEvaluationInput,
  mapUpdateDefaultCollectionInput,
  mapUpdateDefaultEvaluationInput,
  mapUpdateGroupInput,
  mapUpdateStudentInput,
} from "../utils/mappers";
import {
  REQUEST_PASSWORD_RESET_EXPIRY_IN_MS,
  validateChangeGroupLevelInput,
  validateCreateClassParticipationCollectionInput,
  validateCreateDefaultCollectionInput,
  validateCreateGroupInput,
  validateCreateStudentInput,
  validateFixTextGrammaticsInput,
  validatePasswordResetCode,
  validateRegisterInput,
  validateRequestPasswordReset,
  validateUpdateClassParticipationCollectionInput,
  validateUpdateClassParticipationEvaluationInput,
  validateUpdateDefaultCollectionInput,
  validateUpdateDefaultEvaluationInput,
  validateUpdateGroupInput,
  validateUpdateStudentInput,
} from "../utils/validators";
import {
  checkAuthenticatedByCollection,
  checkAuthenticatedByEvaluation,
  checkAuthenticatedByGroup,
  checkAuthenticatedByStudent,
} from "../utils/auth";
import { initSession, logOut } from "../../utils/auth";
import { grantAndInitSession, grantToken } from "../../routes/auth";
import { generateCode } from "../../utils/passwordRecovery";
import { sendMail } from "@/utils/mail";
import { BRCRYPT_SALT_ROUNDS, MATOMO_EVENT_CATEGORIES } from "../../config";
import matomo from "../../matomo";
import { createTeacher, deleteTeacher, updateTeacher } from "../mutationWrappers/teacher";
import { deleteGroup, updateGroup, updateGroupMany } from "../mutationWrappers/group";
import { deleteCollection, updateClassParticipationCollection, updateDefaultCollection } from "../mutationWrappers/collection";
import { createStudent, deleteStudent, updateStudent } from "../mutationWrappers/student";
import { updateEvaluation } from "../mutationWrappers/evaluation";
import { createModule } from "../mutationWrappers/module";
import { createCollectionAndUpdateGroup } from "../utils/resolverUtils";

const resolvers: MutationResolvers<CustomContext> = {
  register: async (_, { data }, { req }) => {
    const { password } = data;
    const mappedData = {
      ...data,
      email: data.email.toLowerCase(),
    };
    await validateRegisterInput(mappedData);
    const passwordHash = await hash(password, BRCRYPT_SALT_ROUNDS);
    const teacher = await createTeacher({ data: mapCreateTeacherInput(mappedData, passwordHash) });

    initSession(req, { ...teacher, type: "local" });
    return {
      userData: teacher,
    };
  },
  login: async (_, { email: initialEmail, password }, { prisma, req }) => {
    const email = initialEmail.toLowerCase();
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
      await updateGroupMany(matchingUser.id, { data: { teacherId: currentUser.id } });
      // Delete old user
      await deleteTeacher(matchingUser.id);
    }

    const updatedUser = await updateTeacher(currentUser.id, { data: { mPassID: userInfo.sub } });
    req.session.userInfo = updatedUser;
    req.session.tokenSet = tokenSet;
    return {
      userData: updatedUser,
    };
  },
  connectLocalCredentials: async (_, { email: initialEmail, password }, { req, prisma, user }) => {
    const email = initialEmail.toLowerCase();
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
    await updateGroupMany(matchingTeacher.id, { data: { teacherId: currentUser.id } });
    // Delete local credentials user
    await deleteTeacher(matchingTeacher.id);
    // Update old user with new credentials
    const updatedUser = await updateTeacher(currentUser.id, { data: { email: matchingTeacher.email, passwordHash: matchingTeacher.passwordHash } });
    req.session.userInfo = updatedUser;
    return {
      userData: updatedUser,
    };
  },
  logout: async (_, __, { req, res }) => {
    await logOut(req, res);
    return true;
  },
  requestPasswordReset: async (_, { email: initialEmail }, { prisma, req }) => {
    const email = initialEmail.toLowerCase();
    const code = generateCode(6);
    const matchingTeacher = await prisma.teacher.findFirst({
      where: { email },
    });
    if (matchingTeacher) {
      let updatePromise;
      // If there is no password reset started or the started at time is expired, reset the started at time
      if (
        !matchingTeacher.passwordResetStartedAt ||
        matchingTeacher.passwordResetStartedAt.getTime() + REQUEST_PASSWORD_RESET_EXPIRY_IN_MS < Date.now()
      ) {
        updatePromise = updateTeacher(matchingTeacher.id, {
          data: {
            passwordResetStartedAt: new Date(),
            passwordResetTries: 1,
          },
        });
      } else {
        // If there is already a password reset started and it hasn't expired, only update the amount of tries
        updatePromise = updateTeacher(matchingTeacher.id, {
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
  updatePassword: async (_, { newPassword, recoveryCode }, { req, dataLoaders }) => {
    await validatePasswordResetCode(recoveryCode, req.session);
    if (!req.session.recoveryCodeInfo) throw new Error("Unexpected error, recovery code info not found from session");
    const matchingTeacher = await dataLoaders.teacherLoader.load(req.session.recoveryCodeInfo.userId);
    if (!matchingTeacher) throw new Error("Unexpected error, teacher not found with recovery code info");
    await updateTeacher(matchingTeacher.id, {
      data: {
        passwordHash: await hash(newPassword, BRCRYPT_SALT_ROUNDS),
      },
    });
    matomo.trackEvent(MATOMO_EVENT_CATEGORIES.PASSWORD_RESET, "Password updated", { userInfo: { uid: matchingTeacher.id } });
    // Clear recovery code info from session to prevent further use
    req.session.recoveryCodeInfo = undefined;
    return true;
  },
  createGroup: async (_, { data }, { prisma, dataLoaders }) => {
    await validateCreateGroupInput(data);
    const { students: studentInputs, educationLevel, learningObjectiveGroupKey, collectionTypes, ...rest } = data;
    const groupId = uuidv4();
    const moduleId = uuidv4();

    const groupCreate = prisma.group.create({
      data: {
        ...rest,
        id: groupId,
        currentModuleId: moduleId,
      },
    });
    const moduleCreate = prisma.module.create({
      data: {
        id: moduleId,
        educationLevel,
        learningObjectiveGroupKey,
        groupId,
        collectionTypes: {
          createMany: {
            data: collectionTypes,
          },
        },
        students: {
          create: studentInputs.map((it) => ({
            groupId,
            ...it,
          })),
        },
      },
    });
    const [group] = await prisma.$transaction([groupCreate, moduleCreate]);

    // Clear loaders (necesssary here because of prisma modifications done by transaction and not the wrappers)
    dataLoaders.groupsByTeacherLoader.clear(data.teacherId);
    dataLoaders.modulesByGroupLoader.clear(groupId);

    return group;
  },
  createDefaultCollection: async (_, { data, moduleId }) => {
    await validateCreateDefaultCollectionInput(data);
    const { evaluations, ...rest } = data;
    const evaluationsInput = evaluations ? evaluations.map((it) => mapCreateDefaultEvaluationInput(it)) : undefined;
    return createCollectionAndUpdateGroup(rest, moduleId, evaluationsInput);
  },
  createClassParticipationCollection: async (_, { data, moduleId }) => {
    await validateCreateClassParticipationCollectionInput(data, moduleId);
    const { evaluations, ...rest } = data;
    const evaluationsInput = evaluations ? evaluations.map((it) => mapCreateClassParticipationEvaluationInput(it)) : undefined;
    return createCollectionAndUpdateGroup(rest, moduleId, evaluationsInput);
  },
  createStudent: async (_, { data, moduleId }, { dataLoaders }) => {
    await validateCreateStudentInput(data, moduleId);
    const module = await dataLoaders.moduleLoader.load(moduleId);
    const collections = await dataLoaders.collectionsByModuleLoader.load(moduleId);

    const createdStudent = await createStudent(module.groupId, {
      data: {
        ...data,
        groupId: module.groupId,
        modules: {
          connect: { id: moduleId },
        },
        evaluations: {
          create: collections.map((col) => ({
            evaluationCollectionId: col.id,
            wasPresent: false,
          })),
        },
      },
    });
    // Clear loaders for the collections that the evaluations were made to
    collections.forEach((it) => {
      dataLoaders.evaluationsByCollectionLoader.clear(it.id);
    });
    return createdStudent;
  },
  updateClassParticipationEvaluation: async (_, { input }, { user }) => {
    await checkAuthenticatedByEvaluation(user, input.id);
    await validateUpdateClassParticipationEvaluationInput(input);
    const updatedEvaluation = await updateEvaluation(input.id, { data: mapUpdateClassParticipationEvaluationInput(input) });
    return updatedEvaluation;
  },
  updateDefaultEvaluation: async (_, { input }, { user }) => {
    await checkAuthenticatedByEvaluation(user, input.id);
    await validateUpdateDefaultEvaluationInput(input);
    const updatedEvaluation = await updateEvaluation(input.id, { data: mapUpdateDefaultEvaluationInput(input) });
    return updatedEvaluation;
  },
  updateClassParticipationCollection: async (_, { data, collectionId }, { user }) => {
    await checkAuthenticatedByCollection(user, collectionId);
    await validateUpdateClassParticipationCollectionInput(data, collectionId);
    const { evaluations, ...rest } = data;
    const updatedCollection = await updateClassParticipationCollection(
      collectionId,
      { data: mapUpdateClassParticipationCollectionInput(rest) },
      evaluations ?? undefined
    );
    return updatedCollection;
  },
  updateDefaultCollection: async (_, { data, collectionId }, { user }) => {
    await checkAuthenticatedByCollection(user, collectionId);
    await validateUpdateDefaultCollectionInput(data, collectionId);
    const { evaluations, ...rest } = data;
    const updatedCollection = await updateDefaultCollection(collectionId, { data: mapUpdateDefaultCollectionInput(rest) }, evaluations ?? undefined);
    return updatedCollection;
  },
  updateStudent: async (_, { data, studentId }, { user }) => {
    await checkAuthenticatedByStudent(user, studentId);
    await validateUpdateStudentInput(data, studentId);
    const updatedStudent = await updateStudent(studentId, {
      data: mapUpdateStudentInput(data),
    });
    return updatedStudent;
  },
  updateGroup: async (_, { data, groupId }, { user }) => {
    await checkAuthenticatedByGroup(user, groupId);
    await validateUpdateGroupInput(data, groupId);
    const { updateCollectionTypeInputs, deleteCollectionTypeIds, createCollectionTypeInputs, ...rest } = data;
    const updatedGroup = await updateGroup(
      groupId,
      {
        data: mapUpdateGroupInput(rest),
      },
      { updateCollectionTypeInputs, deleteCollectionTypeIds, createCollectionTypeInputs }
    );
    return updatedGroup;
  },
  deleteStudent: async (_, { studentId }, { user }) => {
    await checkAuthenticatedByStudent(user, studentId);
    const student = await deleteStudent(studentId);
    return student;
  },
  deleteGroup: async (_, { groupId }, { user }) => {
    await checkAuthenticatedByGroup(user, groupId);
    const group = await deleteGroup(groupId);
    return group;
  },
  deleteCollection: async (_, { collectionId }, { user }) => {
    await checkAuthenticatedByCollection(user, collectionId);
    const collection = await deleteCollection(collectionId);
    return collection;
  },
  // NOTE: This function is not used currently but is here for possible future use
  // deleteCollectionType: async (_, { id }, { user }) => {
  //   await checkAuthenticatedByType(user, id);
  //   const collectionType = await deleteCollectionType(id);
  //   return collectionType;
  // },
  changeGroupModule: async (_, { data, groupId }, { prisma, dataLoaders, user }) => {
    await checkAuthenticatedByGroup(user, groupId);
    await validateChangeGroupLevelInput(data, groupId);
    let newModule = await prisma.module.findFirst({
      where: { groupId, educationLevel: data.newEducationLevel, learningObjectiveGroupKey: data.newLearningObjectiveGroupKey },
    });
    const group = await dataLoaders.groupLoader.load(groupId);
    if (!newModule) {
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
      const currentYearCollectionTypes = await dataLoaders.collectionTypesByModuleLoader.load(group.currentModuleId);
      newModule = await createModule({
        data: {
          educationLevel: data.newEducationLevel,
          learningObjectiveGroupKey: data.newLearningObjectiveGroupKey,
          groupId,
          // Connect students from current year to new year
          students: {
            connect: currentYearStudents.map((it) => ({ id: it.id })),
          },
          // Copy collection types from current year to new year
          collectionTypes: {
            createMany: {
              data: currentYearCollectionTypes.map((it) => ({
                name: it.name,
                category: it.category,
                weight: it.weight,
              })),
            },
          },
        },
      });
    }
    const updatedGroup = await updateGroup(
      groupId,
      {
        data: {
          currentModuleId: newModule.id,
        },
      },
      {}
    );
    return updatedGroup;
  },
  generateStudentFeedback: async (_, { studentId, moduleId }, { dataLoaders, user, prisma }) => {
    await checkAuthenticatedByStudent(user, studentId);
    const student = await dataLoaders.studentLoader.load(studentId);
    const evaluationsPromise = prisma.evaluation.findMany({
      where: {
        studentId: student.id,
        evaluationCollection: {
          moduleId,
        },
      },
      include: {
        evaluationCollection: {
          select: {
            environmentCode: true,
            date: true,
            type: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
    const groupPromise = prisma.group.findFirstOrThrow({
      where: {
        modules: {
          some: {
            id: moduleId,
          },
        },
      },
      select: {
        subjectCode: true,
        currentModule: true,
      },
    });
    const [evaluations, group] = await Promise.all([evaluationsPromise, groupPromise]);
    const { currentModule } = group;
    const mappedEvaluations = evaluations.map((it) => {
      const { environmentCode } = it.evaluationCollection;
      return environmentCode
        ? {
            environmentLabel: getEnvironment(environmentCode, mapModuleInfo(currentModule))?.label.fi || "Ei ympäristöä",
            date: it.evaluationCollection.date,
            skillsRating: it.skillsRating,
            behaviourRating: it.behaviourRating,
          }
        : {
            date: it.evaluationCollection.date,
            generalRating: it.generalRating,
            collectionTypeName: it.evaluationCollection.type.name,
          };
    });
    if (mappedEvaluations.length === 0) throw new ValidationError("Oppilaalla ei ole vielä arviointeja, palautetta ei voida generoida");
    const summary = await generateStudentSummary(mappedEvaluations, user!.id, group.subjectCode); // Safe cast after authenticated check
    return summary;
  },
  fixTextGrammatics: async (_, { studentId, text }, { user }) => {
    await checkAuthenticatedByStudent(user, studentId);
    validateFixTextGrammaticsInput(text);
    const summary = await fixTextGrammatics(text, user!.id); // Safe cast after authenticated check
    return summary;
  },
};

export default resolvers;
