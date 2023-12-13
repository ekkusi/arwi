import { SessionData } from "express-session";
import { compare } from "bcryptjs";
import { Teacher } from "@prisma/client";
import ValidationError from "../../errors/ValidationError";
import prisma from "@/prismaClient";
import {
  ChangeGroupModuleInput,
  CreateCollectionInput,
  CreateGroupInput,
  CreateStudentInput,
  CreateTeacherInput,
  EducationLevel,
  LearningObjectiveType,
  UpdateCollectionInput,
  UpdateEvaluationInput,
  UpdateStudentInput,
} from "../../types";
import { getEnvironment, getLearningObjectiveGroupKeys, getLearningObjectives, getSubject } from "../../utils/subjectUtils";

const VALID_LANGUAGE_CODES = ["fi_FI", "sv_SE", "en_US"];

export const validateRegisterInput = async ({ email, languagePreference }: CreateTeacherInput) => {
  const matchingTeacher = await prisma.teacher.findFirst({
    where: { email },
  });

  if (matchingTeacher) throw new ValidationError(`Sähköposti '${email}' on jo käytössä`);
  if (languagePreference && !VALID_LANGUAGE_CODES.includes(languagePreference))
    throw new ValidationError(`Kielikoodi '${languagePreference}' ei ole sallittu`);
};

export const validateCreateGroupInput = async ({ subjectCode, collectionTypes }: CreateGroupInput) => {
  if (!getSubject(subjectCode)) throw new ValidationError(`Aihetta koodilla '${subjectCode}' ei ole olemassa.`);
  if (collectionTypes.length === 0) throw new ValidationError(`Arviointityyppejä on oltava vähintään yksi.`);
  if (collectionTypes.reduce((acc, curr) => acc + curr.weight, 0) !== 100)
    throw new ValidationError(`Arviointityyppien painotusten summan on oltava 100.`);
};

export const validateLearningObjectives = (
  subjectCode: string,
  educationLevel: EducationLevel,
  learningObjectiveGroupKey: string,
  learningObjectiveCodes: string[]
) => {
  const learningObjectives = getLearningObjectives(subjectCode, educationLevel, learningObjectiveGroupKey);
  if (
    !learningObjectiveCodes.every((code) =>
      learningObjectives.some((objective) => objective.code === code && objective.type !== LearningObjectiveType.NOT_EVALUATED)
    )
  )
    throw new ValidationError(`Osa oppimistavoitteista ei ole olemassa tai ei ole arvioitavia.`);
};

export const validateCreateCollectionInput = async ({ environmentCode, learningObjectiveCodes }: CreateCollectionInput, moduleId: string) => {
  if (!getEnvironment(environmentCode)) throw new ValidationError(`Ympäristöä koodilla '${environmentCode}' ei ole olemassa.`);
  if (learningObjectiveCodes.length > 0) {
    const group = await prisma.group.findFirstOrThrow({
      where: {
        currentModuleId: moduleId,
      },
      include: {
        currentModule: {
          select: {
            educationLevel: true,
            learningObjectiveGroupKey: true,
          },
        },
      },
    });
    const { currentModule } = group;
    validateLearningObjectives(
      group.subjectCode,
      currentModule.educationLevel as EducationLevel,
      currentModule.learningObjectiveGroupKey,
      learningObjectiveCodes
    );
  }
};

export const validateUpdateEvaluationInput = async (data: UpdateEvaluationInput) => {
  const matchingEvaluation = await prisma.evaluation.findFirstOrThrow({
    where: { id: data.id },
  });
  const wasPresent = data.wasPresent ?? matchingEvaluation.wasPresent;

  // If the student was not present, the evaluation data cannot be updated
  if (wasPresent === false && (data.behaviourRating || data.skillsRating || data.notes)) {
    throw new ValidationError(`Arvioinnin tallentaminen ei onnistunut. Mikäli oppilas ei ole ollut läsnä, ei arvioinnin tietoja voida päivittää.`);
  }
};

export const validateUpdateEvaluationsInput = async (data: UpdateEvaluationInput[], collectionId: string) => {
  const ids = data.map((it) => it.id);
  const evaluations = await prisma.evaluation.findMany({
    where: {
      evaluationCollectionId: collectionId,
      id: {
        in: ids,
      },
    },
  });

  if (ids.length !== evaluations.length) throw new ValidationError("Osa muokattavista arvioinneista eivät kuulu arviointikokoelmaan");
  const validatePromises = data.map((it) => validateUpdateEvaluationInput(it));
  await Promise.all(validatePromises);
};

