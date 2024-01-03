import { graphql } from "../gql";
import createServer, { TestGraphQLRequest } from "../createTestServer";
import prisma from "@/prismaClient";
import { TestGroup, TestTeacher, createTestGroup, createTestUserAndLogin } from "../testHelpers";
import { studentLoader, studentsByGroupLoader } from "../../graphql/dataLoaders/student";

describe("CreateStudent", () => {
  let graphqlRequest: TestGraphQLRequest;
  let teacher: TestTeacher;
  let group: TestGroup;

  beforeAll(async () => {
    ({ graphqlRequest } = await createServer());

    teacher = await createTestUserAndLogin(graphqlRequest);
    group = await createTestGroup(teacher.id);
  });

  afterEach(async () => {
    await prisma.student.deleteMany();
  });

  it("should successfully create a student", async () => {
    const studentData = {
      name: "Test Student",
    };

    const query = graphql(`
      mutation CreateStudent($data: CreateStudentInput!, $moduleId: ID!) {
        createStudent(data: $data, moduleId: $moduleId) {
          id
          name
          group {
            id
          }
        }
      }
    `);

    const response = await graphqlRequest(query, { data: studentData, moduleId: group.currentModule.id });

    expect(response.data?.createStudent).toBeDefined();
    expect(response.data?.createStudent.name).toEqual(studentData.name);
    expect(response.data?.createStudent.group.id).toEqual(group.id);
  });

  it("should throw error for duplicate student name in the same group", async () => {
    // First, create a student with a specific name
    const initialStudentData = {
      name: "Duplicate Student",
    };
    await prisma.student.create({
      data: {
        ...initialStudentData,
        groupId: group.id,
        modules: {
          connect: {
            id: group.currentModule.id,
          },
        },
      },
    });

    // Then, attempt to create another student with the same name in the same group
    const duplicateStudentData = {
      name: "Duplicate Student",
    };

    const response = await graphqlRequest(
      graphql(`
        mutation CreateDuplicateStudent($data: CreateStudentInput!, $moduleId: ID!) {
          createStudent(data: $data, moduleId: $moduleId) {
            id
          }
        }
      `),
      { data: duplicateStudentData, moduleId: group.currentModule.id }
    );

    // Check for the expected error
    expect(response.errors).toBeDefined();
    expect(response.errors?.[0].message).toContain(`Vuosiluokassa on jo '${duplicateStudentData.name}' niminen oppilas`);
  });

  it("should update DataLoaders after creating a student", async () => {
    // Initial DataLoader state
    const initialStudentsByGroup = await studentsByGroupLoader.load(group.id);
    expect(initialStudentsByGroup).toEqual([]);

    // Create a student
    const studentData = {
      name: "New Student",
    };

    const query = graphql(`
      mutation CreateStudentDataLoaderCheck($data: CreateStudentInput!, $moduleId: ID!) {
        createStudent(data: $data, moduleId: $moduleId) {
          id
          name
        }
      }
    `);

    const createStudentResponse = await graphqlRequest(query, { data: studentData, moduleId: group.currentModule.id });
    const newStudentId = createStudentResponse.data?.createStudent.id;
    expect(newStudentId).toBeDefined();

    // Check if the student is correctly loaded in studentLoader
    const newStudent = await studentLoader.load(newStudentId!);
    expect(newStudent).toEqual(expect.objectContaining({ id: newStudentId, name: studentData.name }));

    // Check if the studentsByGroupLoader is updated
    const updatedStudentsByGroup = await studentsByGroupLoader.load(group.id);
    expect(updatedStudentsByGroup).toContainEqual(expect.objectContaining({ id: newStudentId, name: studentData.name }));
  });
});
