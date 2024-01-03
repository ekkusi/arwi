import { graphql } from "../gql";
import createServer, { TestGraphQLRequest } from "../createTestServer";
import prisma from "@/prismaClient";
import { UpdateGroupInput } from "../../types";
import { TestGroup, TestTeacher, createTestGroup, createTestUserAndLogin, testLogin } from "../testHelpers";
import { groupLoader, groupsByTeacherLoader } from "../../graphql/dataLoaders/group";

describe("updateGroup", () => {
  let graphqlRequest: TestGraphQLRequest;
  let teacher: TestTeacher;
  let group: TestGroup;
  let groupId: string;

  beforeAll(async () => {
    ({ graphqlRequest } = await createServer());
    teacher = await createTestUserAndLogin(graphqlRequest);
  });

  beforeEach(async () => {
    group = await createTestGroup(teacher.id);
    groupId = group.id;
  });

  afterEach(async () => {
    await prisma.group.deleteMany();
  });

  it("should successfully update a group", async () => {
    const updateData: UpdateGroupInput = {
      name: "Updated Group Name",
      archived: false,
    };

    const query = graphql(`
      mutation UpdateGroup($data: UpdateGroupInput!, $groupId: ID!) {
        updateGroup(data: $data, groupId: $groupId) {
          id
          name
          archived
        }
      }
    `);

    const response = await graphqlRequest(query, { data: updateData, groupId });

    expect(response.data?.updateGroup).toBeDefined();
    expect(response.data?.updateGroup.id).toEqual(groupId);
    expect(response.data?.updateGroup.name).toEqual(updateData.name);
    expect(response.data?.updateGroup.archived).toEqual(updateData.archived);
  });

  it("should throw error if user is not authorized for the group", async () => {
    const unauthorizedTeacher = await createTestUserAndLogin(graphqlRequest, { email: "new-user@email.com", password: "password" });
    const updateData: UpdateGroupInput = {
      name: "Updated Group Name",
      archived: false,
    };

    const query = graphql(`
      mutation UpdateGroupUnauthorized($data: UpdateGroupInput!, $groupId: ID!) {
        updateGroup(data: $data, groupId: $groupId) {
          id
          name
          archived
        }
      }
    `);

    const response = await graphqlRequest(query, { data: updateData, groupId });

    expect(response.errors).toBeDefined();
    expect(response.errors?.[0].message).toContain("Haettu ryhmä ei kuulu sinulle");

    // Cleanup: delete unauthorized teacher and re-login as the original teacher
    await prisma.teacher.delete({ where: { id: unauthorizedTeacher.id } });
    await testLogin(graphqlRequest);
  });

  it("should throw error for invalid group ID", async () => {
    const updateData: UpdateGroupInput = {
      name: "Some Group Name",
      archived: false,
    };
    const invalidGroupId = "invalid_id";

    const query = graphql(`
      mutation UpdateGroupInvalidID($data: UpdateGroupInput!, $groupId: ID!) {
        updateGroup(data: $data, groupId: $groupId) {
          id
          name
          archived
        }
      }
    `);

    const response = await graphqlRequest(query, { data: updateData, groupId: invalidGroupId });

    expect(response.errors).toBeDefined();
    expect(response.errors?.[0].message).toContain(`Hakemaasi resurssia ei löytynyt. Tarkista syöttämäsi id:t.`);
  });

  it("should update DataLoaders after updating a group", async () => {
    // Fetch the initial state of the group from the DataLoaders
    const groupFromGroupLoaderBeforeUpdate = await groupLoader.load(groupId);
    const groupsFromTeacherLoaderBeforeUpdate = await groupsByTeacherLoader.load(teacher.id);
    expect(group).toEqual(expect.objectContaining(groupFromGroupLoaderBeforeUpdate));
    expect(group).toEqual(expect.objectContaining(groupsFromTeacherLoaderBeforeUpdate[0]));

    // Update the group
    const updateData: UpdateGroupInput = {
      name: "Updated Group Name",
      archived: false,
    };

    const query = graphql(`
      mutation UpdateGroupDataLoaderCheck($data: UpdateGroupInput!, $groupId: ID!) {
        updateGroup(data: $data, groupId: $groupId) {
          id
          name
          archived
        }
      }
    `);

    const response = await graphqlRequest(query, { data: updateData, groupId });
    expect(response.data?.updateGroup).toBeDefined();
    expect(response.data?.updateGroup.id).toEqual(groupId);
    expect(response.data?.updateGroup.name).toEqual(updateData.name);
    expect(response.data?.updateGroup.archived).toEqual(updateData.archived);

    // Fetch the updated group from the DataLoaders
    const updatedGroupFromGroupLoader = await groupLoader.load(groupId);
    const updatedGroupsFromTeacherLoader = await groupsByTeacherLoader.load(teacher.id);

    // Assert that the DataLoaders reflect the updated group information
    expect(updatedGroupFromGroupLoader).toEqual(expect.objectContaining(updateData));
    expect(updatedGroupsFromTeacherLoader).toContainEqual(expect.objectContaining(updateData));
  });
});
