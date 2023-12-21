import { graphql } from "../gql";
import createServer, { TestGraphQLRequest } from "../createTestServer";
import prisma from "@/prismaClient";
import { CollectionTypeCategory, CreateCollectionInput } from "../../types";
import { TestGroup, TestTeacher, VALID_LI_ENV_CODE, createTestGroup, createTestUserAndLogin, deleteTestUser } from "../testHelpers";
import { formatDate } from "../../utils/date";

describe("CreateCollection", () => {
  let graphqlRequest: TestGraphQLRequest;
  let teacher: TestTeacher;
  let group: TestGroup;

  let baseCollectionData: CreateCollectionInput;

  beforeAll(async () => {
    ({ graphqlRequest } = await createServer());

    teacher = await createTestUserAndLogin(graphqlRequest);
    group = await createTestGroup(teacher.id);

    baseCollectionData = {
      date: formatDate(new Date(), "yyyy-MM-dd"),
      environmentCode: VALID_LI_ENV_CODE,
      description: "Test Description",
      learningObjectiveCodes: ["T1", "T2"],
      typeId: group.collectionTypes.find((ct) => ct.category === CollectionTypeCategory.EXAM)?.id!,
    };
  });

  afterEach(async () => {
    await prisma.evaluationCollection.deleteMany();
  });

  it("should successfully create a collection", async () => {
    const collectionData = {
      ...baseCollectionData,
      evaluations: [
        {
          studentId: group.students[0].id,
          wasPresent: true,
          skillsRating: 7,
          behaviourRating: 9,
          notes: "Good performance",
          isStellar: false,
        },
      ],
    };

    const query = graphql(`
      mutation CreateCollection($data: CreateCollectionInput!, $moduleId: ID!) {
        createCollection(data: $data, moduleId: $moduleId) {
          id
          date
          type {
            id
          }
          environment {
            code
          }
          description
          evaluations {
            student {
              id
            }
            skillsRating
            behaviourRating
          }
          learningObjectives {
            code
          }
        }
      }
    `);

    const response = await graphqlRequest(query, { data: collectionData, moduleId: group.currentModule.id });

    expect(response.data?.createCollection).toBeDefined();
    expect(response.data?.createCollection.date).toEqual(collectionData.date);
    expect(response.data?.createCollection.environment.code).toEqual(collectionData.environmentCode);
    expect(response.data?.createCollection.evaluations.length).toEqual(collectionData.evaluations.length);
    expect(response.data?.createCollection.evaluations[0].behaviourRating).toEqual(collectionData.evaluations[0].behaviourRating);
    expect(response.data?.createCollection.evaluations[0].skillsRating).toEqual(collectionData.evaluations[0].skillsRating);
    expect(response.data?.createCollection.evaluations[0].student.id).toEqual(collectionData.evaluations[0].studentId);
    expect(response.data?.createCollection.learningObjectives.map((lo) => lo.code)).toEqual(collectionData.learningObjectiveCodes);
  });

  it("should throw error for invalid environment code", async () => {
    const collectionData = {
      ...baseCollectionData,
      environmentCode: "InvalidEnvironmentCode",
    };

    const query = graphql(`
      mutation CreateCollectionInvalidEnvironment($data: CreateCollectionInput!, $moduleId: ID!) {
        createCollection(data: $data, moduleId: $moduleId) {
          id
        }
      }
    `);

    const response = await graphqlRequest(query, { data: collectionData, moduleId: group.currentModule.id });

    expect(response.errors).toBeDefined();
    expect(response.errors?.[0].message).toContain(`Ympäristöä koodilla '${collectionData.environmentCode}' ei ole olemassa`);
  });

  it("should throw error for invalid learning objectives", async () => {
    const collectionData = {
      ...baseCollectionData,
      learningObjectiveCodes: ["InvalidObjective1", "InvalidObjective2"],
    };

    const query = graphql(`
      mutation CreateCollectionInvalidLearningObjectives($data: CreateCollectionInput!, $moduleId: ID!) {
        createCollection(data: $data, moduleId: $moduleId) {
          id
        }
      }
    `);

    const response = await graphqlRequest(query, { data: collectionData, moduleId: group.currentModule.id });

    expect(response.errors).toBeDefined();
    expect(response.errors?.[0].message).toContain(`Osa oppimistavoitteista ei ole olemassa tai ei ole arvioitavia`);
  });

  it("should throw error if learning objectives are NOT_EVALUATED type", async () => {
    const collectionData = {
      ...baseCollectionData,
      learningObjectiveCodes: ["T1", "T11"], // T11 is NOT_EVALUATED type in LI subject's 7-9 years
    };

    const query = graphql(`
      mutation CreateCollectionNotEvaluatedLearningObjectives($data: CreateCollectionInput!, $moduleId: ID!) {
        createCollection(data: $data, moduleId: $moduleId) {
          id
        }
      }
    `);

    const response = await graphqlRequest(query, { data: collectionData, moduleId: group.currentModule.id });

    expect(response.errors).toBeDefined();
    expect(response.errors?.[0].message).toContain(`Osa oppimistavoitteista ei ole olemassa tai ei ole arvioitavia`);
  });
});
