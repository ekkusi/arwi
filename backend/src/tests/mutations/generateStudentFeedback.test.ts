import { EvaluationCollection, Student } from "@prisma/client";
import { graphql } from "../gql";
import createServer, { TestGraphQLRequest } from "../createTestServer";
import prisma from "@/prismaClient";
import {
  TestGroup,
  TestTeacher,
  createTestEvaluation,
  createTestEvaluationCollection,
  createTestGroup,
  createTestUserAndLogin,
  testLogin,
} from "../testHelpers";
import { feedbacksLoader } from "@/graphql/dataLoaders/feedback";

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
  let collection: EvaluationCollection;

  beforeAll(async () => {
    ({ graphqlRequest } = await createServer());
    teacher = await createTestUserAndLogin(graphqlRequest);
    group = await createTestGroup(teacher.id);
    [student] = group.students;
    collection = await createTestEvaluationCollection(group.currentModuleId, group.currentModule.collectionTypes[0].id);
  });

  beforeEach(async () => {
    await createTestEvaluation(collection.id, student.id);
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
    expect(response.errors?.[0].message).toContain("Oppilaalla ei ole vielä arviointeja, palautetta ei voida generoida");
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
});
