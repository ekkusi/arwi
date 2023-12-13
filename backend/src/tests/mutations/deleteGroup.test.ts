import { graphql } from "../gql";
import createServer, { TestGraphQLRequest } from "../createTestServer";
import prisma from "@/prismaClient";
import { TestTeacher, createTestGroup, createTestUserAndLogin, testLogin } from "../testHelpers";

describe("deleteGroup", () => {
  let graphqlRequest: TestGraphQLRequest;
  let teacher: TestTeacher;
  let groupId: string;

  beforeAll(async () => {
    ({ graphqlRequest } = await createServer());
    teacher = await createTestUserAndLogin(graphqlRequest);
  });

  beforeEach(async () => {
    const group = await createTestGroup(teacher.id); // Assuming createTestGroup exists
    groupId = group.id;
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

    const response = await graphqlRequest(query, { groupId });

    expect(response.data?.deleteGroup).toBeDefined();
    expect(response.data?.deleteGroup.id).toEqual(groupId);
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

    const response = await graphqlRequest(query, { groupId });

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
});
