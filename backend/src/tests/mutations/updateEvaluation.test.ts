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
} from "../testHelpers";

describe("updateEvaluation", () => {
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
    const collectionType = group.collectionTypes.find((ct) => ct.category === CollectionTypeCategory.CLASS_PARTICIPATION)!;
    collection = await createTestEvaluationCollection(group.currentModuleId, collectionType.id);
    evaluation = await createTestEvaluation(collection.id, group.students[0].id);
  });

  afterEach(async () => {
    await prisma.evaluation.deleteMany();
  });

  it("should successfully update evaluation", async () => {
    const updateData: UpdateEvaluationInput = {
      id: evaluation.id,
      wasPresent: true,
      skillsRating: 5,
      behaviourRating: 4,
      notes: "Improved performance",
      isStellar: false,
    };

    const query = graphql(`
      mutation UpdateEvaluation($data: UpdateEvaluationInput!) {
        updateEvaluation(data: $data) {
          id
          skillsRating
          behaviourRating
          notes
          isStellar
        }
      }
    `);

    const response = await graphqlRequest(query, { data: updateData });

    expect(response.data?.updateEvaluation).toBeDefined();
    expect(response.data?.updateEvaluation.id).toEqual(updateData.id);
    expect(response.data?.updateEvaluation.skillsRating).toEqual(updateData.skillsRating);
    // Additional assertions for other fields
  });

  it("should throw error if user is not authorized to access the evaluation", async () => {
    // Assuming createTestUserAndLogin creates a new user and logs them in
    const unauthorizedTeacher = await createTestUserAndLogin(graphqlRequest, { email: "new-user@email.com", password: "password" });
    const updateData: UpdateEvaluationInput = { id: evaluation.id /* ...other fields */ };

    const query = graphql(`
      mutation UpdateEvaluationUnauthorized($data: UpdateEvaluationInput!) {
        updateEvaluation(data: $data) {
          id
        }
      }
    `);

    const response = await graphqlRequest(query, { data: updateData });

    expect(response.errors).toBeDefined();
    expect(response.errors?.[0].message).toContain("Haettu arviointi ei kuulu sinulle");
    // Cleanup: Delete unauthorized teacher and re-login original teacher if necessary
    await prisma.teacher.delete({ where: { id: unauthorizedTeacher.id } });
    await testLogin(graphqlRequest);
  });

  it("should throw error for invalid evaluation ID", async () => {
    const updateData: UpdateEvaluationInput = { id: "invalid_id" };

    const query = graphql(`
      mutation UpdateEvaluationInvalidID($data: UpdateEvaluationInput!) {
        updateEvaluation(data: $data) {
          id
        }
      }
    `);

    const response = await graphqlRequest(query, { data: updateData });

    expect(response.errors).toBeDefined();
    expect(response.errors?.[0].message).toContain(`Hakemaasi resurssia ei löytynyt. Tarkista syöttämäsi id:t.`);
  });

  it("should throw error if the student was not present and trying to update fields", async () => {
    // Create an evaluation with `wasPresent` set to false
    const notPresentEvaluation = await createTestEvaluation(collection.id, group.students[0].id, { wasPresent: false });
    const updateData: UpdateEvaluationInput = { id: notPresentEvaluation.id, wasPresent: false, skillsRating: 5 /* ...other fields */ };

    const query = graphql(`
      mutation UpdateEvaluationNotPresent($data: UpdateEvaluationInput!) {
        updateEvaluation(data: $data) {
          id
        }
      }
    `);

    const response = await graphqlRequest(query, { data: updateData });

    expect(response.errors).toBeDefined();
    expect(response.errors?.[0].message).toContain(
      "Arvioinnin tallentaminen ei onnistunut. Mikäli oppilas ei ole ollut läsnä, ei arvioinnin tietoja voida päivittää."
    );
  });
});
