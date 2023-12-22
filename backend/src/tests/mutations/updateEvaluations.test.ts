import { CollectionTypeCategory, Evaluation, EvaluationCollection } from "@prisma/client";
import { graphql } from "../gql";
import createServer, { TestGraphQLRequest } from "../createTestServer";
import prisma from "@/prismaClient";
import { UpdateEvaluationInput } from "../../types";
import {
  TestGroup,
  TestTeacher,
  createTestEvaluation,
  createTestEvaluationCollection,
  createTestGroup,
  createTestUserAndLogin,
  testLogin,
  testLogout,
} from "../testHelpers";
import { evaluationLoader, evaluationsByCollectionLoader } from "../../graphql/dataLoaders/evaluation";

describe("updateEvaluations", () => {
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
    const collectionType = group.collectionTypes.find((ct) => ct.category === CollectionTypeCategory.CLASS_PARTICIPATION)!;
    collection = await createTestEvaluationCollection(group.currentModuleId, collectionType.id);
    evaluation = await createTestEvaluation(collection.id, group.students[0].id);
    notPresentEvaluation = await createTestEvaluation(collection.id, group.students[1].id, { wasPresent: false });
  });

  afterEach(async () => {
    await prisma.evaluationCollection.deleteMany();
  });

  it("should successfully update evaluations", async () => {
    const updateData: UpdateEvaluationInput[] = [
      {
        id: evaluation.id,
        wasPresent: true,
        skillsRating: 5,
        behaviourRating: 4,
        notes: "Improved performance",
        isStellar: false,
      },
    ];

    const query = graphql(`
      mutation UpdateEvaluations($data: [UpdateEvaluationInput!]!, $collectionId: ID!) {
        updateEvaluations(data: $data, collectionId: $collectionId)
      }
    `);

    const response = await graphqlRequest(query, { data: updateData, collectionId: collection.id });

    expect(response.data?.updateEvaluations).toBeDefined();
    expect(response.data?.updateEvaluations).toEqual(updateData.length);
  });

  it("should throw error for unauthenticated user", async () => {
    const updateData = [
      {
        id: evaluation.id,
      },
    ];

    // Logout
    await testLogout(graphqlRequest);

    const query = graphql(`
      mutation UpdateEvaluationsUnauthenticated($data: [UpdateEvaluationInput!]!, $collectionId: ID!) {
        updateEvaluations(data: $data, collectionId: $collectionId)
      }
    `);

    const response = await graphqlRequest(query, { data: updateData, collectionId: collection.id });

    expect(response.errors).toBeDefined();
    expect(response.errors?.[0].extensions?.code).toEqual("UNAUTHENTICATED");

    // Login again
    await testLogin(graphqlRequest);
  });

  it("should throw error if user is not authorized for the collection", async () => {
    const unauthorizedTeacher = await createTestUserAndLogin(graphqlRequest, {
      email: "new-user@email.com",
      password: "password",
    });
    const updateData = [{ id: evaluation.id }];

    const query = graphql(`
      mutation UpdateEvaluationsUnauthorized($data: [UpdateEvaluationInput!]!, $collectionId: ID!) {
        updateEvaluations(data: $data, collectionId: $collectionId)
      }
    `);

    const response = await graphqlRequest(query, { data: updateData, collectionId: collection.id });

    expect(response.errors).toBeDefined();
    expect(response.errors?.[0].message).toContain("Haettu arviointikokoelma ei kuulu sinulle");

    // Delete the unauthorized teacher and login again to default one
    await prisma.teacher.delete({ where: { id: unauthorizedTeacher.id } });
    await testLogin(graphqlRequest);
  });

  it("should throw error for evaluations not belonging to the collection", async () => {
    const newCollection = await createTestEvaluationCollection(group.currentModuleId, group.collectionTypes[0].id);
    const unrelatedEvaluation = await createTestEvaluation(newCollection.id, group.students[0].id);
    const updateData = [{ id: unrelatedEvaluation.id }];

    const query = graphql(`
      mutation UpdateEvaluationsNotInCollection($data: [UpdateEvaluationInput!]!, $collectionId: ID!) {
        updateEvaluations(data: $data, collectionId: $collectionId)
      }
    `);

    const response = await graphqlRequest(query, { data: updateData, collectionId: collection.id });

    expect(response.errors).toBeDefined();
    expect(response.errors?.[0].message).toContain("Osa muokattavista arvioinneista eivät kuulu arviointikokoelmaan");
  });

  it("should throw validation error if attempting to update an evaluation where the student was not present", async () => {
    const updateData = [{ id: notPresentEvaluation.id, skillsRating: 5 }];

    const query = graphql(`
      mutation UpdateEvaluationsNotPresent($data: [UpdateEvaluationInput!]!, $collectionId: ID!) {
        updateEvaluations(data: $data, collectionId: $collectionId)
      }
    `);

    const response = await graphqlRequest(query, { data: updateData, collectionId: collection.id });

    expect(response.errors).toBeDefined();
    expect(response.errors?.[0].message).toContain(
      "Arvioinnin tallentaminen ei onnistunut. Mikäli oppilas ei ole ollut läsnä, ei arvioinnin tietoja voida päivittää."
    );
  });

  it("should reflect updates in DataLoader after updating evaluations", async () => {
    // Fetch the evaluation and compare the data
    const evaluationFromDataLoader = await evaluationLoader.load(evaluation.id);
    const evaluationsFromCollectionLoader = await evaluationsByCollectionLoader.load(collection.id);
    const matchingEvaluation = evaluationsFromCollectionLoader.find((e) => e.id === evaluation.id);
    expect(evaluationFromDataLoader).toEqual(evaluation);
    expect(matchingEvaluation).toEqual(evaluation);

    const updatedData = [
      {
        id: evaluation.id,
        wasPresent: true,
        skillsRating: 6,
        behaviourRating: 6,
        notes: "Updated notes",
        isStellar: false,
      },
    ];

    const updateQuery = graphql(`
      mutation UpdateEvaluationsDataLoader($data: [UpdateEvaluationInput!]!, $collectionId: ID!) {
        updateEvaluations(data: $data, collectionId: $collectionId)
      }
    `);

    const result = await graphqlRequest(updateQuery, { data: updatedData, collectionId: collection.id });

    expect(result.data?.updateEvaluations).toEqual(1);

    // Fetch the evaluation and compare the data
    const updatedEvaluationFromDataLoader = await evaluationLoader.load(evaluation.id);
    const updatedEvaluationsFromCollectionLoader = await evaluationsByCollectionLoader.load(collection.id);
    const matchingUpdatedEvaluation = updatedEvaluationsFromCollectionLoader.find((e) => e.id === evaluation.id);
    expect(updatedEvaluationFromDataLoader).toEqual({ ...evaluation, ...updatedData[0] });
    expect(matchingUpdatedEvaluation).toEqual({ ...evaluation, ...updatedData[0] });
  });
});
