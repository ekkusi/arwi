import { graphql } from "@/tests/graphql";
import createServer, { TestGraphQLRequest } from "../createTestServer";
import prisma from "@/prismaClient";
import { TestTeacher, createTestUserAndLogin, deleteTestUser } from "../testHelpers";
import { modulesByGroupLoader } from "../../graphql/dataLoaders/module";
import { groupsByTeacherLoader } from "../../graphql/dataLoaders/group";
import { CreateGroupInput } from "@/types";

const groupData: Omit<CreateGroupInput, "teacherId"> = {
  name: "Test Group",
  subjectCode: "LI",
  educationLevel: "PRIMARY_FIRST",
  learningObjectiveGroupKey: "one_to_two_years",
  students: [{ name: "Student A" }, { name: "Student B" }],
  collectionTypes: [
    { category: "EXAM", name: "Midterm", weight: 50 },
    { category: "CLASS_PARTICIPATION", name: "Participation", weight: 50 },
  ],
};

describe("CreateGroup", () => {
  let graphqlRequest: TestGraphQLRequest;
  let teacher: TestTeacher;

  beforeAll(async () => {
    ({ graphqlRequest } = await createServer());

    teacher = await createTestUserAndLogin(graphqlRequest);
  });

  afterAll(async () => {
    await deleteTestUser();
  });

  afterEach(async () => {
    await prisma.group.deleteMany();
  });

  it("should successfully create a group", async () => {
    const validGroupData = {
      ...groupData,
      teacherId: teacher.id,
    };
    const query = graphql(`
      mutation CreateGroup($data: CreateGroupInput!) {
        createGroup(data: $data) {
          id
          name
          teacher {
            id
          }
          subject {
            code
          }
          students {
            name
          }
          currentModule {
            collectionTypes {
              name
              weight
            }
          }
        }
      }
    `);

    const response = await graphqlRequest(query, { data: validGroupData });

    expect(response.data?.createGroup).toBeDefined();
    expect(response.data?.createGroup.name).toEqual(validGroupData.name);
    expect(response.data?.createGroup.teacher.id).toEqual(teacher.id);
    expect(response.data?.createGroup.subject.code).toEqual(validGroupData.subjectCode);
    expect(response.data?.createGroup.students.length).toEqual(validGroupData.students.length);
    expect(response.data?.createGroup.currentModule.collectionTypes.length).toEqual(validGroupData.collectionTypes.length);
  });

  it("should throw error for invalid subject code", async () => {
    const invalidSubjectCodeGroupData = {
      ...groupData,
      teacherId: teacher.id,
      subjectCode: "InvalidCode",
    };

    const query = graphql(`
      mutation CreateGroupInvalidSubject($data: CreateGroupInput!) {
        createGroup(data: $data) {
          id
        }
      }
    `);

    const response = await graphqlRequest(query, { data: invalidSubjectCodeGroupData });

    expect(response.errors).toBeDefined();
    expect(response.errors?.[0].message).toContain("Aihetta koodilla 'InvalidCode' ei ole olemassa");
  });

  it("should throw error for empty collection types", async () => {
    const emptyCollectionTypesGroupData = {
      ...groupData,
      teacherId: teacher.id,
      collectionTypes: [],
    };

    const query = graphql(`
      mutation CreateGroupEmptyCollections($data: CreateGroupInput!) {
        createGroup(data: $data) {
          id
        }
      }
    `);

    const response = await graphqlRequest(query, { data: emptyCollectionTypesGroupData });

    expect(response.errors).toBeDefined();
    expect(response.errors?.[0].message).toContain("Arviointityyppejä on oltava vähintään yksi");
  });

  it("should throw error for invalid collection type weights", async () => {
    const invalidWeightsGroupData: CreateGroupInput = {
      ...groupData,
      teacherId: teacher.id,
      collectionTypes: [
        { category: "EXAM", name: "Midterm", weight: 30 },
        { category: "CLASS_PARTICIPATION", name: "Participation", weight: 30 },
      ], // Total weight does not sum up to 100
    };

    const query = graphql(`
      mutation CreateGroupInvalidWeights($data: CreateGroupInput!) {
        createGroup(data: $data) {
          id
        }
      }
    `);

    const response = await graphqlRequest(query, { data: invalidWeightsGroupData });

    expect(response.errors).toBeDefined();
    expect(response.errors?.[0].message).toContain("Arviointityyppien painotusten summan on oltava 100");
  });

  it("should update DataLoaders after creating a group", async () => {
    const groupsByTeacher = await groupsByTeacherLoader.load(teacher.id);
    expect(groupsByTeacher).toEqual([]);

    // Create a group
    const validGroupData = { ...groupData, teacherId: teacher.id };
    const query = graphql(`
      mutation CreateGroupDataLoadersCheck($data: CreateGroupInput!) {
        createGroup(data: $data) {
          id
          name
        }
      }
    `);

    const response = await graphqlRequest(query, { data: validGroupData });

    const newGroupId = response.data?.createGroup.id;
    // Check if the modules are correctly loaded in modulesByGroupLoader
    const updatedModulesByGroup = await modulesByGroupLoader.load(newGroupId!);
    expect(updatedModulesByGroup.length).toEqual(1);
    expect(updatedModulesByGroup[0].groupId).toEqual(newGroupId!);

    // Check if the group is correctly loaded in groupsByTeacherLoader
    const groupsFromTeacherLoader = await groupsByTeacherLoader.load(teacher.id);
    const createdGroupFromTeacherLoader = groupsFromTeacherLoader.find((group) => group.id === newGroupId);
    expect(createdGroupFromTeacherLoader).toEqual(expect.objectContaining({ id: newGroupId, name: validGroupData.name }));
  });
});
