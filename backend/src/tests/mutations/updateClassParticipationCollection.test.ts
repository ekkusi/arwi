import { CollectionTypeCategory, Evaluation, EvaluationCollection } from "@prisma/client";
import { graphql } from "../gql";
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
import { UpdateClassParticipationCollectionInput } from "../../types";

describe("updateClassParticipationCollection", () => {
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
    const collectionType = group.collectionTypes.find((type) => type.category === CollectionTypeCategory.CLASS_PARTICIPATION)!;
    collection = await createTestEvaluationCollection(group.currentModule.id, collectionType.id); // Assuming createTestCollection exists
    evaluation = await createTestEvaluation(collection.id, group.students[0].id); // Assuming createTestEvaluation exists
    notPresentEvaluation = await createTestEvaluation(collection.id, group.students[1].id, { wasPresent: false });
  });

  afterEach(async () => {
    await prisma.evaluationCollection.deleteMany();
  });

  it("should successfully update a collection", async () => {
    const updatedEvaluation = {
      id: evaluation.id,
      wasPresent: true,
      skillsRating: 6,
      behaviourRating: 8,
      notes: "Improved performance and stuff",
    };
    const updateData: UpdateClassParticipationCollectionInput = {
      // Assuming correct structure for UpdateClassParticipationCollectionInput
      date: formatDate(new Date(), "yyyy-MM-dd"),
      environmentCode: "LI_ENV_TAN",
      description: "Midterm Exam",
      learningObjectiveCodes: ["T1", "T3"],
      evaluations: [updatedEvaluation],
    };

    const query = graphql(`
      mutation UpdateClassParticipationCollection($data: UpdateClassParticipationCollectionInput!, $collectionId: ID!) {
        updateClassParticipationCollection(data: $data, collectionId: $collectionId) {
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
            id
            skillsRating
            behaviourRating
            notes
            wasPresent
          }
          learningObjectives {
            code
          }
        }
      }
    `);

    const response = await graphqlRequest(query, { data: updateData, collectionId: collection.id });

    expect(response.data?.updateClassParticipationCollection).toBeDefined();
    expect(response.data?.updateClassParticipationCollection.id).toEqual(collection.id);
    expect(response.data?.updateClassParticipationCollection.date).toEqual(updateData.date);
    expect(response.data?.updateClassParticipationCollection.environment.code).toEqual(updateData.environmentCode);
    expect(response.data?.updateClassParticipationCollection.description).toEqual(updateData.description);
    expect(response.data?.updateClassParticipationCollection.learningObjectives.map((lo) => lo.code)).toEqual(updateData.learningObjectiveCodes);
    const updatedEvaluationResponse = response.data?.updateClassParticipationCollection.evaluations.find((e) => e.id === updatedEvaluation.id);
    expect(updatedEvaluationResponse).toBeDefined();
    expect(updatedEvaluationResponse?.wasPresent).toEqual(updatedEvaluation.wasPresent);
    expect(updatedEvaluationResponse?.skillsRating).toEqual(updatedEvaluation.skillsRating);
    expect(updatedEvaluationResponse?.behaviourRating).toEqual(updatedEvaluation.behaviourRating);
    expect(updatedEvaluationResponse?.notes).toEqual(updatedEvaluation.notes);
  });

  it("should throw error if user is not authorized for the collection", async () => {
    const unauthorizedTeacher = await createTestUserAndLogin(graphqlRequest, {
      email: "new-user@email.com",
      password: "password",
    });
    const updateData: UpdateClassParticipationCollectionInput = {
      description: "New description",
    };

    const query = graphql(`
      mutation UpdateClassParticipationCollectionUnauthorized($data: UpdateClassParticipationCollectionInput!, $collectionId: ID!) {
        updateClassParticipationCollection(data: $data, collectionId: $collectionId) {
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
    const updateData: UpdateClassParticipationCollectionInput = {
      description: "New description",
    };
    const invalidCollectionId = "invalid_id";

    const query = graphql(`
      mutation UpdateClassParticipationCollectionInvalidID($data: UpdateClassParticipationCollectionInput!, $collectionId: ID!) {
        updateClassParticipationCollection(data: $data, collectionId: $collectionId) {
          id
        }
      }
    `);

    const response = await graphqlRequest(query, { data: updateData, collectionId: invalidCollectionId });

    expect(response.errors).toBeDefined();
    expect(response.errors?.[0].message).toContain(`Hakemaasi resurssia ei löytynyt. Tarkista syöttämäsi id:t.`);
  });

  it("should throw error for invalid environment code", async () => {
    const updateData: UpdateClassParticipationCollectionInput = {
      environmentCode: "invalid_env_code",
    };

    const query = graphql(`
      mutation UpdateClassParticipationCollectionInvalidEnvironment($data: UpdateClassParticipationCollectionInput!, $collectionId: ID!) {
        updateClassParticipationCollection(data: $data, collectionId: $collectionId) {
          id
        }
      }
    `);

    const response = await graphqlRequest(query, { data: updateData, collectionId: collection.id });

    expect(response.errors).toBeDefined();
    expect(response.errors?.[0].message).toContain("Ympäristöä koodilla 'invalid_env_code' ei ole olemassa.");
  });

  it("should throw error for invalid learning objectives", async () => {
    const updateData: UpdateClassParticipationCollectionInput = {
      learningObjectiveCodes: ["invalid_lo_1", "invalid_lo_2"],
    };

    const query = graphql(`
      mutation UpdateClassParticipationCollectionInvalidLearningObjectives($data: UpdateClassParticipationCollectionInput!, $collectionId: ID!) {
        updateClassParticipationCollection(data: $data, collectionId: $collectionId) {
          id
        }
      }
    `);

    const response = await graphqlRequest(query, { data: updateData, collectionId: collection.id });

    expect(response.errors).toBeDefined();
    expect(response.errors?.[0].message).toContain("Osa oppimistavoitteista ei ole olemassa tai ei ole arvioitavia.");
  });

  it("should throw error for evaluations not belonging to the collection", async () => {
    const newCollection = await createTestEvaluationCollection(group.currentModule.id, group.collectionTypes[0].id);
    const unrelatedEvaluation = await createTestEvaluation(newCollection.id, group.students[0].id);
    const updateData: UpdateClassParticipationCollectionInput = {
      evaluations: [{ id: unrelatedEvaluation.id }],
    };

    const query = graphql(`
      mutation UpdateClassParticipationCollectionEvaluationsNotInCollection($data: UpdateClassParticipationCollectionInput!, $collectionId: ID!) {
        updateClassParticipationCollection(data: $data, collectionId: $collectionId) {
          id
        }
      }
    `);

    const response = await graphqlRequest(query, { data: updateData, collectionId: collection.id });

    expect(response.errors).toBeDefined();
    expect(response.errors?.[0].message).toContain("Osa muokattavista arvioinneista eivät kuulu arviointikokoelmaan");
  });

  it("should throw validation error if attempting to update an evaluation where the student was not present", async () => {
    const updateData: UpdateClassParticipationCollectionInput = {
      evaluations: [{ id: notPresentEvaluation.id, skillsRating: 5 }],
    };

    const query = graphql(`
      mutation UpdateClassParticipationCollectionInvalidStudentPresence($data: UpdateClassParticipationCollectionInput!, $collectionId: ID!) {
        updateClassParticipationCollection(data: $data, collectionId: $collectionId) {
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

  it("should throw error if attempting to update an evaluation that is not CLASS_PARTICIPATION", async () => {
    // Create a collection that is not of type CLASS_PARTICIPATION
    const collectionType = group.collectionTypes.find((ct) => ct.category !== CollectionTypeCategory.CLASS_PARTICIPATION)!;
    const defaultCollection = await createTestEvaluationCollection(group.currentModuleId, collectionType.id, {
      environmentCode: undefined,
      learningObjectiveCodes: [],
    });
    const defaultEvaluation = await createTestEvaluation(defaultCollection.id, group.students[0].id, {
      skillsRating: undefined,
      behaviourRating: undefined,
      generalRating: 6,
    });
    const updateData: UpdateClassParticipationCollectionInput = {
      evaluations: [{ id: defaultEvaluation.id, skillsRating: 5 }],
    };

    const query = graphql(`
      mutation UpdateClassParticipationCollectionInvalidEvaluationType($data: UpdateClassParticipationCollectionInput!, $collectionId: ID!) {
        updateClassParticipationCollection(data: $data, collectionId: $collectionId) {
          id
        }
      }
    `);

    const response = await graphqlRequest(query, { data: updateData, collectionId: defaultCollection.id });

    expect(response.errors).toBeDefined();
    expect(response.errors?.[0].message).toContain(
      `Arviointikokoelman tyyppi on väärä. Et voi päivittää muita kuin CLASS_PARTICIPATION arviointeja tämän endpointin kautta.`
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
      skillsRating: 7,
      behaviourRating: 8,
      notes: "Improved significantly",
    };
    const updateData: UpdateClassParticipationCollectionInput = {
      date: formatDate(new Date(), "yyyy-MM-dd"),
      environmentCode: "LI_ENV_TAN",
      description: "Updated Midterm Exam",
      learningObjectiveCodes: ["T1", "T4"],
      evaluations: [updatedEvaluationData],
    };

    const updateClassParticipationCollectionQuery = graphql(`
      mutation UpdateClassParticipationCollectionDataLoaderCheck($data: UpdateClassParticipationCollectionInput!, $collectionId: ID!) {
        updateClassParticipationCollection(data: $data, collectionId: $collectionId) {
          id
        }
      }
    `);

    await graphqlRequest(updateClassParticipationCollectionQuery, { data: updateData, collectionId: collection.id });

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
        learningObjectiveCodes: updateData.learningObjectiveCodes,
      })
    );
    expect(updatedCollectionsFromModuleLoader).toContainEqual(
      expect.objectContaining({
        id: collection.id,
        date: new Date(updateData.date!),
        description: updateData.description,
        learningObjectiveCodes: updateData.learningObjectiveCodes,
      })
    );

    // Assertions for evaluation data
    expect(updatedEvaluationFromDataLoader).toEqual(expect.objectContaining(updatedEvaluationData));
    expect(updatedEvaluationsFromCollectionLoader).toContainEqual(expect.objectContaining(updatedEvaluationData));
  });
});
