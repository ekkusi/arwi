import { SessionData } from "express-session";
import { compare } from "bcryptjs";
import { CollectionTypeCategory, Teacher } from "@prisma/client";
import ValidationError from "../errors/ValidationError";
import prisma from "@/prismaClient";
import {
  ChangeGroupModuleInput,
  CreateClassParticipationCollectionInput,
  CreateDefaultCollectionInput,
  CreateGroupInput,
  CreateStudentInput,
  CreateTeacherInput,
  EducationLevel,
  UpdateClassParticipationCollectionInput,
  UpdateClassParticipationEvaluationInput,
  UpdateDefaultEvaluationInput,
  UpdateGroupInput,
  UpdateStudentInput,
} from "../../types";
import { getEnvironment, getLearningObjectiveGroupKeys, getLearningObjectives, getSubject, isPrimaryEducationLevel } from "../../utils/subjectUtils";
import { evaluationLoader } from "../dataLoaders/evaluation";
import { collectionTypeLoader, collectionTypesByModuleLoader } from "../dataLoaders/collectionType";
import { collectionLoader } from "../dataLoaders/collection";
import { moduleLoader } from "../dataLoaders/module";
import { groupLoader } from "../dataLoaders/group";
import { mapModuleInfo } from "./mappers";

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
  if (!learningObjectiveCodes.every((code) => learningObjectives.some((objective) => objective.code === code && objective.type !== "NOT_EVALUATED")))
    throw new ValidationError(`Osa oppimistavoitteista ei ole olemassa tai ei ole arvioitavia.`);
};

export const validateCreateDefaultCollectionInput = async ({ typeId }: CreateDefaultCollectionInput) => {
  const existingCollection = await prisma.evaluationCollection.findFirst({
    where: {
      typeId,
    },
  });
  if (existingCollection)
    throw new ValidationError(`Arviointikokoelma tällä arviointityypillä on jo olemassa ja kyseisellä tyypillä niitä ei voi olla yhtä enempää.`);
  const type = await collectionTypeLoader.load(typeId);
  if (type.category === CollectionTypeCategory.CLASS_PARTICIPATION)
    throw new ValidationError(`Syötetty arviointikokoelman tyyppi on väärä. Se ei saa olla 'CLASS_PARTICIPATION'.`);
};

export const validateCreateClassParticipationCollectionInput = async (
  { environmentCode, learningObjectiveCodes, typeId }: CreateClassParticipationCollectionInput,
  moduleId: string
) => {
  const type = await collectionTypeLoader.load(typeId);
  const module = await moduleLoader.load(moduleId);
  if (type.category !== CollectionTypeCategory.CLASS_PARTICIPATION)
    throw new ValidationError(`Syötetty arviointikokoelman tyyppi on väärä. Sen kuuluu olla 'CLASS_PARTICIPATION'.`);
  if (!getEnvironment(environmentCode, mapModuleInfo(module))) throw new ValidationError(`Ympäristöä koodilla '${environmentCode}' ei ole olemassa.`);
  if (learningObjectiveCodes.length > 0) {
    const group = await prisma.group.findFirstOrThrow({
      where: {
        currentModuleId: moduleId,
      },
    });
    validateLearningObjectives(group.subjectCode, module.educationLevel as EducationLevel, module.learningObjectiveGroupKey, learningObjectiveCodes);
  }
};

export const validateUpdateClassParticipationEvaluationInput = async (
  data: UpdateClassParticipationEvaluationInput,
  validateType: boolean = true
) => {
  const matchingEvaluation = await evaluationLoader.load(data.id);

  if (validateType) {
    const collection = await collectionLoader.load(matchingEvaluation.evaluationCollectionId);
    const type = await collectionTypeLoader.load(collection.typeId);
    if (type.category !== CollectionTypeCategory.CLASS_PARTICIPATION)
      throw new ValidationError(
        `Arviointikokoelman tyyppi on väärä. Et voi päivittää muita kuin CLASS_PARTICIPATION arviointeja tämän endpointin kautta.`
      );
  }

  const wasPresent = data.wasPresent ?? matchingEvaluation.wasPresent;

  // If the student was not present, the evaluation data cannot be updated
  if (wasPresent === false && (data.behaviourRating || data.skillsRating || data.notes)) {
    throw new ValidationError(`Arvioinnin tallentaminen ei onnistunut. Mikäli oppilas ei ole ollut läsnä, ei arvioinnin tietoja voida päivittää.`);
  }

  if (data.behaviourRating && (data.behaviourRating < 4 || data.behaviourRating > 10)) {
    throw new ValidationError(`Käytöksen arvosanan on oltava välillä 4-10.`);
  }
  if (data.skillsRating && (data.skillsRating < 4 || data.skillsRating > 10)) {
    throw new ValidationError(`Taitojen arvosanan on oltava välillä 4-10.`);
  }
};

