import { graphql } from "../gql";
import createServer, { TestGraphQLRequest } from "../createTestServer";
import prisma from "@/prismaClient";
import { CollectionTypeCategory, CreateClassParticipationCollectionInput } from "../../types";
import { TestGroup, TestTeacher, VALID_LI_ENV_CODE, createTestGroup, createTestUserAndLogin } from "../testHelpers";
import { formatDate } from "../../utils/date";
import { collectionLoader, collectionsByModuleLoader } from "../../graphql/dataLoaders/collection";
import { groupLoader } from "../../graphql/dataLoaders/group";
import { isClassParticipationCollection } from "../../types/typeGuards";

describe("createClassParticipationCollection", () => {
  let graphqlRequest: TestGraphQLRequest;
  let teacher: TestTeacher;
  let group: TestGroup;

  let baseCollectionData: CreateClassParticipationCollectionInput;

  beforeAll(async () => {
    ({ graphqlRequest } = await createServer());

    teacher = await createTestUserAndLogin(graphqlRequest);
    group = await createTestGroup(teacher.id);

    baseCollectionData = {
      date: formatDate(new Date(), "yyyy-MM-dd"),
      environmentCode: VALID_LI_ENV_CODE,
      description: "Test Description",
      learningObjectiveCodes: ["T1", "T2"],
      typeId: group.collectionTypes.find((ct) => ct.category === CollectionTypeCategory.CLASS_PARTICIPATION)?.id!,
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
        },
      ],
    };

    const query = graphql(`
      mutation CreateClassParticipationCollection($data: CreateClassParticipationCollectionInput!, $moduleId: ID!) {
        createClassParticipationCollection(data: $data, moduleId: $moduleId) {
          id
          date
          type {
            id
          }
          __typename
          environment {
            code
          }
          learningObjectives {
            code
          }
          description
          evaluations {
            student {
              id
            }
            __typename
            skillsRating
            behaviourRating
          }
        }
      }
    `);

    const response = await graphqlRequest(query, { data: collectionData, moduleId: group.currentModule.id });

    expect(response.data?.createClassParticipationCollection).toBeDefined();
    expect(response.data?.createClassParticipationCollection.date).toEqual(collectionData.date);
    if (response.data && isClassParticipationCollection(response.data.createClassParticipationCollection)) {
      expect(response.data?.createClassParticipationCollection.environment.code).toEqual(collectionData.environmentCode);
      expect(response.data?.createClassParticipationCollection.evaluations.length).toEqual(collectionData.evaluations.length);
      expect(response.data?.createClassParticipationCollection.evaluations[0].behaviourRating).toEqual(collectionData.evaluations[0].behaviourRating);
      expect(response.data?.createClassParticipationCollection.evaluations[0].skillsRating).toEqual(collectionData.evaluations[0].skillsRating);
      expect(response.data?.createClassParticipationCollection.evaluations[0].student.id).toEqual(collectionData.evaluations[0].studentId);
      expect(response.data?.createClassParticipationCollection.learningObjectives.map((lo) => lo.code)).toEqual(
        collectionData.learningObjectiveCodes
      );
    }
  });

  it("should throw error for invalid environment code", async () => {
    const collectionData = {
      ...baseCollectionData,
      environmentCode: "InvalidEnvironmentCode",
    };

    const query = graphql(`
      mutation CreateClassParticipationCollectionInvalidEnvironment($data: CreateClassParticipationCollectionInput!, $moduleId: ID!) {
        createClassParticipationCollection(data: $data, moduleId: $moduleId) {
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
      mutation CreateClassParticipationCollectionInvalidLearningObjectives($data: CreateClassParticipationCollectionInput!, $moduleId: ID!) {
        createClassParticipationCollection(data: $data, moduleId: $moduleId) {
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
      mutation CreateClassParticipationCollectionNotEvaluatedLearningObjectives($data: CreateClassParticipationCollectionInput!, $moduleId: ID!) {
        createClassParticipationCollection(data: $data, moduleId: $moduleId) {
          id
        }
      }
    `);

    const response = await graphqlRequest(query, { data: collectionData, moduleId: group.currentModule.id });

    expect(response.errors).toBeDefined();
    expect(response.errors?.[0].message).toContain(`Osa oppimistavoitteista ei ole olemassa tai ei ole arvioitavia`);
  });

  it("should throw error if type is not CLASS_PARTICIPATION", async () => {
    const newType = group.collectionTypes.find((ct) => ct.category === CollectionTypeCategory.EXAM)!;

    const collectionData = {
      ...baseCollectionData,
      typeId: newType.id,
    };

    const query = graphql(`
      mutation CreateClassParticipationCollectionInvalidType($data: CreateClassParticipationCollectionInput!, $moduleId: ID!) {
        createClassParticipationCollection(data: $data, moduleId: $moduleId) {
          id
        }
      }
    `);

    const response = await graphqlRequest(query, { data: collectionData, moduleId: group.currentModule.id });

    expect(response.errors).toBeDefined();
    expect(response.errors?.[0].message).toContain(`Syötetty arviointikokoelman tyyppi on väärä. Sen kuuluu olla 'CLASS_PARTICIPATION'.`);
  });

  it("should update DataLoaders after creating a collection", async () => {
    // Initial state: Load collections for a module and check initial state
    const initialCollectionsByModule = await collectionsByModuleLoader.load(group.currentModule.id);
    expect(initialCollectionsByModule).toEqual([]);

    // Load group to cache
    const initialGroupFromLoader = await groupLoader.load(group.id);

    // Create a collection
    const collectionData = {
      ...baseCollectionData,
      evaluations: [
        {
          studentId: group.students[0].id,
          wasPresent: true,
          skillsRating: 7,
          behaviourRating: 9,
          notes: "Good performance",
        },
      ],
    };

    // Wait 2 seconds to make sure updatedAt is different
    await new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });

    const query = graphql(`
      mutation CreateClassParticipationCollectionDataLoaderCheck($data: CreateClassParticipationCollectionInput!, $moduleId: ID!) {
        createClassParticipationCollection(data: $data, moduleId: $moduleId) {
          id
          date
        }
      }
    `);

    const createClassParticipationCollectionResponse = await graphqlRequest(query, { data: collectionData, moduleId: group.currentModule.id });
    const newCollection = createClassParticipationCollectionResponse.data?.createClassParticipationCollection!;
    expect(newCollection).toBeDefined();

    // Check if the collection is correctly loaded in collectionLoader
    const newCollectionFromLoader = await collectionLoader.load(newCollection.id);
    expect(newCollectionFromLoader).toEqual(expect.objectContaining({ id: newCollection.id }));

    // Check if the collectionsByModuleLoader is updated
    const updatedCollectionsByModule = await collectionsByModuleLoader.load(group.currentModule.id);
    expect(updatedCollectionsByModule.length).toEqual(1);
    expect(updatedCollectionsByModule[0]).toEqual(expect.objectContaining({ id: newCollection.id }));

    // Check if the groupLoader is updated
    const updatedGroupFromLoader = await groupLoader.load(group.id);

    expect(formatDate(updatedGroupFromLoader.updatedAt, "dd.MM.yyyy HH:mm:ss")).not.toEqual(
      formatDate(initialGroupFromLoader.updatedAt, "dd.MM.yyyy HH:mm:ss")
    );
  });
});
