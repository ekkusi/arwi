import ValidationError from "../errors/ValidationError";
import prisma from "../prismaClient";
import {
  CreateStudentInput,
  UpdateEvaluationInput,
  UpdateStudentInput,
} from "../types";

export const validateCreateStudentInput = async (
  data: CreateStudentInput,
  groupId: string
) => {
  // Find if there is a student with the same name in the same group
  const matchingStudent = await prisma.student.findFirst({
    where: {
      AND: [
        {
          name: data.name,
        },
        { groupId },
      ],
    },
  });
  if (matchingStudent)
    throw new ValidationError(
      `Ryhmässä on jo '${data.name}' niminen oppilas. Ryhmässä ei voi olla kahta samannimistä oppilasta.`
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
  const wasPresent = data.wasPresent || matchingEvaluation.wasPresent;

  if (
    !wasPresent &&
    (data.behaviourRating || data.skillsRating || data.notes)
  ) {
    throw new ValidationError(
      `Arvioinnin tallentaminen ei onnistunut. Mikäli oppilas ei ole ollut läsnä, ei arvioinnin tietoja voida päivittää.`
    );
  }
};
