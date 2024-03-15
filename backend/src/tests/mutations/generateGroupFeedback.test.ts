import { CollectionType } from "@prisma/client";
import { graphql } from "../graphql";
import createServer, { TestGraphQLRequest } from "../createTestServer";
import prisma from "@/prismaClient";
import {
  TestGroup,
  TestTeacher,
  createTestUserAndLogin,
  createTestGroup,
  createTestUser,
  createTestEvaluationCollection,
  createTestEvaluation,
  createTestDefaultEvaluation,
  createTestDefaultEvaluationCollection,
} from "../testHelpers";
import { FEEDBACK_GENERATION_TOKEN_COST, MONTHLY_TOKEN_USE_LIMIT } from "@/config";
import { teacherLoader } from "@/graphql/dataLoaders/teacher";
import { updateTeacher } from "@/graphql/mutationWrappers/teacher";
import { feedbacksLoader } from "@/graphql/dataLoaders/feedback";
import { collectionsByModuleLoader } from "@/graphql/dataLoaders/collection";

const query = graphql(`
  mutation GenerateGroupFeedbackTest($groupId: ID!, $onlyGenerateMissing: Boolean) {
    generateGroupFeedback(groupId: $groupId, onlyGenerateMissing: $onlyGenerateMissing) {
      usageData {
        id
        monthlyTokensUsed
      }
      feedbacks {
        id
        text
        student {
          id
        }
      }
    }
  }
`);

