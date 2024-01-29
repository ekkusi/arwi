/* eslint-disable no-console */
import { CollectionTypeCategory, EducationLevel, PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import mockData from "../__mocks__/mockData.json";

dotenv.config();

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
  const groupId = uuidv4();
  const moduleId = uuidv4();
  const testGroup = prisma.group.create({
    data: {
      id: groupId,
      name: "1A",
      subjectCode: "LI",
      teacherId: testTeacher.id,
      currentModuleId: moduleId,
    },
  });
  const classYear = prisma.module.create({
    data: {
      id: moduleId,
      educationLevel: EducationLevel.PRIMARY_FIRST,
      learningObjectiveGroupKey: "one_to_two_years",
      groupId,
    },
  });
  await prisma.$transaction([testGroup, classYear]);
  const collectionType = await prisma.collectionType.create({
    data: {
      moduleId,
      category: CollectionTypeCategory.CLASS_PARTICIPATION,
      weight: 100,
      name: "Tuntityöskentely",
    },
  });
  const collectionPromises = mockData.collections.map(({ id: _, learningObjectives, ...rest }) =>
    prisma.evaluationCollection.create({
      data: {
        ...rest,
        typeId: collectionType.id,
        learningObjectiveCodes: learningObjectives,
        moduleId,
      },
    })
  );
  const collections = await Promise.all(collectionPromises);
  const studentPromises = mockData.students.map(({ evaluations, ...rest }) =>
    prisma.student
      .create({
        data: {
          ...rest,
          groupId,
          modules: { connect: { id: moduleId } },
        },
      })
      .then((student) =>
        Promise.all(
          evaluations.map(({ collectionId: _, ...evaluation }, index) =>
            prisma.evaluation.create({
              data: {
                ...evaluation,
                skillsRating: evaluation.skillsRating || null,
                behaviourRating: evaluation.behaviourRating || null,
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
