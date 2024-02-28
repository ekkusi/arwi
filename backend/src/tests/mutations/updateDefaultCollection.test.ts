import { CollectionTypeCategory, Evaluation, EvaluationCollection } from "@prisma/client";
import { graphql } from "../graphql";
import createServer, { TestGraphQLRequest } from "../createTestServer";
import prisma from "@/prismaClient";
import {
  TestGroup,
  TestTeacher,
  createTestEvaluation,
  createTestEvaluationCollection,
  createTestGroup,
  createTestUserAndLogin,
  testLogin,
} from "../testHelpers";
import { formatDate } from "../../utils/date";
import { collectionLoader, collectionsByModuleLoader } from "../../graphql/dataLoaders/collection";
import { evaluationLoader, evaluationsByCollectionLoader } from "../../graphql/dataLoaders/evaluation";
import { UpdateDefaultCollectionInput } from "../../types";

describe("updateDefaultCollection", () => {
  let graphqlRequest: TestGraphQLRequest;
  let teacher: TestTeacher;
  let group: TestGroup;
  let collection: EvaluationCollection;
  let evaluation: Evaluation;
  let notPresentEvaluation: Evaluation;

  beforeAll(async () => {
    ({ graphqlRequest } = await createServer());
    teacher = await createTestUserAndLogin(graphqlRequest);
    group = await createTestGroup(teacher.id);
  });

  beforeEach(async () => {
    const collectionType = group.currentModule.collectionTypes.find((ct) => ct.category === CollectionTypeCategory.EXAM)!;
    collection = await createTestEvaluationCollection(group.currentModuleId, collectionType.id, {
      environmentCode: null,
      learningObjectiveCodes: [],
    });
    const overrideData = {
      skillsRating: null,
      behaviourRating: null,
      generalRating: 6,
    };
    evaluation = await createTestEvaluation(collection.id, group.students[0].id, overrideData);
    notPresentEvaluation = await createTestEvaluation(collection.id, group.students[1].id, { wasPresent: false, ...overrideData });
  });

  afterEach(async () => {
    await prisma.evaluationCollection.deleteMany();
  });

  it("should successfully update a collection", async () => {
    const updatedEvaluation = {
      id: evaluation.id,
      wasPresent: true,
      rating: 8,
      notes: "Improved performance and stuff",
    };
    const updateData: UpdateDefaultCollectionInput = {
      // Assuming correct structure for UpdateDefaultCollectionInput
      date: formatDate(new Date(), "yyyy-MM-dd"),
      description: "Midterm Exam",
      evaluations: [updatedEvaluation],
    };

    const query = graphql(`
      mutation UpdateDefaultCollection($data: UpdateDefaultCollectionInput!, $collectionId: ID!) {
        updateDefaultCollection(data: $data, collectionId: $collectionId) {
          id
          date
          type {
            id
          }
          description
          evaluations {
            id
            notes
            wasPresent
            rating
          }
        }
      }
    `);

    const response = await graphqlRequest(query, { data: updateData, collectionId: collection.id });

    expect(response.data?.updateDefaultCollection).toBeDefined();
    expect(response.data?.updateDefaultCollection.id).toEqual(collection.id);
    expect(response.data?.updateDefaultCollection.date).toEqual(updateData.date);
    expect(response.data?.updateDefaultCollection.description).toEqual(updateData.description);
    const updatedEvaluationResponse = response.data?.updateDefaultCollection.evaluations.find((e) => e.id === updatedEvaluation.id);
    expect(updatedEvaluationResponse).toBeDefined();
    expect(updatedEvaluationResponse?.wasPresent).toEqual(updatedEvaluation.wasPresent);
    expect(updatedEvaluationResponse?.rating).toEqual(updatedEvaluation.rating);
    expect(updatedEvaluationResponse?.notes).toEqual(updatedEvaluation.notes);
  });

  it("should throw error if user is not authorized for the collection", async () => {
    const unauthorizedTeacher = await createTestUserAndLogin(graphqlRequest, {
      email: "new-user@email.com",
      password: "password",
    });
    const updateData: UpdateDefaultCollectionInput = {
      description: "New description",
    };

    const query = graphql(`
      mutation UpdateDefaultCollectionUnauthorized($data: UpdateDefaultCollectionInput!, $collectionId: ID!) {
        updateDefaultCollection(data: $data, collectionId: $collectionId) {
          id
        }
      }
    `);

    const response = await graphqlRequest(query, { data: updateData, collectionId: collection.id });

    expect(response.errors).toBeDefined();
    expect(response.errors?.[0].message).toContain("Haettu arviointikokoelma ei kuulu sinulle");

    await prisma.teacher.delete({ where: { id: unauthorizedTeacher.id } });
    await testLogin(graphqlRequest);
  });

  it("should throw error for invalid collection ID", async () => {
    const updateData: UpdateDefaultCollectionInput = {
      description: "New description",
    };
    const invalidCollectionId = "invalid_id";

    const query = graphql(`
      mutation UpdateDefaultCollectionInvalidID($data: UpdateDefaultCollectionInput!, $collectionId: ID!) {
        updateDefaultCollection(data: $data, collectionId: $collectionId) {
          id
        }
      }
    `);

    const response = await graphqlRequest(query, { data: updateData, collectionId: invalidCollectionId });

    expect(response.errors).toBeDefined();
    expect(response.errors?.[0].message).toContain(`Hakemaasi resurssia ei löytynyt. Tarkista syöttämäsi id:t.`);
  });

  it("should throw error for evaluations not belonging to the collection", async () => {
    const newCollection = await createTestEvaluationCollection(group.currentModule.id, group.currentModule.collectionTypes[0].id);
    const unrelatedEvaluation = await createTestEvaluation(newCollection.id, group.students[0].id);
    const updateData: UpdateDefaultCollectionInput = {
      evaluations: [{ id: unrelatedEvaluation.id }],
    };

    const query = graphql(`
      mutation UpdateDefaultCollectionEvaluationsNotInCollection($data: UpdateDefaultCollectionInput!, $collectionId: ID!) {
        updateDefaultCollection(data: $data, collectionId: $collectionId) {
          id
        }
      }
    `);

    const response = await graphqlRequest(query, { data: updateData, collectionId: collection.id });

    expect(response.errors).toBeDefined();
    expect(response.errors?.[0].message).toContain("Osa muokattavista arvioinneista eivät kuulu arviointikokoelmaan");
  });

  it("should throw validation error if attempting to update an evaluation where the student was not present", async () => {
    const updateData: UpdateDefaultCollectionInput = {
      evaluations: [{ id: notPresentEvaluation.id, rating: 5 }],
    };

    const query = graphql(`
      mutation UpdateDefaultCollectionInvalidStudentPresence($data: UpdateDefaultCollectionInput!, $collectionId: ID!) {
        updateDefaultCollection(data: $data, collectionId: $collectionId) {
          id
        }
      }
    `);

    const response = await graphqlRequest(query, { data: updateData, collectionId: collection.id });

    expect(response.errors).toBeDefined();
    expect(response.errors?.[0].message).toContain(
      "Arvioinnin tallentaminen ei onnistunut. Mikäli oppilas ei ole ollut läsnä, ei arvioinnin tietoja voida päivittää."
    );
  });

  it("should throw error if attemping to update a CLASS_PARTICIPATION evaluation", async () => {
    const classParticipationType = group.currentModule.collectionTypes.find((ct) => ct.category === CollectionTypeCategory.CLASS_PARTICIPATION)!;
    const classParticipationCollection = await createTestEvaluationCollection(group.currentModuleId, classParticipationType.id);
    const classParticipationEvaluation = await createTestEvaluation(classParticipationCollection.id, group.students[0].id);
    const updateData: UpdateDefaultCollectionInput = {
      evaluations: [{ id: classParticipationEvaluation.id, rating: 5 }],
    };

    const query = graphql(`
      mutation UpdateDefaultCollectionInvalidEvaluationType($data: UpdateDefaultCollectionInput!, $collectionId: ID!) {
        updateDefaultCollection(data: $data, collectionId: $collectionId) {
          id
        }
      }
    `);

    const response = await graphqlRequest(query, { data: updateData, collectionId: classParticipationCollection.id });

    expect(response.errors).toBeDefined();
    expect(response.errors?.[0].message).toContain(
      `Arviointikokoelman tyyppi on väärä. Et voi päivittää CLASS_PARTICIPATION arviointeja tämän endpointin kautta.`
    );
  });

  it("should update DataLoaders after updating a collection and its evaluations", async () => {
    // Fetch initial state from DataLoaders
    const collectionFromDataLoaderBeforeUpdate = await collectionLoader.load(collection.id);
    const collectionsFromModuleLoaderBeforeUpdate = await collectionsByModuleLoader.load(group.currentModule.id);
    const evaluationFromDataLoaderBeforeUpdate = await evaluationLoader.load(evaluation.id);
    const evaluationsFromCollectionLoaderBeforeUpdate = await evaluationsByCollectionLoader.load(collection.id);

    expect(collectionFromDataLoaderBeforeUpdate).toEqual(collection);
    expect(collectionsFromModuleLoaderBeforeUpdate).toContainEqual(collection);
    expect(evaluationFromDataLoaderBeforeUpdate).toEqual(evaluation);
    expect(evaluationsFromCollectionLoaderBeforeUpdate).toContainEqual(evaluation);

    // Update the collection
    const updatedEvaluationData = {
      id: evaluation.id,
      wasPresent: true,
      rating: 7,
      notes: "Improved significantly",
    };
    const updateData: UpdateDefaultCollectionInput = {
      date: formatDate(new Date(), "yyyy-MM-dd"),
      description: "Updated Midterm Exam",
      evaluations: [updatedEvaluationData],
    };

    const updateDefaultCollectionQuery = graphql(`
      mutation UpdateDefaultCollectionDataLoaderCheck($data: UpdateDefaultCollectionInput!, $collectionId: ID!) {
        updateDefaultCollection(data: $data, collectionId: $collectionId) {
          id
        }
      }
    `);

    await graphqlRequest(updateDefaultCollectionQuery, { data: updateData, collectionId: collection.id });

    // Fetch the updated data from DataLoaders
    const updatedCollectionFromDataLoader = await collectionLoader.load(collection.id);
    const updatedCollectionsFromModuleLoader = await collectionsByModuleLoader.load(group.currentModule.id);
    const updatedEvaluationFromDataLoader = await evaluationLoader.load(evaluation.id);
    const updatedEvaluationsFromCollectionLoader = await evaluationsByCollectionLoader.load(collection.id);

    // Assertions for collection data
    expect(updatedCollectionFromDataLoader).toEqual(
      expect.objectContaining({
        id: collection.id,
        date: new Date(updateData.date!),
        description: updateData.description,
      })
    );
    expect(updatedCollectionsFromModuleLoader).toContainEqual(
      expect.objectContaining({
        id: collection.id,
        date: new Date(updateData.date!),
        description: updateData.description,
      })
    );

    const { rating: _, ...updatedEvaluationDataWithoutRating } = updatedEvaluationData;
    const mappedUpdatedEvaluationData = {
      ...updatedEvaluationDataWithoutRating,
      generalRating: updatedEvaluationData.rating,
    };

    // Assertions for evaluation data
    expect(updatedEvaluationFromDataLoader).toEqual(expect.objectContaining(mappedUpdatedEvaluationData));
    expect(updatedEvaluationsFromCollectionLoader).toContainEqual(expect.objectContaining(mappedUpdatedEvaluationData));
  });
});
