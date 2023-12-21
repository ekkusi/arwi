import { graphql } from "../gql";
import createServer, { TestGraphQLRequest } from "../createTestServer";
import prisma from "@/prismaClient";
import { TestTeacher, createTestEvaluationCollection, createTestGroup, createTestUserAndLogin, testLogin } from "../testHelpers";

describe("deleteCollection", () => {
  let graphqlRequest: TestGraphQLRequest;
  let teacher: TestTeacher;
  let collectionId: string;

  beforeAll(async () => {
    ({ graphqlRequest } = await createServer());
    teacher = await createTestUserAndLogin(graphqlRequest);
  });

  beforeEach(async () => {
    const group = await createTestGroup(teacher.id); // Assuming createTestGroup exists
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
});
