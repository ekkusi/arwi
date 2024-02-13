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
import { evaluationLoader, evaluationsByCollectionLoader } from "../../graphql/dataLoaders/evaluation";
import { UpdateDefaultEvaluationInput } from "../../types";

describe("updateDefaultEvaluation", () => {
  let graphqlRequest: TestGraphQLRequest;
  let teacher: TestTeacher;
  let group: TestGroup;
  let collection: EvaluationCollection;
  let evaluation: Evaluation;

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
    evaluation = await createTestEvaluation(collection.id, group.students[0].id, {
      skillsRating: undefined,
      behaviourRating: undefined,
      generalRating: 6,
    });
  });

  afterEach(async () => {
    await prisma.evaluation.deleteMany();
  });

  const baseUpdateData: Omit<UpdateDefaultEvaluationInput, "id"> = {
    wasPresent: true,
    notes: "Updated notes",
    rating: 5,
  };

  it("should successfully update evaluation", async () => {
    const updateData: UpdateDefaultEvaluationInput = {
      id: evaluation.id,
      ...baseUpdateData,
    };

    const query = graphql(`
      mutation UpdateDefaultEvaluation($input: UpdateDefaultEvaluationInput!) {
        updateDefaultEvaluation(input: $input) {
          id
          rating
          notes
        }
      }
    `);

    const response = await graphqlRequest(query, { input: updateData });

    expect(response.data?.updateDefaultEvaluation).toBeDefined();
    expect(response.data?.updateDefaultEvaluation.id).toEqual(updateData.id);
    expect(response.data?.updateDefaultEvaluation.rating).toEqual(updateData.rating);
  });

  it("should throw error for rating less than 4", async () => {
    const updateData = { ...baseUpdateData, id: evaluation.id, rating: 3 };

    const query = graphql(`
      mutation UpdateDefaultEvaluationRatingLow($input: UpdateDefaultEvaluationInput!) {
        updateDefaultEvaluation(input: $input) {
          id
        }
      }
    `);

    const response = await graphqlRequest(query, { input: updateData });

    expect(response.errors).toBeDefined();
    expect(response.errors?.[0].message).toContain(`Arvosanan on oltava välillä 4-10.`);
  });

  it("should throw error for rating that is not interval of .25", async () => {
    const updateData = { ...baseUpdateData, id: evaluation.id, rating: 4.3 };

    const query = graphql(`
      mutation UpdateDefaultEvaluationRatingInvalidInterval($input: UpdateDefaultEvaluationInput!) {
        updateDefaultEvaluation(input: $input) {
          id
        }
      }
    `);

    const response = await graphqlRequest(query, { input: updateData });

    expect(response.errors).toBeDefined();
    expect(response.errors?.[0].message).toContain(`Arvosanan on oltava jaollinen 0.25:llä.`);
  });

  it("should throw error for rating greater than 10", async () => {
    const updateData = { ...baseUpdateData, id: evaluation.id, rating: 11 };

    const query = graphql(`
      mutation UpdateDefaultEvaluationRatingHigh($input: UpdateDefaultEvaluationInput!) {
        updateDefaultEvaluation(input: $input) {
          id
        }
      }
    `);

    const response = await graphqlRequest(query, { input: updateData });

    expect(response.errors).toBeDefined();
    expect(response.errors?.[0].message).toContain(`Arvosanan on oltava välillä 4-10.`);
  });

  it("should throw error if user is not authorized to access the evaluation", async () => {
    // Assuming createTestUserAndLogin creates a new user and logs them in
    const unauthorizedTeacher = await createTestUserAndLogin(graphqlRequest, { email: "new-user@email.com", password: "password" });
    const updateData: UpdateDefaultEvaluationInput = { id: evaluation.id /* ...other fields */ };

    const query = graphql(`
      mutation UpdateDefaultEvaluationUnauthorized($input: UpdateDefaultEvaluationInput!) {
        updateDefaultEvaluation(input: $input) {
          id
        }
      }
    `);

    const response = await graphqlRequest(query, { input: updateData });

    expect(response.errors).toBeDefined();
    expect(response.errors?.[0].message).toContain("Haettu arviointi ei kuulu sinulle");
    // Cleanup: Delete unauthorized teacher and re-login original teacher if necessary
    await prisma.teacher.delete({ where: { id: unauthorizedTeacher.id } });
    await testLogin(graphqlRequest);
  });

  it("should throw error for invalid evaluation ID", async () => {
    const updateData: UpdateDefaultEvaluationInput = { id: "invalid_id" };

    const query = graphql(`
      mutation UpdateDefaultEvaluationInvalidID($input: UpdateDefaultEvaluationInput!) {
        updateDefaultEvaluation(input: $input) {
          id
        }
      }
    `);

    const response = await graphqlRequest(query, { input: updateData });

    expect(response.errors).toBeDefined();
    expect(response.errors?.[0].message).toContain(`Hakemaasi resurssia ei löytynyt. Tarkista syöttämäsi id:t.`);
  });

  it("should throw error if the student was not present and trying to update fields", async () => {
    // Create an evaluation with `wasPresent` set to false
    const notPresentEvaluation = await createTestEvaluation(collection.id, group.students[0].id, { wasPresent: false });
    const updateData: UpdateDefaultEvaluationInput = {
      id: notPresentEvaluation.id,
      wasPresent: false,
      rating: 5,
    };

    const query = graphql(`
      mutation UpdateDefaultEvaluationNotPresent($input: UpdateDefaultEvaluationInput!) {
        updateDefaultEvaluation(input: $input) {
          id
        }
      }
    `);

    const response = await graphqlRequest(query, { input: updateData });

    expect(response.errors).toBeDefined();
    expect(response.errors?.[0].message).toContain(
      "Arvioinnin tallentaminen ei onnistunut. Mikäli oppilas ei ole ollut läsnä, ei arvioinnin tietoja voida päivittää."
    );
  });

  it("should throw error if trying to update CLASS_PARTICIPATION evaluation", async () => {
    // Create an evaluation with `wasPresent` set to false
    const classParticipationType = group.currentModule.collectionTypes.find((ct) => ct.category === CollectionTypeCategory.CLASS_PARTICIPATION)!;
    const classParticipationCollection = await createTestEvaluationCollection(group.currentModuleId, classParticipationType.id);
    const classParticipationEvaluation = await createTestEvaluation(classParticipationCollection.id, group.students[0].id);
    const updateData: UpdateDefaultEvaluationInput = {
      id: classParticipationEvaluation.id,
      wasPresent: true,
      rating: 5,
    };

    const query = graphql(`
      mutation UpdateDefaultEvaluationClassParticipationUpdate($input: UpdateDefaultEvaluationInput!) {
        updateDefaultEvaluation(input: $input) {
          id
        }
      }
    `);

    const response = await graphqlRequest(query, { input: updateData });

    expect(response.errors).toBeDefined();
    expect(response.errors?.[0].message).toContain(
      `Arviointikokoelman tyyppi on väärä. Et voi päivittää CLASS_PARTICIPATION arviointeja tämän endpointin kautta.`
    );
  });

  it("should update DataLoaders after updating an evaluation", async () => {
    // Fetch the initial state of the evaluation from the DataLoader
    const evaluationFromDataLoaderBeforeUpdate = await evaluationLoader.load(evaluation.id);
    const evaluationsFromCollectionLoaderBeforeUpdate = await evaluationsByCollectionLoader.load(collection.id);
    const matchingEvaluationBeforeUpdate = evaluationsFromCollectionLoaderBeforeUpdate.find((e) => e.id === evaluation.id);

    expect(evaluationFromDataLoaderBeforeUpdate).toEqual(evaluation);
    expect(matchingEvaluationBeforeUpdate).toEqual(evaluation);

    // Update the evaluation
    const updatedData = {
      id: evaluation.id,
      wasPresent: true,
      rating: 6,
      notes: "Newly updated notes",
    };

    const query = graphql(`
      mutation UpdateDefaultEvaluationDataLoaderCheck($input: UpdateDefaultEvaluationInput!) {
        updateDefaultEvaluation(input: $input) {
          id
          rating
          notes
        }
      }
    `);

    await graphqlRequest(query, { input: updatedData });

    // Fetch the updated evaluation and compare the data
    const updatedEvaluationFromDataLoader = await evaluationLoader.load(evaluation.id);
    const updatedEvaluationsFromCollectionLoader = await evaluationsByCollectionLoader.load(collection.id);
    const matchingUpdatedEvaluation = updatedEvaluationsFromCollectionLoader.find((e) => e.id === evaluation.id);

    const { rating: _, ...updatedDataWithoutRating } = updatedData;
    const mappedUpdatedData = {
      ...updatedDataWithoutRating,
      generalRating: updatedData.rating,
    };

    expect(updatedEvaluationFromDataLoader).toEqual(expect.objectContaining(mappedUpdatedData));
    expect(matchingUpdatedEvaluation).toEqual(expect.objectContaining(mappedUpdatedData));
  });
});
