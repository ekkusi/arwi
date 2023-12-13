import { Student } from "@prisma/client";
import { graphql } from "../gql";
import createServer, { TestGraphQLRequest } from "../createTestServer";
import prisma from "@/prismaClient";
import { TestGroup, TestTeacher, createTestGroup, createTestUserAndLogin, testLogin } from "../testHelpers";

describe("deleteStudent", () => {
  let graphqlRequest: TestGraphQLRequest;
  let teacher: TestTeacher;
  let group: TestGroup;
  let student: Student;

  beforeAll(async () => {
    ({ graphqlRequest } = await createServer());
    teacher = await createTestUserAndLogin(graphqlRequest);
  });

  beforeEach(async () => {
    group = await createTestGroup(teacher.id);
    [student] = group.students;
  });

  afterEach(async () => {
    await prisma.group.deleteMany();
  });

  it("should successfully delete a student", async () => {
    const query = graphql(`
      mutation DeleteStudent($studentId: ID!) {
        deleteStudent(studentId: $studentId) {
          id
        }
      }
    `);

    const response = await graphqlRequest(query, { studentId: student.id });

    expect(response.data?.deleteStudent).toBeDefined();
    expect(response.data?.deleteStudent.id).toEqual(student.id);
  });

  it("should throw error if user is not authorized for the student", async () => {
    const unauthorizedTeacher = await createTestUserAndLogin(graphqlRequest, { email: "new-user@email.com", password: "password" });

    const query = graphql(`
      mutation DeleteStudentUnauthorized($studentId: ID!) {
        deleteStudent(studentId: $studentId) {
          id
        }
      }
    `);

    const response = await graphqlRequest(query, { studentId: student.id });

    expect(response.errors).toBeDefined();
    expect(response.errors?.[0].message).toContain("Haettu oppilas ei kuulu sinun oppilaisiin");

    // Cleanup: delete unauthorized teacher and re-login as the original teacher
    await prisma.teacher.delete({ where: { id: unauthorizedTeacher.id } });
    await testLogin(graphqlRequest);
  });

  it("should throw error for invalid student ID", async () => {
    const invalidStudentId = "invalid_id";

    const query = graphql(`
      mutation DeleteStudentInvalidID($studentId: ID!) {
        deleteStudent(studentId: $studentId) {
          id
        }
      }
    `);

    const response = await graphqlRequest(query, { studentId: invalidStudentId });

    expect(response.errors).toBeDefined();
    expect(response.errors?.[0].message).toContain(`Hakemaasi resurssia ei löytynyt. Tarkista syöttämäsi id:t.`);
  });
});