export const validateUpdateClassParticipationEvaluationsInput = async (data: UpdateClassParticipationEvaluationInput[], collectionId: string) => {
  const collection = await collectionLoader.load(collectionId);
  const type = await collectionTypeLoader.load(collection.typeId);
  if (type.category !== CollectionTypeCategory.CLASS_PARTICIPATION)
    throw new ValidationError(
      `Arviointikokoelman tyyppi on väärä. Et voi päivittää muita kuin CLASS_PARTICIPATION arviointeja tämän endpointin kautta.`
    );

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
  const validatePromises = data.map((it) => validateUpdateClassParticipationEvaluationInput(it, false));
  await Promise.all(validatePromises);
};

export const validateUpdateClassParticipationCollectionInput = async (
  { environmentCode, learningObjectiveCodes, evaluations }: UpdateClassParticipationCollectionInput,
  collectionId: string
) => {
  const collection = await collectionLoader.load(collectionId);
  const module = await moduleLoader.load(collection.moduleId);
  if (environmentCode && !getEnvironment(environmentCode, mapModuleInfo(module)))
    throw new ValidationError(`Ympäristöä koodilla '${environmentCode}' ei ole olemassa.`);

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
  if (evaluations) await validateUpdateClassParticipationEvaluationsInput(evaluations, collectionId);
};

export const validateUpdateDefaultEvaluationInput = async (data: UpdateDefaultEvaluationInput, validateType: boolean = true) => {
  const matchingEvaluation = await evaluationLoader.load(data.id);

  // Allow not checking the type for when updating evaluations in bulk
  if (validateType) {
    const collection = await collectionLoader.load(matchingEvaluation.evaluationCollectionId);
    const type = await collectionTypeLoader.load(collection.typeId);
    if (type.category === CollectionTypeCategory.CLASS_PARTICIPATION)
      throw new ValidationError(`Arviointikokoelman tyyppi on väärä. Et voi päivittää CLASS_PARTICIPATION arviointeja tämän endpointin kautta.`);
  }

  const wasPresent = data.wasPresent ?? matchingEvaluation.wasPresent;

  // If the student was not present, the evaluation data cannot be updated
  if (wasPresent === false && (data.rating || data.notes)) {
    throw new ValidationError(`Arvioinnin tallentaminen ei onnistunut. Mikäli oppilas ei ole ollut läsnä, ei arvioinnin tietoja voida päivittää.`);
  }
  if (data.rating && (data.rating < 4 || data.rating > 10)) {
    throw new ValidationError(`Arvosanan on oltava välillä 4-10.`);
  }
  if (data.rating && data.rating % 0.25 !== 0) {
    throw new ValidationError(`Arvosanan on oltava jaollinen 0.25:llä.`);
  }
};

export const validateUpdateDefaultEvaluationsInput = async (data: UpdateDefaultEvaluationInput[], collectionId: string) => {
  const collection = await collectionLoader.load(collectionId);
  const type = await collectionTypeLoader.load(collection.typeId);
  if (type.category === CollectionTypeCategory.CLASS_PARTICIPATION)
    throw new ValidationError(`Arviointikokoelman tyyppi on väärä. Et voi päivittää CLASS_PARTICIPATION arviointeja tämän endpointin kautta.`);

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
  const validatePromises = data.map((it) => validateUpdateDefaultEvaluationInput(it, false));
  await Promise.all(validatePromises);
};

