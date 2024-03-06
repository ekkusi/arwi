import { Student } from "@prisma/client";
import { graphql } from "../graphql";
import createServer, { TestGraphQLRequest } from "../createTestServer";
import prisma from "@/prismaClient";
import { UpdateStudentInput } from "../../types";
import { TestGroup, TestTeacher, createTestGroup, createTestUserAndLogin, testLogin } from "../testHelpers";
import { studentLoader, studentsByGroupLoader } from "../../graphql/dataLoaders/student";

describe("updateStudent", () => {
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

  it("should successfully update a student", async () => {
    const updateData: UpdateStudentInput = {
      name: "Updated Student Name",
    };

    const query = graphql(`
      mutation UpdateStudent($data: UpdateStudentInput!, $studentId: ID!) {
        updateStudent(data: $data, studentId: $studentId) {
          id
          name
        }
      }
    `);

    const response = await graphqlRequest(query, { data: updateData, studentId: student.id });

    expect(response.data?.updateStudent).toBeDefined();
    expect(response.data?.updateStudent.id).toEqual(student.id);
    expect(response.data?.updateStudent.name).toEqual(updateData.name);
  });

  it("should throw error if user is not authorized for the student", async () => {
    const unauthorizedTeacher = await createTestUserAndLogin(graphqlRequest, {
      email: "new-user@email.com",
      password: "password",
    });
    const updateData: UpdateStudentInput = {
      name: "New Name",
    };

    const query = graphql(`
      mutation UpdateStudentUnauthorized($data: UpdateStudentInput!, $studentId: ID!) {
        updateStudent(data: $data, studentId: $studentId) {
          id
          name
        }
      }
    `);

    const response = await graphqlRequest(query, { data: updateData, studentId: student.id });

    expect(response.errors).toBeDefined();
    expect(response.errors?.[0].message).toContain("Haettu oppilas ei kuulu sinun oppilaisiin");

    // Delete the unauthorized teacher and login again to default one
    await prisma.teacher.delete({ where: { id: unauthorizedTeacher.id } });
    await testLogin(graphqlRequest);
  });

  it("should throw error for invalid student ID", async () => {
    const updateData: UpdateStudentInput = {
      name: "Updated Student Name",
    };
    const invalidStudentId = "invalid_id";

    const query = graphql(`
      mutation UpdateStudentInvalidID($data: UpdateStudentInput!, $studentId: ID!) {
        updateStudent(data: $data, studentId: $studentId) {
          id
          name
        }
      }
    `);

    const response = await graphqlRequest(query, { data: updateData, studentId: invalidStudentId });

    expect(response.errors).toBeDefined();
    expect(response.errors?.[0].message).toContain(`Hakemaasi resurssia ei löytynyt. Tarkista syöttämäsi id:t.`);
  });

  it("should throw error for duplicate student name in the same group", async () => {
    // Create another student with the same name in the same group
    const duplicateStudent = await prisma.student.create({
      data: {
        name: "New student",
        groupId: group.id,
        modules: {
          connect: [{ id: group.currentModuleId }],
        },
      },
    });

    const updateData: UpdateStudentInput = {
      name: student.name,
    };

    const query = graphql(`
      mutation UpdateStudentDuplicateName($data: UpdateStudentInput!, $studentId: ID!) {
        updateStudent(data: $data, studentId: $studentId) {
          id
          name
        }
      }
    `);

    const response = await graphqlRequest(query, { data: updateData, studentId: duplicateStudent.id });

    expect(response.errors).toBeDefined();
    expect(response.errors?.[0].message).toContain(
      `Ryhmässä on jo '${student.name}' niminen oppilas. Ryhmässä ei voi olla kahta samannimistä oppilasta.`
    );

    // Clean up: delete the created duplicate student
    await prisma.student.delete({ where: { id: duplicateStudent.id } });
  });

  it("should update DataLoaders after updating a student", async () => {
    // Fetch the initial state of the student from the DataLoaders
    const studentFromDataLoaderBeforeUpdate = await studentLoader.load(student.id);
    const studentsFromGroupLoaderBeforeUpdate = await studentsByGroupLoader.load(group.id);
    expect(studentFromDataLoaderBeforeUpdate).toEqual(student);
    expect(studentsFromGroupLoaderBeforeUpdate).toContainEqual(student);

    // Update the student
    const updateData: UpdateStudentInput = {
      name: "Updated Student Name",
    };

    const query = graphql(`
      mutation UpdateStudentDataLoaderCheck($data: UpdateStudentInput!, $studentId: ID!) {
        updateStudent(data: $data, studentId: $studentId) {
          id
          name
        }
      }
    `);

    await graphqlRequest(query, { data: updateData, studentId: student.id });

    // Fetch the updated student from the DataLoaders
    const updatedStudentFromDataLoader = await studentLoader.load(student.id);
    const updatedStudentsFromGroupLoader = await studentsByGroupLoader.load(group.id);

    // Assert that the DataLoaders reflect the updated student information
    expect(updatedStudentFromDataLoader).toEqual(expect.objectContaining(updateData));
    expect(updatedStudentsFromGroupLoader).toContainEqual(expect.objectContaining(updateData));
  });
});
