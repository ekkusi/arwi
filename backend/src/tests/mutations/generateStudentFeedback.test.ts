import { CollectionType, EvaluationCollection, Student } from "@prisma/client";
import { graphql } from "../graphql";
import createServer, { TestGraphQLRequest } from "../createTestServer";
import prisma from "@/prismaClient";
import {
  TestGroup,
  TestTeacher,
  createTestDefaultEvaluation,
  createTestDefaultEvaluationCollection,
  createTestEvaluation,
  createTestEvaluationCollection,
  createTestGroup,
  createTestUserAndLogin,
  testLogin,
} from "../testHelpers";
import { feedbacksLoader } from "@/graphql/dataLoaders/feedback";
import { collectionsByModuleLoader } from "@/graphql/dataLoaders/collection";
import { MIN_EVALS_FOR_FEEDBACK } from "@/config";

const query = graphql(`
  mutation GenerateStudentFeedbackTest($studentId: ID!, $moduleId: ID!) {
    generateStudentFeedback(studentId: $studentId, moduleId: $moduleId) {
      feedback {
        id
        text
      }
    }
  }
`);

describe("generateStudentFeedback", () => {
  let graphqlRequest: TestGraphQLRequest;
  let teacher: TestTeacher;
  let group: TestGroup;
  let student: Student;
  let classParticipationCollection: EvaluationCollection;
  let examCollection: EvaluationCollection;
  let classParticipationCollectionType: CollectionType;
  let examCollectionType: CollectionType;

  beforeAll(async () => {
    ({ graphqlRequest } = await createServer());
    teacher = await createTestUserAndLogin(graphqlRequest);
    group = await createTestGroup(teacher.id);
    [student] = group.students;
    classParticipationCollectionType = group.currentModule.collectionTypes.find(
      (collectionType) => collectionType.category === "CLASS_PARTICIPATION"
    )!;
    examCollectionType = group.currentModule.collectionTypes.find((collectionType) => collectionType.category === "EXAM")!;
    classParticipationCollection = await createTestEvaluationCollection(group.currentModuleId, classParticipationCollectionType.id);
    examCollection = await createTestDefaultEvaluationCollection(group.currentModuleId, examCollectionType.id);
  });

  beforeEach(async () => {
    const createEvaluationsPromises = [7, 8].map((rating) => {
      return createTestEvaluation(classParticipationCollection.id, student.id, { skillsRating: rating });
    });
    const examEvaluationPromise = createTestDefaultEvaluation(examCollection.id, student.id);
    await Promise.all([...createEvaluationsPromises, examEvaluationPromise]);
  });

  afterEach(async () => {
    await prisma.evaluation.deleteMany();
    await prisma.feedback.deleteMany();
  });

  it("should successfully generate student feedback", async () => {
    const response = await graphqlRequest(query, { studentId: student.id, moduleId: group.currentModuleId });

    expect(response.data?.generateStudentFeedback).toBeDefined();
    expect(response.data?.generateStudentFeedback.feedback.text).toContain("Mock response from OpenAI");
  });

  it("should throw error if user is not authorized for the student", async () => {
    const unauthorizedTeacher = await createTestUserAndLogin(graphqlRequest, {
      email: "unauthorized@example.com",
      password: "password",
    });

    const response = await graphqlRequest(query, { studentId: student.id, moduleId: group.currentModuleId });

    expect(response.errors).toBeDefined();
    expect(response.errors?.[0].message).toContain("Haettu oppilas ei kuulu sinun oppilaisiin");

    // Cleanup
    await prisma.teacher.delete({ where: { id: unauthorizedTeacher.id } });
    await testLogin(graphqlRequest);
  });

  it("should throw error if student does not exist", async () => {
    const invalidStudentId = "nonexistent_student_id";

    const response = await graphqlRequest(query, { studentId: invalidStudentId, moduleId: group.currentModuleId });

    expect(response.errors).toBeDefined();
    expect(response.errors?.[0].message).toContain("Hakemaasi resurssia ei löytynyt. Tarkista syöttämäsi id:t.");
  });

  it("should handle no evaluations case gracefully", async () => {
    await prisma.evaluation.deleteMany();

    const response = await graphqlRequest(query, { studentId: student.id, moduleId: group.currentModuleId });

    expect(response.errors).toBeDefined();
    expect(response.errors?.[0].message).toContain(
      `Oppilaalla ei ole tarpeeksi arviointeja palautteen luomiseksi. Oppilaalla tulee olla vähintään ${MIN_EVALS_FOR_FEEDBACK} arviointia.`
    );
  });

  it("should update the DataLoader caches after generating feedback", async () => {
    // Fetch the initial state of the student from the DataLoaders
    const feedbacksFromLoader = await feedbacksLoader.load({ studentId: student.id, moduleId: group.currentModuleId });
    expect(feedbacksFromLoader).toEqual([]);

    // Execute the request
    await graphqlRequest(query, { studentId: student.id, moduleId: group.currentModuleId });

    // Fetch the updated state of the student from the DataLoaders
    const updatedFeedbacksFromLoader = await feedbacksLoader.load({ studentId: student.id, moduleId: group.currentModuleId });

    // Check that the student's latest feedback has been updated correctly
    expect(updatedFeedbacksFromLoader[0]).toEqual(expect.objectContaining({ text: "Mock response from OpenAI" }));
  });

  it("should throw an error if the non-class participation collection types have not been evaluated", async () => {
    // Remove the exam collection
    await prisma.evaluationCollection.deleteMany({ where: { typeId: examCollectionType.id } });
    collectionsByModuleLoader.clear(group.currentModuleId);
    // Execute the request
    const response = await graphqlRequest(query, { studentId: student.id, moduleId: group.currentModuleId });

    // Assert the expected error message for invalid ID is thrown
    expect(response.errors).toBeDefined();
    expect(response.errors?.[0].message).toContain(
      "Ryhmälle ei ole tehty kaikkia arviointeja. Tarkista, että ryhmälle on tehty arvioinnit kaikille ei-tuntityöskentely arviointityypeille."
    );

    // Add the exam collection back
    await createTestEvaluationCollection(group.currentModule.id, examCollectionType.id);
    collectionsByModuleLoader.clear(group.currentModuleId);
  });
});
