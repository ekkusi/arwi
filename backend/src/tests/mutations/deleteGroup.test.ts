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
import { groupLoader, groupsByTeacherLoader } from "../../graphql/dataLoaders/group";
import { evaluationLoader, evaluationsByCollectionLoader } from "../../graphql/dataLoaders/evaluation";
import { moduleLoader, modulesByGroupLoader } from "../../graphql/dataLoaders/module";
import { collectionLoader, collectionsByModuleLoader } from "../../graphql/dataLoaders/collection";
import { studentLoader, studentsByGroupLoader } from "../../graphql/dataLoaders/student";
import { collectionTypeLoader, collectionTypesByGroupLoader } from "../../graphql/dataLoaders/collectionType";

describe("deleteGroup", () => {
  let graphqlRequest: TestGraphQLRequest;
  let teacher: TestTeacher;
  let group: TestGroup;
  let student: Student;

  beforeAll(async () => {
    ({ graphqlRequest } = await createServer());
    teacher = await createTestUserAndLogin(graphqlRequest);
  });

  beforeEach(async () => {
    group = await createTestGroup(teacher.id); // Assuming createTestGroup exists
    [student] = group.students;
  });

  afterEach(async () => {
    await prisma.group.deleteMany();
  });

  it("should successfully delete a group", async () => {
    const query = graphql(`
      mutation DeleteGroup($groupId: ID!) {
        deleteGroup(groupId: $groupId) {
          id
        }
      }
    `);

    const response = await graphqlRequest(query, { groupId: group.id });

    expect(response.data?.deleteGroup).toBeDefined();
    expect(response.data?.deleteGroup.id).toEqual(group.id);
  });

  it("should throw error if user is not authorized for the group", async () => {
    const unauthorizedTeacher = await createTestUserAndLogin(graphqlRequest, { email: "new-user@email.com", password: "password" });

    const query = graphql(`
      mutation DeleteGroupUnauthorized($groupId: ID!) {
        deleteGroup(groupId: $groupId) {
          id
        }
      }
    `);

    const response = await graphqlRequest(query, { groupId: group.id });

    expect(response.errors).toBeDefined();
    expect(response.errors?.[0].message).toContain("Haettu ryhmä ei kuulu sinulle");

    // Cleanup: delete unauthorized teacher and re-login as the original teacher
    await prisma.teacher.delete({ where: { id: unauthorizedTeacher.id } });
    await testLogin(graphqlRequest);
  });

  it("should throw error for invalid group ID", async () => {
    const invalidGroupId = "invalid_id";

    const query = graphql(`
      mutation DeleteGroupInvalidID($groupId: ID!) {
        deleteGroup(groupId: $groupId) {
          id
        }
      }
    `);

    const response = await graphqlRequest(query, { groupId: invalidGroupId });

    expect(response.errors).toBeDefined();
    expect(response.errors?.[0].message).toContain(`Hakemaasi resurssia ei löytynyt. Tarkista syöttämäsi id:t.`);
  });

  it("should update DataLoaders and throw errors after deleting a group and its related entities", async () => {
    // Create a collection and evaluation
    const collectionType = group.collectionTypes.find((type) => type.category === CollectionTypeCategory.CLASS_PARTICIPATION)!;
    const collection = await createTestEvaluationCollection(group.currentModuleId, collectionType.id);
    const evaluation = await createTestEvaluation(collection.id, student.id);

    // Fetch initial state from DataLoaders
    const groupFromGroupLoaderBeforeDelete = await groupLoader.load(group.id);
    const groupsFromTeacherLoaderBeforeDelete = await groupsByTeacherLoader.load(teacher.id);
    expect(groupFromGroupLoaderBeforeDelete).toBeDefined();
    expect(groupsFromTeacherLoaderBeforeDelete).toContainEqual(expect.objectContaining({ id: group.id }));

    // Fetch all related data DataLoaders before delete
    await Promise.all([
      moduleLoader.load(group.currentModuleId),
      modulesByGroupLoader.load(group.id),
      collectionLoader.load(collection.id),
      collectionsByModuleLoader.load(group.currentModuleId),
      evaluationLoader.load(evaluation.id),
      evaluationsByCollectionLoader.load(collection.id),
      studentLoader.load(student.id),
      studentsByGroupLoader.load(group.id),
      collectionTypeLoader.load(collectionType.id),
      collectionTypesByGroupLoader.load(group.id),
    ]);

    // Delete the group
    const deleteGroupQuery = graphql(`
      mutation DeleteGroupDataLoaderCheck($groupId: ID!) {
        deleteGroup(groupId: $groupId) {
          id
        }
      }
    `);

    await graphqlRequest(deleteGroupQuery, { groupId: group.id });

    // Assert DataLoader errors for deleted group and its related entities
    await Promise.all([
      expect(groupLoader.load(group.id)).rejects.toThrowError("Hakemaasi resurssia ei löytynyt. Tarkista syöttämäsi id:t."),
      expect(groupsByTeacherLoader.load(teacher.id)).resolves.not.toContainEqual(expect.objectContaining({ id: group.id })),
      expect(moduleLoader.load(group.currentModuleId)).rejects.toThrowError("Hakemaasi resurssia ei löytynyt. Tarkista syöttämäsi id:t."),
      expect(modulesByGroupLoader.load(group.id)).resolves.not.toContainEqual(expect.objectContaining({ id: group.currentModuleId })),
      expect(collectionLoader.load(collection.id)).rejects.toThrowError("Hakemaasi resurssia ei löytynyt. Tarkista syöttämäsi id:t."),
      expect(collectionsByModuleLoader.load(group.currentModuleId)).resolves.not.toContainEqual(expect.objectContaining({ id: collection.id })),
      expect(evaluationLoader.load(evaluation.id)).rejects.toThrowError("Hakemaasi resurssia ei löytynyt. Tarkista syöttämäsi id:t."),
      expect(evaluationsByCollectionLoader.load(collection.id)).resolves.not.toContainEqual(expect.objectContaining({ id: evaluation.id })),
      expect(studentLoader.load(student.id)).rejects.toThrowError("Hakemaasi resurssia ei löytynyt. Tarkista syöttämäsi id:t."),
      expect(studentsByGroupLoader.load(group.id)).resolves.not.toContainEqual(expect.objectContaining({ id: student.id })),
      expect(collectionTypeLoader.load(collectionType.id)).rejects.toThrowError("Hakemaasi resurssia ei löytynyt. Tarkista syöttämäsi id:t."),
      expect(collectionTypesByGroupLoader.load(group.id)).resolves.not.toContainEqual(expect.objectContaining({ id: collectionType.id })),
    ]);
  });
});
