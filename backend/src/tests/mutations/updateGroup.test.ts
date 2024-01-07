import { CollectionType } from "@prisma/client";
import { graphql } from "../gql";
import createServer, { TestGraphQLRequest } from "../createTestServer";
import prisma from "@/prismaClient";
import { CollectionTypeCategory, CreateCollectionTypeInput, UpdateCollectionTypeInput, UpdateGroupInput } from "../../types";
import { TestGroup, TestTeacher, createTestGroup, createTestUserAndLogin, testLogin } from "../testHelpers";
import { groupLoader, groupsByTeacherLoader } from "../../graphql/dataLoaders/group";

describe("updateGroup", () => {
  let graphqlRequest: TestGraphQLRequest;
  let teacher: TestTeacher;
  let group: TestGroup;
  let groupId: string;
  let classParticipationType: CollectionType;
  let defaultCollectionType: CollectionType;

  beforeAll(async () => {
    ({ graphqlRequest } = await createServer());
    teacher = await createTestUserAndLogin(graphqlRequest);
  });

  beforeEach(async () => {
    group = await createTestGroup(teacher.id);
    groupId = group.id;
    classParticipationType = group.collectionTypes.find((type) => type.category === CollectionTypeCategory.CLASS_PARTICIPATION)!;
    defaultCollectionType = group.collectionTypes.find((type) => type.category === CollectionTypeCategory.EXAM)!;
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

  it("should successfully create, update, and delete collection types", async () => {
    const createCollectionTypeInputs: CreateCollectionTypeInput[] = [
      { name: "New Type 1", weight: 30, category: CollectionTypeCategory.EXAM },
      { name: "New Type 2", weight: 30, category: CollectionTypeCategory.EXAM },
    ];
    const updateCollectionTypeInputs: UpdateCollectionTypeInput[] = [{ id: classParticipationType.id, name: "Updated Type 1", weight: 40 }]; // Should be of weight 50 originally
    const deleteCollectionTypeIds = [defaultCollectionType.id];

    const updateData = {
      createCollectionTypeInputs,
      updateCollectionTypeInputs,
      deleteCollectionTypeIds,
    };

    const query = graphql(`
      mutation UpdateGroupCollectionTypes($data: UpdateGroupInput!, $groupId: ID!) {
        updateGroup(data: $data, groupId: $groupId) {
          id
          collectionTypes {
            id
            name
            weight
            category
          }
        }
      }
    `);

    const response = await graphqlRequest(query, { data: updateData, groupId });

    expect(response.data?.updateGroup).toBeDefined();
    expect(response.data?.updateGroup.collectionTypes).toContainEqual(expect.objectContaining(updateCollectionTypeInputs[0]));
    expect(response.data?.updateGroup.collectionTypes).toContainEqual(expect.objectContaining(createCollectionTypeInputs[0]));
    expect(response.data?.updateGroup.collectionTypes).toContainEqual(expect.objectContaining(createCollectionTypeInputs[1]));
    expect(response.data?.updateGroup.collectionTypes).not.toContainEqual({ id: defaultCollectionType.id });
  });

  it("should throw an error if there are duplicate collection type ids in input", async () => {
    const updateCollectionTypeInputs: UpdateCollectionTypeInput[] = [
      { id: classParticipationType.id, name: "Updated Type 1", weight: 40 },
      { id: classParticipationType.id, name: "Updated Type 2", weight: 40 },
    ];
    const updateData = {
      updateCollectionTypeInputs,
    };

    const query = graphql(`
      mutation UpdateGroupCollectionTypesDuplicateIds($data: UpdateGroupInput!, $groupId: ID!) {
        updateGroup(data: $data, groupId: $groupId) {
          id
          collectionTypes {
            id
            name
            weight
            category
          }
        }
      }
    `);

    const response = await graphqlRequest(query, { data: updateData, groupId });

    expect(response.errors).toBeDefined();
    expect(response.errors?.[0].message).toContain(
      "Syötetyissä muokattavissa arviointityypeissä on duplikaatteja. Tarkista syötetyt arviointityypit."
    );
  });

  it("should throw an error if there are unmatched collection type ids in input", async () => {
    const updateCollectionTypeInputs: UpdateCollectionTypeInput[] = [
      { id: classParticipationType.id, name: "Updated Type 1", weight: 40 },
      { id: "invalid_id", name: "Updated Type 2", weight: 40 },
    ];
    const updateData = {
      updateCollectionTypeInputs,
    };

    const query = graphql(`
      mutation UpdateGroupCollectionTypesUnmatchedIds($data: UpdateGroupInput!, $groupId: ID!) {
        updateGroup(data: $data, groupId: $groupId) {
          id
          collectionTypes {
            id
            name
            weight
            category
          }
        }
      }
    `);

    const response = await graphqlRequest(query, { data: updateData, groupId });

    expect(response.errors).toBeDefined();
    expect(response.errors?.[0].message).toContain(
      `Syötetyissä muokattavissa arviointityypeissä on arviointityyppejä, jotka eivät kuulu ryhmään. Tarkista syötetyt arviointityypit.`
    );
  });

  it("should throw an error if trying to change class participation collection type to other category", async () => {
    const updateCollectionTypeInputs: UpdateCollectionTypeInput[] = [
      { id: classParticipationType.id, name: "Updated Type 1", weight: 40, category: CollectionTypeCategory.EXAM },
    ];
    const updateData = {
      updateCollectionTypeInputs,
    };

    const query = graphql(`
      mutation UpdateGroupCollectionTypesInvalidCategoryChange($data: UpdateGroupInput!, $groupId: ID!) {
        updateGroup(data: $data, groupId: $groupId) {
          id
          collectionTypes {
            id
            name
            weight
            category
          }
        }
      }
    `);

    const response = await graphqlRequest(query, { data: updateData, groupId });

    expect(response.errors).toBeDefined();
    expect(response.errors?.[0].message).toContain(
      "Arviointityyppiä ei voi muuttaa CLASS_PARTICIPATION tyypistä muuksi tyypiksi. Tarkista syötetyt arviointityypit."
    );
  });

  it("should throw an error if trying to change exam collection type to class participation category", async () => {
    const updateCollectionTypeInputs: UpdateCollectionTypeInput[] = [
      { id: defaultCollectionType.id, name: "Updated Type 1", weight: 40, category: CollectionTypeCategory.CLASS_PARTICIPATION },
    ];
    const updateData = {
      updateCollectionTypeInputs,
    };

    const query = graphql(`
      mutation UpdateGroupCollectionTypesInvalidCategoryChange2($data: UpdateGroupInput!, $groupId: ID!) {
        updateGroup(data: $data, groupId: $groupId) {
          id
          collectionTypes {
            id
            name
            weight
            category
          }
        }
      }
    `);

    const response = await graphqlRequest(query, { data: updateData, groupId });

    expect(response.errors).toBeDefined();
    expect(response.errors?.[0].message).toContain(
      "Arviointityyppiä ei voi muuttaa CLASS_PARTICIPATION tyypiksi toisesta tyypistä. Tarkista syötetyt arviointityypit."
    );
  });

  it("should throw an error if the total weight of collection types is not 100", async () => {
    const updateCollectionTypeInputs: UpdateCollectionTypeInput[] = [{ id: classParticipationType.id, name: "Updated Type 1", weight: 40 }];
    const updateData = {
      updateCollectionTypeInputs,
    };

    const query = graphql(`
      mutation UpdateGroupCollectionTypesInvalidTotalWeight($data: UpdateGroupInput!, $groupId: ID!) {
        updateGroup(data: $data, groupId: $groupId) {
          id
          collectionTypes {
            id
            name
            weight
            category
          }
        }
      }
    `);

    const response = await graphqlRequest(query, { data: updateData, groupId });

    expect(response.errors).toBeDefined();
    expect(response.errors?.[0].message).toContain("Arviointityyppien painotusten summan on oltava 100. Tarkista syötetyt arviointityypit.");
  });

  it("should throw an error if there is more than one CLASS_PARTICIPATION category", async () => {
    const createCollectionTypeInputs: CreateCollectionTypeInput[] = [
      { name: "New Type 1", weight: 30, category: CollectionTypeCategory.CLASS_PARTICIPATION },
      { name: "New Type 2", weight: 30, category: CollectionTypeCategory.CLASS_PARTICIPATION },
    ];
    const updateData = {
      createCollectionTypeInputs,
    };

    const query = graphql(`
      mutation UpdateGroupCollectionTypesInvalidCategoryCount($data: UpdateGroupInput!, $groupId: ID!) {
        updateGroup(data: $data, groupId: $groupId) {
          id
          collectionTypes {
            id
            name
            weight
            category
          }
        }
      }
    `);

    const response = await graphqlRequest(query, { data: updateData, groupId });

    expect(response.errors).toBeDefined();
    expect(response.errors?.[0].message).toContain(
      "Ryhmässä voi olla vain yksi CLASS_PARTICIPATION arviointityyppi. Tarkista syötetyt arviointityypit."
    );
  });

  it("should throw an error if there is no CLASS_PARTICIPATION category after update", async () => {
    const deleteCollectionTypeIds = [classParticipationType.id];
    const updateData = {
      deleteCollectionTypeIds,
    };

    const query = graphql(`
      mutation UpdateGroupCollectionTypesInvalidCategoryCount2($data: UpdateGroupInput!, $groupId: ID!) {
        updateGroup(data: $data, groupId: $groupId) {
          id
          collectionTypes {
            id
            name
            weight
            category
          }
        }
      }
    `);

    const response = await graphqlRequest(query, { data: updateData, groupId });

    expect(response.errors).toBeDefined();
    expect(response.errors?.[0].message).toContain(
      "Ryhmässä on oltava vähintään yksi CLASS_PARTICIPATION arviointityyppi. Tarkista syötetyt arviointityypit."
    );
  });
});
