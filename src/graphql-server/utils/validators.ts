import ValidationError from "../errors/ValidationError";
import prisma from "../prismaClient";
import {
  CreateCollectionInput,
  CreateGroupInput,
  CreateStudentInput,
  UpdateCollectionInput,
  UpdateEvaluationInput,
  UpdateStudentInput,
} from "../types";
import { getEnvironment, getSubject } from "./subjectUtils";

export const validateCreateGroupInput = async ({
  subjectCode,
}: CreateGroupInput) => {
  if (!getSubject(subjectCode))
    throw new ValidationError(
      `Aihetta koodilla '${subjectCode}' ei ole olemassa.`
    );
};

export const validateCreateCollectionInput = async ({
  environmentCode,
}: CreateCollectionInput) => {
  if (!getEnvironment(environmentCode))
    throw new ValidationError(
      `Ympäristöä koodilla '${environmentCode}' ei ole olemassa.`
    );
};

export const validateUpdateCollectionInput = async ({
  environmentCode,
}: UpdateCollectionInput) => {
  if (environmentCode && !getEnvironment(environmentCode))
    throw new ValidationError(
      `Ympäristöä koodilla '${environmentCode}' ei ole olemassa.`
    );
};

export const validateCreateStudentInput = async (
  data: CreateStudentInput,
  classYearId: string
) => {
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
    throw new ValidationError(
      `Vuosiluokassa on jo '${data.name}' niminen oppilas. Vuosiluokan sisällä ei voi olla kahta samannimistä oppilasta.`
    );
};

export const validateUpdateStudentInput = async (
  data: UpdateStudentInput,
  studentId: string
) => {
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
  if (matchingStudent)
    throw new ValidationError(
      `Ryhmässä on jo '${data.name}' niminen oppilas. Ryhmässä ei voi olla kahta samannimistä oppilasta.`
    );
};

export const validateUpdateEvaluationInput = async (
  data: UpdateEvaluationInput
) => {
  const matchingEvaluation = await prisma.evaluation.findUniqueOrThrow({
    where: { id: data.id },
  });
  const wasPresent =
    data.wasPresent !== null ? data.wasPresent : matchingEvaluation.wasPresent;

  // If the student was not present, the evaluation data cannot be updated
  if (
    wasPresent === false &&
    (data.behaviourRating || data.skillsRating || data.notes)
  ) {
    throw new ValidationError(
      `Arvioinnin tallentaminen ei onnistunut. Mikäli oppilas ei ole ollut läsnä, ei arvioinnin tietoja voida päivittää.`
    );
  }
};
