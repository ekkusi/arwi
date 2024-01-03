import { Student } from "@prisma/client";
import { graphql } from "../gql";
import createServer, { TestGraphQLRequest } from "../createTestServer";
import prisma from "@/prismaClient";
import {
  TestTeacher,
  createTestEvaluation,
  createTestEvaluationCollection,
  createTestGroup,
  createTestUserAndLogin,
  testLogin,
} from "../testHelpers";
import { collectionLoader, collectionsByModuleLoader } from "../../graphql/dataLoaders/collection";
import { evaluationLoader, evaluationsByCollectionLoader } from "../../graphql/dataLoaders/evaluation";

describe("deleteCollection", () => {
  let graphqlRequest: TestGraphQLRequest;
  let teacher: TestTeacher;
  let collectionId: string;
  let student: Student;

  beforeAll(async () => {
    ({ graphqlRequest } = await createServer());
    teacher = await createTestUserAndLogin(graphqlRequest);
  });

  beforeEach(async () => {
    const group = await createTestGroup(teacher.id); // Assuming createTestGroup exists
    [student] = group.students;
    const typeId = group.collectionTypes[0].id;
    const collection = await createTestEvaluationCollection(group.currentModule.id, typeId); // Assuming createTestCollection exists
    collectionId = collection.id;
  });

  afterEach(async () => {
    await prisma.evaluationCollection.deleteMany();
  });

  it("should successfully delete a collection", async () => {
    const query = graphql(`
      mutation DeleteCollection($collectionId: ID!) {
        deleteCollection(collectionId: $collectionId) {
          id
        }
      }
    `);

    const response = await graphqlRequest(query, { collectionId });

    expect(response.data?.deleteCollection).toBeDefined();
    expect(response.data?.deleteCollection.id).toEqual(collectionId);
  });

  it("should throw error if user is not authorized for the collection", async () => {
    const unauthorizedTeacher = await createTestUserAndLogin(graphqlRequest, { email: "new-user@email.com", password: "password" });

    const query = graphql(`
      mutation DeleteCollectionUnauthorized($collectionId: ID!) {
        deleteCollection(collectionId: $collectionId) {
          id
          description
        }
      }
    `);
    const response = await graphqlRequest(query, { collectionId });

    expect(response.errors).toBeDefined();
    expect(response.errors?.[0].message).toContain("Haettu arviointikokoelma ei kuulu sinulle");

    // Cleanup: delete unauthorized teacher and re-login as the original teacher
    await prisma.teacher.delete({ where: { id: unauthorizedTeacher.id } });
    await testLogin(graphqlRequest);
  });

  it("should throw error for invalid collection ID", async () => {
    const invalidCollectionId = "invalid_id";

    const query = graphql(`
      mutation DeleteCollectionInvalidID($collectionId: ID!) {
        deleteCollection(collectionId: $collectionId) {
          id
        }
      }
    `);

    const response = await graphqlRequest(query, { collectionId: invalidCollectionId });

    expect(response.errors).toBeDefined();
    expect(response.errors?.[0].message).toContain("Hakemaasi resurssia ei löytynyt. Tarkista syöttämäsi id:t.");
  });
  it("should update DataLoaders and throw errors after deleting a collection and its associated evaluations", async () => {
    const evaluation = await createTestEvaluation(collectionId, student.id);
    // Fetch initial state from DataLoaders
    const collectionFromDataLoaderBeforeDelete = await collectionLoader.load(collectionId);
    const collectionsFromModuleLoaderBeforeDelete = await collectionsByModuleLoader.load(collectionFromDataLoaderBeforeDelete.moduleId);
    expect(collectionFromDataLoaderBeforeDelete).toBeDefined();
    expect(collectionsFromModuleLoaderBeforeDelete).toContainEqual(expect.objectContaining({ id: collectionId }));

    // Load evaluations from DataLoaders to cache them
    await Promise.all([evaluationLoader.load(evaluation.id), evaluationsByCollectionLoader.load(collectionId)]);

    // Delete the collection
    const deleteCollectionQuery = graphql(`
      mutation DeleteCollectionDataLoaderCheck($collectionId: ID!) {
        deleteCollection(collectionId: $collectionId) {
          id
        }
      }
    `);

    await graphqlRequest(deleteCollectionQuery, { collectionId });

    // Assert DataLoader errors for deleted collection and its associated evaluations
    await expect(collectionLoader.load(collectionId)).rejects.toThrowError("Hakemaasi resurssia ei löytynyt. Tarkista syöttämäsi id:t.");
    const updatedCollectionsFromModuleLoader = await collectionsByModuleLoader.load(collectionFromDataLoaderBeforeDelete.moduleId);
    expect(updatedCollectionsFromModuleLoader).not.toContainEqual(expect.objectContaining({ id: collectionId }));

    // Check if evaluation DataLoaders are cleared
    await Promise.all([
      expect(evaluationLoader.load(evaluation.id)).rejects.toThrowError("Hakemaasi resurssia ei löytynyt. Tarkista syöttämäsi id:t."),
      expect(evaluationsByCollectionLoader.load(collectionId)).resolves.not.toContainEqual(expect.objectContaining({ id: evaluation.id })),
    ]);
  });
});
