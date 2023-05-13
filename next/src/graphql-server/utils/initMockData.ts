/* eslint-disable no-console */
import { ClassYearCode, PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import mockData from "@/graphql-server/__mocks__/mockData.json";
import { Rating } from "../types";

const prisma = new PrismaClient();

export const clearDb = async () => {
  await prisma.teacher.deleteMany();
};

const initMockData = async () => {
  const password = "asd123";
  const email = "test@email.com";
  const hashedPassword = await hash(password, 12);
  const existingTeacher = await prisma.teacher.findUnique({ where: { email } });
  if (existingTeacher) await prisma.teacher.delete({ where: { email: "test@email.com" } });
  const testTeacher = await prisma.teacher.create({
    data: {
      email: "test@email.com",
      passwordHash: hashedPassword,
    },
  });
  const testGroup = await prisma.group.create({
    data: {
      name: "Testiryhmä",
      subjectCode: "LI",
      teacherId: testTeacher.id,
      currentYearCode: ClassYearCode.PRIMARY_FIRST,
    },
  });
  const classYear = await prisma.classYear.create({
    data: {
      code: ClassYearCode.PRIMARY_FIRST,
      groupId: testGroup.id,
    },
  });
  const collectionPromises = mockData.collections.map(({ id: _, learningObjectives, ...rest }) =>
    prisma.evaluationCollection.create({
      data: {
        ...rest,
        learningObjectiveCodes: learningObjectives,
        type: "",
        classYearId: classYear.id,
      },
    })
  );
  const collections = await Promise.all(collectionPromises);
  const studentPromises = mockData.students.map(({ evaluations, ...rest }) =>
    prisma.student
      .create({
        data: {
          ...rest,
          groupId: testGroup.id,
          classYears: { connect: { id: classYear.id } },
        },
      })
      .then((student) =>
        Promise.all(
          evaluations.map(({ collectionId: _, ...evaluation }, index) =>
            prisma.evaluation.create({
              data: {
                ...evaluation,
                skillsRating: (evaluation.skillsRating as Rating) || null,
                behaviourRating: (evaluation.behaviourRating as Rating) || null,
                studentId: student.id,
                evaluationCollectionId: collections[index].id,
              },
            })
          )
        )
      )
  );
  await Promise.all(studentPromises);
};

console.log("Initializing mock data...");
initMockData().then(
  () => {
    console.log("Mock data for test@email.com initialized");
  },
  (err) => {
    console.error("Something went wrong: ", err);
  }
);

export default initMockData;