export const validateUpdateCollectionInput = async (
  { environmentCode, learningObjectiveCodes, evaluations }: UpdateCollectionInput,
  collectionId: string
) => {
  if (environmentCode && !getEnvironment(environmentCode)) throw new ValidationError(`Ympäristöä koodilla '${environmentCode}' ei ole olemassa.`);

  if (learningObjectiveCodes && learningObjectiveCodes.length > 0) {
    const group = await prisma.group.findFirstOrThrow({
      where: {
        currentModule: {
          evaluationCollections: {
            some: { id: collectionId },
          },
        },
      },
      include: {
        currentModule: {
          select: {
            educationLevel: true,
            learningObjectiveGroupKey: true,
          },
        },
      },
    });
    const { currentModule } = group;
    validateLearningObjectives(
      group.subjectCode,
      currentModule.educationLevel as EducationLevel,
      currentModule.learningObjectiveGroupKey,
      learningObjectiveCodes
    );
  }
  if (evaluations) await validateUpdateEvaluationsInput(evaluations, collectionId);
};

export const validateCreateStudentInput = async (data: CreateStudentInput, moduleId: string) => {
  // Find if there is a student with the same name in the same group
  const matchingStudent = await prisma.student.findFirst({
    where: {
      AND: [
        {
          name: data.name,
        },
        { modules: { some: { id: moduleId } } },
      ],
    },
  });
  if (matchingStudent)
    throw new ValidationError(`Vuosiluokassa on jo '${data.name}' niminen oppilas. Vuosiluokan sisällä ei voi olla kahta samannimistä oppilasta.`);
};

export const validateUpdateStudentInput = async (data: UpdateStudentInput, studentId: string) => {
  if (!data.name) return;
  // Find if there is a student with the same name in the same group
  const matchingStudent = await prisma.student.findFirst({
    where: {
      AND: [
        { group: { students: { some: { id: studentId } } } }, // Group by student id
        { name: data.name },
        { id: { not: studentId } }, // Don't check the same student
      ],
    },
  });
  if (matchingStudent) throw new ValidationError(`Ryhmässä on jo '${data.name}' niminen oppilas. Ryhmässä ei voi olla kahta samannimistä oppilasta.`);
};

export const validateChangeGroupLevelInput = async (input: ChangeGroupModuleInput, groupId: string) => {
  const group = await prisma.group.findUniqueOrThrow({
    where: { id: groupId },
  });
  const allowedLearningObjectiveGroupKeys = getLearningObjectiveGroupKeys(group.subjectCode, input.newEducationLevel);
  if (!allowedLearningObjectiveGroupKeys.includes(input.newLearningObjectiveGroupKey))
    throw new ValidationError("Annettu oppimistavoitteiden ryhmä ei ole sallittu kyseiselle koulutustasolle.");
};

export const MAX_AMOUNT_OF_RESET_CODE_TRIES = 5;
export const RESET_CODE_EXPIRY_TIME_MS = 1000 * 60 * 5;

export const validatePasswordResetCode = async (code: string, session: SessionData) => {
  const { recoveryCodeInfo } = session;
  if (!recoveryCodeInfo) throw new ValidationError("Syötetty koodi on virheellinen tai se on vanhentunut.");
  recoveryCodeInfo.amountsTried += 1;
  if (recoveryCodeInfo.amountsTried > MAX_AMOUNT_OF_RESET_CODE_TRIES)
    throw new ValidationError("Koodia on yritetty liian monta kertaa. Generoi uusi koodi.");
  const isValidCode = await compare(code, recoveryCodeInfo.codeHash);
  if (!isValidCode) throw new ValidationError("Syötetty koodi on virheellinen tai se on vanhentunut.");
  if (recoveryCodeInfo.createdAt + RESET_CODE_EXPIRY_TIME_MS < Date.now())
    throw new ValidationError("Syötetty koodi on virheellinen tai se on vanhentunut.");
  return true;
};

export const MAX_AMOUNT_OF_RESET_PASSWORD_REQUEST = 5;
export const REQUEST_PASSWORD_RESET_EXPIRY_IN_MS = 1000 * 60 * 15;

export const validateRequestPasswordReset = async (teacher: Teacher) => {
  if (!teacher.passwordResetStartedAt) return;
  const resetStartedAt = new Date(teacher.passwordResetStartedAt).getTime();

  if (resetStartedAt > Date.now() - REQUEST_PASSWORD_RESET_EXPIRY_IN_MS && teacher.passwordResetTries > MAX_AMOUNT_OF_RESET_PASSWORD_REQUEST) {
    throw new ValidationError("Olet pyytänyt uutta koodia salasanasi vaihtamiseen liian monta kertaa. Yritä uudelleen 15 minuutin kuluttua.");
  }
};

export const validateFixTextGrammaticsInput = (text: string) => {
  if (text.length === 0) throw new ValidationError("Tekstiä ei ole annettu. Tyhjää tekstiä ei voida korjata.");
};
