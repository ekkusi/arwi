import { graphql } from "../gql";
import createServer, { TestGraphQLRequest } from "../createTestServer";
import prisma from "@/prismaClient";
import { CollectionTypeCategory, EducationLevel } from "../../types";
import { TestTeacher, createTestUserAndLogin, deleteTestUser } from "../testHelpers";

const groupData = {
  name: "Test Group",
  subjectCode: "LI",
  educationLevel: EducationLevel.PRIMARY_FIRST,
  learningObjectiveGroupKey: "one_to_two_years",
  students: [{ name: "Student A" }, { name: "Student B" }],
  collectionTypes: [
    { category: CollectionTypeCategory.EXAM, name: "Midterm", weight: 50 },
    { category: CollectionTypeCategory.CLASS_PARTICIPATION, name: "Participation", weight: 50 },
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
          collectionTypes {
            name
            weight
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
    expect(response.data?.createGroup.collectionTypes.length).toEqual(validGroupData.collectionTypes.length);
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
    const invalidWeightsGroupData = {
      ...groupData,
      teacherId: teacher.id,
      collectionTypes: [
        { category: CollectionTypeCategory.EXAM, name: "Midterm", weight: 30 },
        { category: CollectionTypeCategory.CLASS_PARTICIPATION, name: "Participation", weight: 30 },
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
});
