import { graphql } from "@/tests/graphql";
import createServer, { TestGraphQLRequest } from "../createTestServer";
import prisma from "@/prismaClient";
import { CreateDefaultCollectionInput } from "../../types";
import { TestGroup, TestTeacher, createTestGroup, createTestUserAndLogin } from "../testHelpers";
import { formatDate } from "../../utils/date";
import { collectionLoader, collectionsByModuleLoader } from "../../graphql/dataLoaders/collection";
import { groupLoader } from "../../graphql/dataLoaders/group";
import { isDefaultCollection } from "../../types/typeGuards";

describe("createDefaultCollection", () => {
  let graphqlRequest: TestGraphQLRequest;
  let teacher: TestTeacher;
  let group: TestGroup;

  let baseCollectionData: CreateDefaultCollectionInput;

  beforeAll(async () => {
    ({ graphqlRequest } = await createServer());

    teacher = await createTestUserAndLogin(graphqlRequest);
    group = await createTestGroup(teacher.id);

    baseCollectionData = {
      date: formatDate(new Date(), "yyyy-MM-dd"),
      description: "Test Description",
      typeId: group.currentModule.collectionTypes.find((ct) => ct.category === "EXAM")?.id!,
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
          rating: 7,
          notes: "Good performance",
        },
      ],
    };

    const query = graphql(`
      mutation CreateDefaultCollection($data: CreateDefaultCollectionInput!, $moduleId: ID!) {
        createDefaultCollection(data: $data, moduleId: $moduleId) {
          id
          date
          type {
            id
          }
          __typename
          description
          evaluations {
            student {
              id
            }
            __typename
            notes
            rating
          }
        }
      }
    `);

    const response = await graphqlRequest(query, { data: collectionData, moduleId: group.currentModule.id });

    expect(response.data?.createDefaultCollection).toBeDefined();
    expect(response.data?.createDefaultCollection.date).toEqual(collectionData.date);
    if (response.data && isDefaultCollection(response.data.createDefaultCollection)) {
      expect(response.data?.createDefaultCollection.evaluations.length).toEqual(collectionData.evaluations.length);
      expect(response.data?.createDefaultCollection.evaluations[0].rating).toEqual(collectionData.evaluations[0].rating);
      expect(response.data?.createDefaultCollection.evaluations[0].student.id).toEqual(collectionData.evaluations[0].studentId);
      expect(response.data?.createDefaultCollection.evaluations[0].notes).toEqual(collectionData.evaluations[0].notes);
    }
  });

  it("should throw an error if a collection with the type already exists", async () => {
    const collectionData = {
      ...baseCollectionData,
      evaluations: [
        {
          studentId: group.students[0].id,
          wasPresent: true,
          rating: 7,
          notes: "Good performance",
        },
      ],
    };

    const query = graphql(`
      mutation CreateDefaultCollectionDuplicate($data: CreateDefaultCollectionInput!, $moduleId: ID!) {
        createDefaultCollection(data: $data, moduleId: $moduleId) {
          id
        }
      }
    `);

    await graphqlRequest(query, { data: collectionData, moduleId: group.currentModule.id });
    const response = await graphqlRequest(query, { data: collectionData, moduleId: group.currentModule.id });

    expect(response.errors).toBeDefined();
    expect(response.errors![0].message).toEqual(
      `Arviointikokoelma tällä arviointityypillä on jo olemassa ja kyseisellä tyypillä niitä ei voi olla yhtä enempää.`
    );
  });

  it("should throw an error if the collection type is CLASS_PARTICIPATION type", async () => {
    const classParticipationType = group.currentModule.collectionTypes.find((ct) => ct.category === "CLASS_PARTICIPATION")!;

    const collectionData = {
      ...baseCollectionData,
      typeId: classParticipationType.id,
    };

    const query = graphql(`
      mutation CreateDefaultCollectionInvalidType($data: CreateDefaultCollectionInput!, $moduleId: ID!) {
        createDefaultCollection(data: $data, moduleId: $moduleId) {
          id
        }
      }
    `);

    const response = await graphqlRequest(query, { data: collectionData, moduleId: group.currentModule.id });

    expect(response.errors).toBeDefined();
    expect(response.errors![0].message).toEqual(`Syötetty arviointikokoelman tyyppi on väärä. Se ei saa olla 'CLASS_PARTICIPATION'.`);
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
          rating: 7,
          notes: "Good performance",
        },
      ],
    };

    // Wait 2 seconds to make sure updatedAt is different
    await new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });

    const query = graphql(`
      mutation CreateDefaultCollectionDataLoaderCheck($data: CreateDefaultCollectionInput!, $moduleId: ID!) {
        createDefaultCollection(data: $data, moduleId: $moduleId) {
          id
          date
        }
      }
    `);

    const createDefaultCollectionResponse = await graphqlRequest(query, { data: collectionData, moduleId: group.currentModule.id });
    const newCollection = createDefaultCollectionResponse.data?.createDefaultCollection!;
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
