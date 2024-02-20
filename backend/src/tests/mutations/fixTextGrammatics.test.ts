import { Student } from "@prisma/client";
import { graphql } from "../gql";
import createServer, { TestGraphQLRequest } from "../createTestServer";
import prisma from "@/prismaClient";
import { createTestUserAndLogin, createTestGroup, TestTeacher, testLogin } from "../testHelpers";

describe("fixTextGrammatics", () => {
  let graphqlRequest: TestGraphQLRequest;
  let teacher: TestTeacher;
  let student: Student;

  beforeAll(async () => {
    ({ graphqlRequest } = await createServer());
    teacher = await createTestUserAndLogin(graphqlRequest);
    const group = await createTestGroup(teacher.id);
    [student] = group.students;
  });

  it("should successfully fix text grammatics", async () => {
    const query = graphql(`
      mutation FixTextGrammaticsValidInput($studentId: ID!, $text: String!) {
        fixTextGrammatics(studentId: $studentId, text: $text) {
          result
        }
      }
    `);

    const text = "Test text with grammatical errors";
    const response = await graphqlRequest(query, { studentId: student.id, text });

    expect(response.data?.fixTextGrammatics).toBeDefined();
    expect(response.data?.fixTextGrammatics.result).toEqual("Mock response from OpenAI");
  });

  it("should throw error if user is not authorized for the student", async () => {
    const unauthorizedTeacher = await createTestUserAndLogin(graphqlRequest, {
      email: "unauthorized@example.com",
      password: "password",
    });

    const query = graphql(`
      mutation FixTextGrammaticsUnauthorized($studentId: ID!, $text: String!) {
        fixTextGrammatics(studentId: $studentId, text: $text) {
          result
        }
      }
    `);

    const text = "Test text";
    const response = await graphqlRequest(query, { studentId: student.id, text });

    expect(response.errors).toBeDefined();
    expect(response.errors?.[0].message).toContain("Haettu oppilas ei kuulu sinun oppilaisiin");

    // Cleanup
    await prisma.teacher.delete({ where: { id: unauthorizedTeacher.id } });
    await testLogin(graphqlRequest);
  });

  it("should throw error if student does not exist", async () => {
    const invalidStudentId = "nonexistent_student_id";
    const query = graphql(`
      mutation FixTextGrammaticsInvalidStudent($studentId: ID!, $text: String!) {
        fixTextGrammatics(studentId: $studentId, text: $text) {
          result
        }
      }
    `);

    const text = "Test text";
    const response = await graphqlRequest(query, { studentId: invalidStudentId, text });

    expect(response.errors).toBeDefined();
    expect(response.errors?.[0].message).toContain("Hakemaasi resurssia ei löytynyt. Tarkista syöttämäsi id:t.");
  });

  it("should handle empty text input gracefully", async () => {
    const query = graphql(`
      mutation FixTextGrammaticsEmptyText($studentId: ID!, $text: String!) {
        fixTextGrammatics(studentId: $studentId, text: $text) {
          result
        }
      }
    `);

    const response = await graphqlRequest(query, { studentId: student.id, text: "" });

    expect(response.errors).toBeDefined();
    expect(response.errors?.[0].message).toContain("Tekstiä ei ole annettu. Tyhjää tekstiä ei voida korjata.");
  });
});
