/* eslint-disable no-console */
import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import mockData from "@/graphql-server/__mocks__/mockData.json";
import { Rating } from "../types";

const prisma = new PrismaClient();

export const clearDb = async () => {
  await prisma.teacher.deleteMany();
};

const initMockData = async () => {
  const password = "asd123";
  const hashedPassword = await hash(password, 12);
  await prisma.teacher.delete({ where: { email: "test@email.com" } });
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
    },
  });
  const collectionPromises = mockData.collections.map(({ id: _, ...rest }) =>
    prisma.evaluationCollection.create({
      data: {
        ...rest,
        type: "",
        groupId: testGroup.id,
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
