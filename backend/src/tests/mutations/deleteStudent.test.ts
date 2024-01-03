import { CollectionTypeCategory, Student } from "@prisma/client";
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
import { studentLoader, studentsByGroupLoader } from "../../graphql/dataLoaders/student";
import { evaluationLoader, evaluationsByCollectionLoader } from "../../graphql/dataLoaders/evaluation";

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

  it("should update DataLoaders after deleting a student", async () => {
    // Create a collection and evaluation for the student
    const collection = await createTestEvaluationCollection(
      group.currentModuleId,
      group.collectionTypes.find((type) => type.category === CollectionTypeCategory.CLASS_PARTICIPATION)!.id
    );
    const evaluation = await createTestEvaluation(collection.id, student.id);

    // Fetch initial state from DataLoaders
    const studentFromDataLoaderBeforeDelete = await studentLoader.load(student.id);
    const studentsFromGroupLoaderBeforeDelete = await studentsByGroupLoader.load(group.id);
    expect(studentFromDataLoaderBeforeDelete).toEqual(student);
    expect(studentsFromGroupLoaderBeforeDelete).toContainEqual(student);

    // Load evaluations from DataLoaders to cache them
    await Promise.all([evaluationLoader.load(evaluation.id), evaluationsByCollectionLoader.load(collection.id)]);

    // Delete the student
    const deleteStudentQuery = graphql(`
      mutation DeleteStudentDataLoaderCheck($studentId: ID!) {
        deleteStudent(studentId: $studentId) {
          id
        }
      }
    `);

    await graphqlRequest(deleteStudentQuery, { studentId: student.id });

    // Expect to throw an error when trying to fetch the deleted student from the DataLoader
    await expect(studentLoader.load(student.id)).rejects.toThrowError("Hakemaasi resurssia ei löytynyt. Tarkista syöttämäsi id:t.");

    // Fetch updated data from DataLoaders and expect the deleted student to be missing
    const updatedStudentsFromGroupLoader = await studentsByGroupLoader.load(group.id);
    expect(updatedStudentsFromGroupLoader).not.toContainEqual(expect.objectContaining({ id: student.id }));

    // Check if evaluation DataLoaders are cleared
    await Promise.all([
      expect(evaluationLoader.load(evaluation.id)).rejects.toThrowError("Hakemaasi resurssia ei löytynyt. Tarkista syöttämäsi id:t."),
      expect(evaluationsByCollectionLoader.load(collection.id)).resolves.not.toContainEqual(expect.objectContaining({ id: evaluation.id })),
    ]);
  });
});
