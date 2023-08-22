import { ClassYearCode, PrismaClient, Rating } from "@prisma/client";
import { writeFile } from "fs";

const prisma = new PrismaClient();

const main = async () => {
  // GET DATA
  // const teacher = await prisma.teacher.findUnique({
  //   where: { email: "ilmariaarela@gmail.com" },
  //   include: {
  //     groups: {
  //       include: {
  //         students: {
  //           include: {
  //             classYears: true,
  //           },
  //         },
  //         classYears: {
  //           include: {
  //             students: true,
  //             evaluationCollections: {
  //               include: {
  //                 evaluations: {
  //                   include: {
  //                     student: true,
  //                   },
  //                 },
  //               },
  //             },
  //           },
  //         },
  //       },
  //     },
  //   },
  // });
  // // console.log("Found data: ", teacher);
  // await writeFile("src/ilmari.json", JSON.stringify(teacher), (err) => {
  //   console.error(err);
  // });
  // console.log("Data written to ilmari.json");
  // WRITE DATA
  // const teacher = await prisma.teacher.findUnique({
  //   where: {
  //     email: "ilmariaarela@gmail.com",
  //   },
  // });
  // if (!teacher) throw new Error("Teacher not found");
  // const promises = data.groups.map(async (group) => {
  //   const { students, classYears, teacherId, ...groupData } = group;
  //   const groupPromise = await prisma.group.create({
  //     data: {
  //       ...groupData,
  //       teacherId: teacher.id,
  //       currentYearCode: groupData.currentYearCode as ClassYearCode,
  //     },
  //   });
  //   const studentPromises = students.map(({ classYears: studentClassYears, ...studentData }) => {
  //     return prisma.student.create({
  //       data: {
  //         ...studentData,
  //       },
  //     });
  //   });
  //   await Promise.all(studentPromises);
  //   const classYearsPromises = classYears.map(async ({ evaluationCollections, students: classYearStudents, ...classYearData }) => {
  //     const classYearPromise = await prisma.classYear.create({
  //       data: {
  //         ...classYearData,
  //         code: classYearData.code as ClassYearCode,
  //         students: {
  //           connect: classYearStudents.map((student) => ({ id: student.id })),
  //         },
  //       },
  //     });
  //     const evaluationCollectionPromises = evaluationCollections.map(async ({ evaluations, ...collectionData }) => {
  //       const evaluationCollectionPromise = await prisma.evaluationCollection.create({
  //         data: {
  //           ...collectionData,
  //         },
  //       });
  //       const evaluationPromises = evaluations.map(async ({ studentId, evaluationCollectionId, ...evaluationData }) => {
  //         return prisma.evaluation.create({
  //           data: {
  //             ...evaluationData,
  //             skillsRating: evaluationData.skillsRating as Rating,
  //             behaviourRating: evaluationData.behaviourRating as Rating,
  //             student: {
  //               connect: { id: studentId },
  //             },
  //             evaluationCollection: {
  //               connect: { id: evaluationCollectionId },
  //             },
  //           },
  //         });
  //       });
  //       return Promise.all([evaluationCollectionPromise, ...evaluationPromises]);
  //     });
  //     return Promise.all([classYearPromise, ...evaluationCollectionPromises]);
  //   });
  //   return Promise.all([classYearsPromises, studentPromises, groupPromise]);
  // });
  // await Promise.all(promises);
};

main();
