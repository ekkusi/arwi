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
  });

  it("should successfully generate student feedback", async () => {
    const query = graphql(`
      mutation GenerateStudentFeedbackValid($studentId: ID!, $moduleId: ID!) {
        generateStudentFeedback(studentId: $studentId, moduleId: $moduleId) {
          result
        }
      }
    `);

    const response = await graphqlRequest(query, { studentId: student.id, moduleId: group.currentModuleId });

    expect(response.data?.generateStudentFeedback).toBeDefined();
    expect(response.data?.generateStudentFeedback.result).toContain("Mock response from OpenAI");
  });

  it("should throw error if user is not authorized for the student", async () => {
    const unauthorizedTeacher = await createTestUserAndLogin(graphqlRequest, {
      email: "unauthorized@example.com",
      password: "password",
    });

    const query = graphql(`
      mutation GenerateStudentFeedbackUnAuthorized($studentId: ID!, $moduleId: ID!) {
        generateStudentFeedback(studentId: $studentId, moduleId: $moduleId) {
          result
        }
      }
    `);

    const response = await graphqlRequest(query, { studentId: student.id, moduleId: group.currentModuleId });

    expect(response.errors).toBeDefined();
    expect(response.errors?.[0].message).toContain("Haettu oppilas ei kuulu sinun oppilaisiin");

    // Cleanup
    await prisma.teacher.delete({ where: { id: unauthorizedTeacher.id } });
    await testLogin(graphqlRequest);
  });

  it("should throw error if student does not exist", async () => {
    const invalidStudentId = "nonexistent_student_id";

    const query = graphql(`
      mutation GenerateStudentFeedbackStudentDoesntExist($studentId: ID!, $moduleId: ID!) {
        generateStudentFeedback(studentId: $studentId, moduleId: $moduleId) {
          result
        }
      }
    `);

    const response = await graphqlRequest(query, { studentId: invalidStudentId, moduleId: group.currentModuleId });

    expect(response.errors).toBeDefined();
    expect(response.errors?.[0].message).toContain("Hakemaasi resurssia ei löytynyt. Tarkista syöttämäsi id:t.");
  });

  it("should handle no evaluations case gracefully", async () => {
    await prisma.evaluation.deleteMany();

    const query = graphql(`
      mutation GenerateStudentFeedbackNoEvaluation($studentId: ID!, $moduleId: ID!) {
        generateStudentFeedback(studentId: $studentId, moduleId: $moduleId) {
          result
        }
      }
    `);

    const response = await graphqlRequest(query, { studentId: student.id, moduleId: group.currentModuleId });

    expect(response.errors).toBeDefined();
    expect(response.errors?.[0].message).toContain("Oppilaalla ei ole vielä arviointeja, palautetta ei voida generoida");
  });
});