describe("generateGroupFeedback", () => {
  let graphqlRequest: TestGraphQLRequest;
  let teacher: TestTeacher;
  let group: TestGroup;
  let classParticipationCollectionType: CollectionType;
  let examCollectionType: CollectionType;

  beforeAll(async () => {
    ({ graphqlRequest } = await createServer());
    teacher = await createTestUserAndLogin(graphqlRequest);
    group = await createTestGroup(teacher.id);
    classParticipationCollectionType = group.currentModule.collectionTypes.find(
      (collectionType) => collectionType.category === "CLASS_PARTICIPATION"
    )!;
    examCollectionType = group.currentModule.collectionTypes.find((collectionType) => collectionType.category === "EXAM")!;
  });

  beforeEach(async () => {
    const classParticipationCollectionPromises = [0, 0].map(() =>
      createTestEvaluationCollection(group.currentModule.id, classParticipationCollectionType.id)
    );
    const classParticipationCollections = await Promise.all(classParticipationCollectionPromises);
    const examCollection = await createTestDefaultEvaluationCollection(group.currentModule.id, examCollectionType.id);
    // Create 2 class participation evaluatins
    const studentPromises = group.students.map((student) => {
      const createEvaluationsPromises = [7, 8].map((rating, i) => {
        return createTestEvaluation(classParticipationCollections[i].id, student.id, { skillsRating: rating });
      });
      const examEvaluationPromise = createTestDefaultEvaluation(examCollection.id, student.id);
      return Promise.all([...createEvaluationsPromises, examEvaluationPromise]);
    });
    // Create exam evaluatin
    await Promise.all(studentPromises);
  });

  afterEach(async () => {
    await prisma.feedback.deleteMany();
    // await prisma.evaluation.deleteMany();
    await prisma.evaluationCollection.deleteMany();
    await updateTeacher(teacher.id, { data: { monthlyTokensUsed: 0 } });
  });

  it("should successfully generate feedbacks for all students in the group", async () => {
    // Execute the request
    const response = await graphqlRequest(query, { groupId: group.id });

    // Assertions to ensure correct functionality
    expect(response.data?.generateGroupFeedback).toBeDefined();
    expect(response.data?.generateGroupFeedback.feedbacks).toHaveLength(group.students.length);
    expect(response.data?.generateGroupFeedback.usageData.monthlyTokensUsed).toEqual(group.students.length * FEEDBACK_GENERATION_TOKEN_COST);

    response.data?.generateGroupFeedback.feedbacks.forEach((feedback) => {
      expect(feedback).toEqual(expect.objectContaining({ text: "Mock response from OpenAI" }));
    });
  });

  it("should throw an error if the user does not belong to the group", async () => {
    // Assume createTestGroup creates a group not belonging to the teacher
    const newTeacher = await createTestUser({ email: "other-test-user@email.com" });
    const otherGroup = await createTestGroup(newTeacher.id);

    // Execute the request
    const response = await graphqlRequest(query, { groupId: otherGroup.id });

    // Assert the expected AuthorizationError is thrown
    expect(response.errors).toBeDefined();
    expect(response.errors?.[0].message).toContain("Haettu ryhmä ei kuulu sinulle");
  });

  it("should throw an error if the user has insufficient tokens", async () => {
    // Setup user with insufficient tokens
    await prisma.teacher.update({
      where: { id: teacher.id },
      data: { monthlyTokensUsed: MONTHLY_TOKEN_USE_LIMIT }, // Assuming MONTHLY_TOKEN_USE_LIMIT is the limit
    });

    // Execute the request
    const response = await graphqlRequest(query, { groupId: group.id });

    // Assert the expected AuthorizationError is thrown
    expect(response.errors).toBeDefined();
    expect(response.errors?.[0].message).toContain("Kuukausittainen AI-toimintojen määrä on ylittynyt");
  });

  it("should update teacher's token usage correctly after feedback generation", async () => {
    // Execute the request
    await graphqlRequest(query, { groupId: group.id });

    // Check the teacher's token usage has been updated correctly
    const updatedTeacher = await prisma.teacher.findUnique({ where: { id: teacher.id } });
    expect(updatedTeacher?.monthlyTokensUsed).toEqual(group.students.length * FEEDBACK_GENERATION_TOKEN_COST);
  });
  // execute the request and check the teacher's token usage has been updated correctly

  it("should update the DataLoader caches after generating feedback", async () => {
    // Fetch the initial state of the student from the DataLoaders
    const teacherFromLoader = await teacherLoader.load(teacher.id);
    const feedbacksFromLoader = await feedbacksLoader.load({ studentId: group.students[0].id, moduleId: group.currentModuleId });
    expect(teacherFromLoader).toBeDefined();
    expect(teacherFromLoader.monthlyTokensUsed).toBe(0);
    expect(feedbacksFromLoader).toEqual([]);

    // Execute the request
    await graphqlRequest(query, { groupId: group.id });

    // Fetch the updated state of the teacher from the DataLoaders
    const updatedTeacherFromLoader = await teacherLoader.load(teacher.id);
    const updatedFeedbacksFromLoader = await feedbacksLoader.load({ studentId: group.students[0].id, moduleId: group.currentModuleId });

    // Check that the teacher's token usage has been updated correctly
    expect(updatedTeacherFromLoader).toBeDefined();
    expect(updatedTeacherFromLoader.monthlyTokensUsed).toEqual(group.students.length * FEEDBACK_GENERATION_TOKEN_COST);
    expect(updatedFeedbacksFromLoader[0]).toEqual(expect.objectContaining({ text: "Mock response from OpenAI" }));
  });

  it("should throw an error if the group ID does not exist", async () => {
    // Execute the request with a non-existing group ID
    const response = await graphqlRequest(query, { groupId: "nonExistingGroupId" });

    // Assert the expected error message for invalid ID is thrown
    expect(response.errors).toBeDefined();
    expect(response.errors?.[0].message).toContain("Hakemaasi resurssia ei löytynyt. Tarkista syöttämäsi id:t."); // Replace with actual error message for invalid ID
  });

  it("should throw an error if the non-class participation collection types have not been evaluated", async () => {
    // Remove the exam collection
    await prisma.evaluationCollection.deleteMany({ where: { typeId: examCollectionType.id } });
    collectionsByModuleLoader.clear(group.currentModuleId);
    // Execute the request
    const response = await graphqlRequest(query, { groupId: group.id });

    // Assert the expected error message for invalid ID is thrown
    expect(response.errors).toBeDefined();
    expect(response.errors?.[0].message).toContain(
      "Ryhmälle ei ole tehty kaikkia arviointeja. Tarkista, että ryhmälle on tehty arvioinnit kaikille ei-tuntityöskentely arviointityypeille."
    );

    // Add the exam collection back
    await createTestEvaluationCollection(group.currentModule.id, examCollectionType.id);
    collectionsByModuleLoader.clear(group.currentModuleId);
  });

  it("should not return feedbacks for students who don't have sufficient amount of evaluations", async () => {
    // Remove one evaluation for the first student
    const student = group.students[0];
    const evaluation = await prisma.evaluation.findFirst({ where: { studentId: student.id } });
    await prisma.evaluation.delete({ where: { id: evaluation!.id } });

    // Execute the request
    const response = await graphqlRequest(query, { groupId: group.id });

    // Assert that first student feedbacks is an empty array
    expect(response.data?.generateGroupFeedback).toBeDefined();

    const studentFeedbacks = response.data?.generateGroupFeedback.feedbacks.filter((feedback) => feedback.student.id === student.id);
    expect(studentFeedbacks).toHaveLength(0);
  });

  it("should not return feedbacks for students who don't have sufficient amount of participations", async () => {
    // Update one evaluation for the first student to not present
    const student = group.students[0];
    const evaluation = await prisma.evaluation.findFirst({ where: { studentId: student.id } });
    await prisma.evaluation.update({ where: { id: evaluation!.id }, data: { wasPresent: false } });

    // Execute the request
    const response = await graphqlRequest(query, { groupId: group.id });

    // Assert that first student feedbacks is an empty array
    expect(response.data?.generateGroupFeedback).toBeDefined();

    const studentFeedbacks = response.data?.generateGroupFeedback.feedbacks.filter((feedback) => feedback.student.id === student.id);
    expect(studentFeedbacks).toHaveLength(0);
  });

  it("should not return feedbacks for students who don't have sufficient amount of evaluations with data", async () => {
    // Update one class participation evaluation for the first student to not have skillsRating
    const firstStudent = group.students[0];
    const classParticipationEvaluation = await prisma.evaluation.findFirst({
      where: { studentId: firstStudent.id, evaluationCollection: { typeId: classParticipationCollectionType.id } },
    });
    await prisma.evaluation.update({ where: { id: classParticipationEvaluation!.id }, data: { skillsRating: null } });

    // Update one exam evaluation for the second student to not have generalRating
    const secondStudent = group.students[1];
    const defaultEvaluation = await prisma.evaluation.findFirst({
      where: { studentId: secondStudent.id, evaluationCollection: { typeId: examCollectionType.id } },
    });
    await prisma.evaluation.update({ where: { id: defaultEvaluation!.id }, data: { generalRating: null } });

    // Execute the request
    const response = await graphqlRequest(query, { groupId: group.id });

    // Assert that first student feedbacks is an empty array
    expect(response.data?.generateGroupFeedback).toBeDefined();

    const firstStudentFeedbacks = response.data?.generateGroupFeedback.feedbacks.filter((feedback) => feedback.student.id === firstStudent.id);
    expect(firstStudentFeedbacks).toHaveLength(0);
    const secondStudentFeedbacks = response.data?.generateGroupFeedback.feedbacks.filter((feedback) => feedback.student.id === secondStudent.id);
    expect(secondStudentFeedbacks).toHaveLength(0);
  });

  it("should not generate feedbacks for student that already have one when onlyGenerateMissing is passed as true", async () => {
    const student = group.students[0];
    await prisma.feedback.create({
      data: {
        text: "Mock response from OpenAI",
        studentId: student.id,
        moduleId: group.currentModuleId,
      },
    });
    // Generate feedbacks for the group
    const response = await graphqlRequest(query, { groupId: group.id, onlyGenerateMissing: true });

    // Assert that the student already having feedbacks is not included in the response
    expect(response.data?.generateGroupFeedback).toBeDefined();
    const matchingFeedbacks = response.data?.generateGroupFeedback.feedbacks.filter((feedback) => feedback.student.id === student.id);
    expect(matchingFeedbacks).toHaveLength(0);
  });

  it("should generate feedbacks for students that already have one when onlyGenerateMissing is not passed or passed as false", async () => {
    const student = group.students[0];
    await prisma.feedback.create({
      data: {
        text: "Mock response from OpenAI",
        studentId: student.id,
        moduleId: group.currentModuleId,
      },
    });
    // Generate feedbacks for the group
    const response = await graphqlRequest(query, { groupId: group.id, onlyGenerateMissing: false });

    // Assert that the student already having feedbacks is included in the response
    expect(response.data?.generateGroupFeedback).toBeDefined();
    expect(response.data?.generateGroupFeedback.feedbacks).toHaveLength(group.students.length);

    const secondResponse = await graphqlRequest(query, { groupId: group.id });

    expect(secondResponse.data?.generateGroupFeedback).toBeDefined();
    expect(secondResponse.data?.generateGroupFeedback.feedbacks).toHaveLength(group.students.length);
  });
});
