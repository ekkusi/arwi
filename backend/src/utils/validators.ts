import ValidationError from "../errors/ValidationError";
import prisma from "../prismaClient";
import {
  ClassYearCode,
  CreateCollectionInput,
  CreateGroupInput,
  CreateStudentInput,
  LearningObjectiveType,
  UpdateCollectionInput,
  UpdateEvaluationInput,
  UpdateStudentInput,
} from "../types";
import { getEnvironment, getLearningObjectives, getSubject } from "./subjectUtils";

export const validateCreateGroupInput = async ({ subjectCode }: CreateGroupInput) => {
  if (!getSubject(subjectCode)) throw new ValidationError(`Aihetta koodilla '${subjectCode}' ei ole olemassa.`);
};

export const validateLearningObjectives = (subjectCode: string, yearCode: ClassYearCode, learningObjectiveCodes: string[]) => {
  const learningObjectives = getLearningObjectives(subjectCode, yearCode);
  if (
    !learningObjectiveCodes.every((code) =>
      learningObjectives.some((objective) => objective.code === code && objective.type !== LearningObjectiveType.NOT_EVALUATED)
    )
  )
    throw new ValidationError(`Osa oppimistavoitteista ei ole olemassa tai ei ole arvioitavia.`);
};

export const validateCreateCollectionInput = async ({ environmentCode, learningObjectiveCodes }: CreateCollectionInput, classYearId: string) => {
  if (!getEnvironment(environmentCode)) throw new ValidationError(`Ympäristöä koodilla '${environmentCode}' ei ole olemassa.`);
  if (learningObjectiveCodes.length > 0) {
    const group = await prisma.group.findFirstOrThrow({
      where: {
        currentClassYearId: classYearId,
      },
      include: {
        currentClassYear: {
          select: {
            code: true,
          },
        },
      },
    });
    validateLearningObjectives(group.subjectCode, ClassYearCode[group.currentClassYear.code], learningObjectiveCodes);
  }
};

export const validateUpdateEvaluationInput = async (data: UpdateEvaluationInput) => {
  const matchingEvaluation = await prisma.evaluation.findUniqueOrThrow({
    where: { id: data.id },
  });
  const wasPresent = data.wasPresent !== null ? data.wasPresent : matchingEvaluation.wasPresent;

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
        currentClassYear: {
          evaluationCollections: {
            some: { id: collectionId },
          },
        },
      },
      include: {
        currentClassYear: {
          select: {
            code: true,
          },
        },
      },
    });
    validateLearningObjectives(group.subjectCode, ClassYearCode[group.currentClassYear.code], learningObjectiveCodes);
  }
  if (evaluations) await validateUpdateEvaluationsInput(evaluations, collectionId);
};

export const validateCreateStudentInput = async (data: CreateStudentInput, classYearId: string) => {
  // Find if there is a student with the same name in the same group
  const matchingStudent = await prisma.student.findFirst({
    where: {
      AND: [
        {
          name: data.name,
        },
        { classYears: { some: { id: classYearId } } },
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