export const validateUpdateDefaultCollectionInput = async ({ evaluations }: UpdateClassParticipationCollectionInput, collectionId: string) => {
  if (evaluations) await validateUpdateDefaultEvaluationsInput(evaluations, collectionId);
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
  const group = await groupLoader.load(groupId);
  const module = await moduleLoader.load(group.currentModuleId);

  // If the group is primary level, the new level must be primary level as well
  if (isPrimaryEducationLevel(module.educationLevel as EducationLevel)) {
    if (!isPrimaryEducationLevel(input.newEducationLevel)) {
      throw new ValidationError(
        "Annettu koulutustaso ei ole sallittu kyseiselle ryhmälle. Et voi vaihtaa ryhmää peruskouluasteesta toiselle asteelle"
      );
    }
  } else if (input.newEducationLevel !== module.educationLevel)
    throw new ValidationError("Annettu koulutustaso ei ole sallittu kyseiselle ryhmälle. Et voi vaihtaa ryhmää toiselta asteelta muulle asteelle.");
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

export const validateUpdateGroupInput = async (input: UpdateGroupInput, groupId: string) => {
  if (!input.createCollectionTypeInputs && !input.updateCollectionTypeInputs && !input.deleteCollectionTypeIds) return;
  const createInputs = input.createCollectionTypeInputs ?? [];
  const updateInputs = input.updateCollectionTypeInputs ?? [];
  const deleteIds = new Set(input.deleteCollectionTypeIds ?? []);

  // Check for duplicates in updated or deleted IDs
  const updatedOrDeletedIds = [...updateInputs.map((it) => it.id), ...deleteIds];
  if (new Set(updatedOrDeletedIds).size !== updatedOrDeletedIds.length) {
    throw new ValidationError("Syötetyissä muokattavissa arviointityypeissä on duplikaatteja. Tarkista syötetyt arviointityypit.");
  }

  // Check for unmatched IDs
  const group = await groupLoader.load(groupId);
  const oldCollectionTypes = await collectionTypesByModuleLoader.load(group.currentModuleId);
  const oldCollectionsMap = new Map(oldCollectionTypes.map((it) => [it.id, it]));
  const oldIdsSet = new Set(oldCollectionTypes.map((it) => it.id));
  const unmatchedIds = updatedOrDeletedIds.filter((id) => !oldIdsSet.has(id));
  if (unmatchedIds.length > 0) {
    throw new ValidationError(
      `Syötetyissä muokattavissa arviointityypeissä on arviointityyppejä, jotka eivät kuulu ryhmään. Tarkista syötetyt arviointityypit.`
    );
  }

  const fullUpdateInputs = updateInputs.map((inputType) => {
    const equivalentOldInput = oldCollectionTypes.find((type) => type.id === inputType.id);
    if (!equivalentOldInput) {
      throw new ValidationError(
        `Syötetyissä muokattavissa arviointityypeissä on arviointityyppejä, jotka eivät kuulu ryhmään. Tarkista syötetyt arviointityypit.`
      );
    }
    const name = inputType.name || equivalentOldInput.name;
    const category = inputType.category || equivalentOldInput.category;
    const weight = inputType.weight || equivalentOldInput.weight;
    return {
      ...inputType,
      name,
      category,
      weight,
    };
  });

  // Check if new categories are valid
  updateInputs.forEach((it) => {
    const oldType = oldCollectionsMap.get(it.id);
    if (
      oldType?.category === CollectionTypeCategory.CLASS_PARTICIPATION &&
      it.category &&
      it.category !== CollectionTypeCategory.CLASS_PARTICIPATION
    ) {
      throw new ValidationError("Arviointityyppiä ei voi muuttaa CLASS_PARTICIPATION tyypistä muuksi tyypiksi. Tarkista syötetyt arviointityypit.");
    }
    if (
      oldType?.category !== CollectionTypeCategory.CLASS_PARTICIPATION &&
      it.category &&
      it.category === CollectionTypeCategory.CLASS_PARTICIPATION
    ) {
      throw new ValidationError("Arviointityyppiä ei voi muuttaa CLASS_PARTICIPATION tyypiksi toisesta tyypistä. Tarkista syötetyt arviointityypit.");
    }
  });

  const remainingOldTypes = oldCollectionTypes.filter((it) => !updatedOrDeletedIds.includes(it.id));

  // Check if new categories or old undeleted types have CLASS_PARTICIPATION in them
  const newCategories = [...createInputs, ...fullUpdateInputs].map((it) => it.category);
  const remainingOldCategories = remainingOldTypes.map((it) => it.category);
  const classParticipationCategories = [...newCategories, ...remainingOldCategories].filter(
    (category) => category === CollectionTypeCategory.CLASS_PARTICIPATION
  );

  if (classParticipationCategories.length > 1) {
    throw new ValidationError("Ryhmässä voi olla vain yksi CLASS_PARTICIPATION arviointityyppi. Tarkista syötetyt arviointityypit.");
  }
  if (classParticipationCategories.length === 0) {
    throw new ValidationError("Ryhmässä on oltava vähintään yksi CLASS_PARTICIPATION arviointityyppi. Tarkista syötetyt arviointityypit.");
  }

  // Check if new weights are valid
  const remainingWeightSum = remainingOldTypes.reduce((sum, type) => sum + type.weight, 0);
  const updatedWeightsSum = fullUpdateInputs.reduce((sum, type) => sum + type.weight, 0);
  const createdWeightSum = createInputs.reduce((sum, type) => sum + type.weight, 0);
  const totalWeight = remainingWeightSum + updatedWeightsSum + createdWeightSum;
  if (totalWeight !== 100) {
    throw new ValidationError("Arviointityyppien painotusten summan on oltava 100. Tarkista syötetyt arviointityypit.");
  }
};
