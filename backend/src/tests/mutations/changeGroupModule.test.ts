import { graphql } from "../gql";
import createServer, { TestGraphQLRequest } from "../createTestServer";
import prisma from "@/prismaClient";
import { ChangeGroupModuleInput, EducationLevel } from "../../types";
import { TestGroup, TestTeacher, createTestGroup, createTestUserAndLogin, testLogin } from "../testHelpers";
import { modulesByGroupLoader } from "../../graphql/dataLoaders/module";
import { groupLoader, groupsByTeacherLoader } from "../../graphql/dataLoaders/group";

describe("changeGroupModule", () => {
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

  it("should successfully change the group module", async () => {
    const changeGroupModuleData: ChangeGroupModuleInput = {
      newEducationLevel: EducationLevel.PRIMARY_FOURTH,
      newLearningObjectiveGroupKey: "three_to_six_years",
    };

    const query = graphql(`
      mutation ChangeGroupModuleValidInput($data: ChangeGroupModuleInput!, $groupId: ID!) {
        changeGroupModule(data: $data, groupId: $groupId) {
          id
          currentModule {
            id
            info {
              educationLevel
              learningObjectiveGroupKey
            }
          }
        }
      }
    `);

    const response = await graphqlRequest(query, { data: changeGroupModuleData, groupId });

    expect(response.data?.changeGroupModule).toBeDefined();
    expect(response.data?.changeGroupModule.id).toEqual(groupId);
    expect(response.data?.changeGroupModule.currentModule.info.educationLevel).toEqual(changeGroupModuleData.newEducationLevel);
    expect(response.data?.changeGroupModule.currentModule.info.learningObjectiveGroupKey).toEqual(changeGroupModuleData.newLearningObjectiveGroupKey);
  });

  it("should throw error if user is not authorized for the group", async () => {
    // Simulate a different teacher who does not have access to the group
    const anotherTeacher = await createTestUserAndLogin(graphqlRequest, { email: "new-user@email.com", password: "password" });

    const changeGroupModuleData: ChangeGroupModuleInput = {
      newEducationLevel: EducationLevel.PRIMARY_FOURTH,
      newLearningObjectiveGroupKey: "three_to_six_years",
    };

    const query = graphql(`
      mutation ChangeGroupModuleUnAuthorized($data: ChangeGroupModuleInput!, $groupId: ID!) {
        changeGroupModule(data: $data, groupId: $groupId) {
          id
        }
      }
    `);

    const response = await graphqlRequest(query, { data: changeGroupModuleData, groupId });

    expect(response.errors).toBeDefined();
    expect(response.errors?.[0].message).toContain("Haettu ryhmä ei kuulu sinulle");

    // Delete the unauthorized teacher and login again to default one
    await prisma.teacher.delete({ where: { id: anotherTeacher.id } });
    await testLogin(graphqlRequest);
  });

  it("should throw error for invalid group ID", async () => {
    const invalidGroupId = "invalid-group-id";
    const changeGroupModuleData: ChangeGroupModuleInput = {
      newEducationLevel: EducationLevel.PRIMARY_FOURTH,
      newLearningObjectiveGroupKey: "three_to_six_years",
    };

    const query = graphql(`
      mutation ChangeGroupModuleInvalidID($data: ChangeGroupModuleInput!, $groupId: ID!) {
        changeGroupModule(data: $data, groupId: $groupId) {
          id
        }
      }
    `);

    const response = await graphqlRequest(query, { data: changeGroupModuleData, groupId: invalidGroupId });

    expect(response.errors).toBeDefined();
    expect(response.errors?.[0].message).toContain("Hakemaasi resurssia ei löytynyt. Tarkista syöttämäsi id:t.");
  });

  it("should throw error for invalid learning objective group key", async () => {
    const changeGroupModuleData: ChangeGroupModuleInput = {
      newEducationLevel: EducationLevel.PRIMARY_FOURTH,
      newLearningObjectiveGroupKey: "invalid-key",
    };

    const query = graphql(`
      mutation ChangeGroupModuleInvalidLearningObjectiveKey($data: ChangeGroupModuleInput!, $groupId: ID!) {
        changeGroupModule(data: $data, groupId: $groupId) {
          id
        }
      }
    `);

    const response = await graphqlRequest(query, { data: changeGroupModuleData, groupId });

    expect(response.errors).toBeDefined();
    expect(response.errors?.[0].message).toContain("Annettu oppimistavoitteiden ryhmä ei ole sallittu kyseiselle koulutustasolle.");
  });

  it("should reflect updates in DataLoader after changing group module", async () => {
    const changeGroupModuleData: ChangeGroupModuleInput = {
      newEducationLevel: EducationLevel.PRIMARY_FOURTH,
      newLearningObjectiveGroupKey: "three_to_six_years",
    };

    // Fetch initial group and module information from DataLoader
    const groupBeforeChange = await groupLoader.load(groupId);
    const groupsByTeacherBeforeChange = await groupsByTeacherLoader.load(teacher.id);
    const modulesBeforeChange = await modulesByGroupLoader.load(groupId);
    expect(modulesBeforeChange).toContainEqual(expect.objectContaining({ id: group.currentModuleId }));
    expect(groupBeforeChange.currentModuleId).toEqual(group.currentModuleId);
    expect(groupsByTeacherBeforeChange).toContainEqual(expect.objectContaining({ currentModuleId: group.currentModuleId }));

    // Perform the changeGroupModule mutation
    const changeModuleQuery = graphql(`
      mutation ChangeGroupModuleDataLoadersCheck($data: ChangeGroupModuleInput!, $groupId: ID!) {
        changeGroupModule(data: $data, groupId: $groupId) {
          currentModule {
            info {
              educationLevel
              learningObjectiveGroupKey
            }
          }
        }
      }
    `);

    await graphqlRequest(changeModuleQuery, { data: changeGroupModuleData, groupId });

    // Fetch updated group and module information from DataLoader
    const updatedGroup = await groupLoader.load(groupId);
    const updatedModules = await modulesByGroupLoader.load(groupId);
    const updatedGroupsByTeacher = await groupsByTeacherLoader.load(teacher.id);

    // Assert DataLoader reflects changes
    expect(updatedGroup.currentModuleId).not.toEqual(group.currentModuleId);
    expect(updatedModules).toContainEqual(expect.objectContaining({ id: updatedGroup.currentModuleId }));
    expect(updatedGroupsByTeacher).toContainEqual(expect.objectContaining({ currentModuleId: updatedGroup.currentModuleId }));
  });
});
