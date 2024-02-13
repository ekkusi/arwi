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
import { UpdateClassParticipationEvaluationInput } from "../../types";

describe("updateClassParticipationEvaluation", () => {
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
    const collectionType = group.currentModule.collectionTypes.find((ct) => ct.category === CollectionTypeCategory.CLASS_PARTICIPATION)!;
    collection = await createTestEvaluationCollection(group.currentModuleId, collectionType.id);
    evaluation = await createTestEvaluation(collection.id, group.students[0].id);
  });

  afterEach(async () => {
    await prisma.evaluation.deleteMany();
  });

  const baseUpdateData: Omit<UpdateClassParticipationEvaluationInput, "id"> = {
    wasPresent: true,
    skillsRating: 5,
    behaviourRating: 4,
    notes: "Updated notes",
  };

  it("should successfully update evaluation", async () => {
    const updateData: UpdateClassParticipationEvaluationInput = {
      id: evaluation.id,
      ...baseUpdateData,
    };

    const query = graphql(`
      mutation UpdateClassParticipationEvaluation($input: UpdateClassParticipationEvaluationInput!) {
        updateClassParticipationEvaluation(input: $input) {
          id
          skillsRating
          behaviourRating
          notes
        }
      }
    `);

    const response = await graphqlRequest(query, { input: updateData });

    expect(response.data?.updateClassParticipationEvaluation).toBeDefined();
    expect(response.data?.updateClassParticipationEvaluation.id).toEqual(updateData.id);
    expect(response.data?.updateClassParticipationEvaluation.skillsRating).toEqual(updateData.skillsRating);
  });

  it("should throw error for behaviourRating less than 4", async () => {
    const updateData = { ...baseUpdateData, id: evaluation.id, behaviourRating: 3 };

    const query = graphql(`
      mutation UpdateClassParticipationEvaluationBehaviourRatingLow($input: UpdateClassParticipationEvaluationInput!) {
        updateClassParticipationEvaluation(input: $input) {
          id
        }
      }
    `);

    const response = await graphqlRequest(query, { input: updateData });

    expect(response.errors).toBeDefined();
    expect(response.errors?.[0].message).toContain("Käytöksen arvosanan on oltava välillä 4-10");
  });

  it("should throw error for behaviourRating greater than 10", async () => {
    const updateData = { ...baseUpdateData, id: evaluation.id, behaviourRating: 11 };

    const query = graphql(`
      mutation UpdateClassParticipationEvaluationBehaviourRatingHigh($input: UpdateClassParticipationEvaluationInput!) {
        updateClassParticipationEvaluation(input: $input) {
          id
        }
      }
    `);

    const response = await graphqlRequest(query, { input: updateData });

    expect(response.errors).toBeDefined();
    expect(response.errors?.[0].message).toContain("Käytöksen arvosanan on oltava välillä 4-10");
  });

  it("should throw error for skillsRating less than 4", async () => {
    const updateData = { ...baseUpdateData, id: evaluation.id, skillsRating: 3 };

    const query = graphql(`
      mutation UpdateClassParticipationEvaluationSkillsRatingLow($input: UpdateClassParticipationEvaluationInput!) {
        updateClassParticipationEvaluation(input: $input) {
          id
        }
      }
    `);

    const response = await graphqlRequest(query, { input: updateData });

    expect(response.errors).toBeDefined();
    expect(response.errors?.[0].message).toContain("Taitojen arvosanan on oltava välillä 4-10");
  });

  it("should throw error for skillsRating greater than 10", async () => {
    const updateData = { ...baseUpdateData, id: evaluation.id, skillsRating: 11 };

    const query = graphql(`
      mutation UpdateClassParticipationEvaluationSkillsRatingHigh($input: UpdateClassParticipationEvaluationInput!) {
        updateClassParticipationEvaluation(input: $input) {
          id
        }
      }
    `);

    const response = await graphqlRequest(query, { input: updateData });

    expect(response.errors).toBeDefined();
    expect(response.errors?.[0].message).toContain("Taitojen arvosanan on oltava välillä 4-10");
  });

  it("should throw error if user is not authorized to access the evaluation", async () => {
    // Assuming createTestUserAndLogin creates a new user and logs them in
    const unauthorizedTeacher = await createTestUserAndLogin(graphqlRequest, { email: "new-user@email.com", password: "password" });
    const updateData: UpdateClassParticipationEvaluationInput = { id: evaluation.id /* ...other fields */ };

    const query = graphql(`
      mutation UpdateClassParticipationEvaluationUnauthorized($input: UpdateClassParticipationEvaluationInput!) {
        updateClassParticipationEvaluation(input: $input) {
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
    const updateData: UpdateClassParticipationEvaluationInput = { id: "invalid_id" };

    const query = graphql(`
      mutation UpdateClassParticipationEvaluationInvalidID($input: UpdateClassParticipationEvaluationInput!) {
        updateClassParticipationEvaluation(input: $input) {
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
    const updateData: UpdateClassParticipationEvaluationInput = {
      id: notPresentEvaluation.id,
      wasPresent: false,
      skillsRating: 5 /* ...other fields */,
    };

    const query = graphql(`
      mutation UpdateClassParticipationEvaluationNotPresent($input: UpdateClassParticipationEvaluationInput!) {
        updateClassParticipationEvaluation(input: $input) {
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

  it("should throw error if attempting to update evaluation in a collection that is not of type CLASS_PARTICIPATION", async () => {
    // Create a collection that is not of type CLASS_PARTICIPATION
    const collectionType = group.currentModule.collectionTypes.find((ct) => ct.category !== CollectionTypeCategory.CLASS_PARTICIPATION)!;
    const defaultCollection = await createTestEvaluationCollection(group.currentModuleId, collectionType.id, {
      environmentCode: undefined,
      learningObjectiveCodes: [],
    });
    const defaultEvaluation = await createTestEvaluation(defaultCollection.id, group.students[0].id, {
      skillsRating: undefined,
      behaviourRating: undefined,
      generalRating: 6,
    });
    const updateData: UpdateClassParticipationEvaluationInput = { id: defaultEvaluation.id };

    const query = graphql(`
      mutation UpdateClassParticipationEvaluationWrongCollectionType($input: UpdateClassParticipationEvaluationInput!) {
        updateClassParticipationEvaluation(input: $input) {
          id
        }
      }
    `);

    const response = await graphqlRequest(query, { input: updateData });

    expect(response.errors).toBeDefined();
    expect(response.errors?.[0].message).toContain(
      `Arviointikokoelman tyyppi on väärä. Et voi päivittää muita kuin CLASS_PARTICIPATION arviointeja tämän endpointin kautta.`
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
      skillsRating: 6,
      behaviourRating: 6,
      notes: "Newly updated notes",
    };

    const query = graphql(`
      mutation UpdateClassParticipationEvaluationDataLoaderCheck($input: UpdateClassParticipationEvaluationInput!) {
        updateClassParticipationEvaluation(input: $input) {
          id
          skillsRating
          behaviourRating
          notes
        }
      }
    `);

    await graphqlRequest(query, { input: updatedData });

    // Fetch the updated evaluation and compare the data
    const updatedEvaluationFromDataLoader = await evaluationLoader.load(evaluation.id);
    const updatedEvaluationsFromCollectionLoader = await evaluationsByCollectionLoader.load(collection.id);
    const matchingUpdatedEvaluation = updatedEvaluationsFromCollectionLoader.find((e) => e.id === evaluation.id);

    expect(updatedEvaluationFromDataLoader).toEqual(expect.objectContaining(updatedData));
    expect(matchingUpdatedEvaluation).toEqual(expect.objectContaining(updatedData));
  });
});
