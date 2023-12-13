import { CollectionTypeCategory, Evaluation, EvaluationCollection } from "@prisma/client";
import { graphql } from "../gql";
import createServer, { TestGraphQLRequest } from "../createTestServer";
import prisma from "@/prismaClient";
import { UpdateCollectionInput } from "../../types";
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
import { formatDate } from "../../utils/date";

describe("updateCollection", () => {
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
      isStellar: true,
    };
    const updateData: UpdateCollectionInput = {
      // Assuming correct structure for UpdateCollectionInput
      date: formatDate(new Date(), "yyyy-MM-dd"),
      environmentCode: "LI_ENV_TAN",
      typeId: group.collectionTypes.find((type) => type.category === CollectionTypeCategory.EXAM)!.id,
      description: "Midterm Exam",
      learningObjectiveCodes: ["T1", "T3"],
      evaluations: [updatedEvaluation],
    };

    const query = graphql(`
      mutation UpdateCollection($data: UpdateCollectionInput!, $collectionId: ID!) {
        updateCollection(data: $data, collectionId: $collectionId) {
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
            isStellar
          }
          learningObjectives {
            code
          }
        }
      }
    `);

    const response = await graphqlRequest(query, { data: updateData, collectionId: collection.id });

    expect(response.data?.updateCollection).toBeDefined();
    expect(response.data?.updateCollection.id).toEqual(collection.id);
    expect(response.data?.updateCollection.date).toEqual(updateData.date);
    expect(response.data?.updateCollection.environment.code).toEqual(updateData.environmentCode);
    expect(response.data?.updateCollection.type.id).toEqual(updateData.typeId);
    expect(response.data?.updateCollection.description).toEqual(updateData.description);
    expect(response.data?.updateCollection.learningObjectives.map((lo) => lo.code)).toEqual(updateData.learningObjectiveCodes);
    const updatedEvaluationResponse = response.data?.updateCollection.evaluations.find((e) => e.id === updatedEvaluation.id);
    expect(updatedEvaluationResponse).toBeDefined();
    expect(updatedEvaluationResponse?.wasPresent).toEqual(updatedEvaluation.wasPresent);
    expect(updatedEvaluationResponse?.skillsRating).toEqual(updatedEvaluation.skillsRating);
    expect(updatedEvaluationResponse?.behaviourRating).toEqual(updatedEvaluation.behaviourRating);
    expect(updatedEvaluationResponse?.notes).toEqual(updatedEvaluation.notes);
    expect(updatedEvaluationResponse?.isStellar).toEqual(updatedEvaluation.isStellar);
  });

  it("should throw error if user is not authorized for the collection", async () => {
    const unauthorizedTeacher = await createTestUserAndLogin(graphqlRequest, {
      email: "new-user@email.com",
      password: "password",
    });
    const updateData: UpdateCollectionInput = {
      description: "New description",
    };

    const query = graphql(`
      mutation UpdateCollectionUnauthorized($data: UpdateCollectionInput!, $collectionId: ID!) {
        updateCollection(data: $data, collectionId: $collectionId) {
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
    const updateData: UpdateCollectionInput = {
      description: "New description",
    };
    const invalidCollectionId = "invalid_id";

    const query = graphql(`
      mutation UpdateCollectionInvalidID($data: UpdateCollectionInput!, $collectionId: ID!) {
        updateCollection(data: $data, collectionId: $collectionId) {
          id
        }
      }
    `);

    const response = await graphqlRequest(query, { data: updateData, collectionId: invalidCollectionId });

    expect(response.errors).toBeDefined();
    expect(response.errors?.[0].message).toContain(`Hakemaasi resurssia ei löytynyt. Tarkista syöttämäsi id:t.`);
  });

  it("should throw error for invalid environment code", async () => {
    const updateData: UpdateCollectionInput = {
      environmentCode: "invalid_env_code",
    };

    const query = graphql(`
      mutation UpdateCollectionInvalidEnvironment($data: UpdateCollectionInput!, $collectionId: ID!) {
        updateCollection(data: $data, collectionId: $collectionId) {
          id
        }
      }
    `);

    const response = await graphqlRequest(query, { data: updateData, collectionId: collection.id });

    expect(response.errors).toBeDefined();
    expect(response.errors?.[0].message).toContain("Ympäristöä koodilla 'invalid_env_code' ei ole olemassa.");
  });

  it("should throw error for invalid learning objectives", async () => {
    const updateData: UpdateCollectionInput = {
      learningObjectiveCodes: ["invalid_lo_1", "invalid_lo_2"],
    };

    const query = graphql(`
      mutation UpdateCollectionInvalidLearningObjectives($data: UpdateCollectionInput!, $collectionId: ID!) {
        updateCollection(data: $data, collectionId: $collectionId) {
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
    const updateData: UpdateCollectionInput = {
      evaluations: [{ id: unrelatedEvaluation.id }],
    };

    const query = graphql(`
      mutation UpdateCollectionEvaluationsNotInCollection($data: UpdateCollectionInput!, $collectionId: ID!) {
        updateCollection(data: $data, collectionId: $collectionId) {
          id
        }
      }
    `);

    const response = await graphqlRequest(query, { data: updateData, collectionId: collection.id });

    expect(response.errors).toBeDefined();
    expect(response.errors?.[0].message).toContain("Osa muokattavista arvioinneista eivät kuulu arviointikokoelmaan");
  });

  it("should throw validation error if attempting to update an evaluation where the student was not present", async () => {
    const updateData: UpdateCollectionInput = {
      evaluations: [{ id: notPresentEvaluation.id, skillsRating: 5 }],
    };

    const query = graphql(`
      mutation UpdateCollectionInvalidStudentPresence($data: UpdateCollectionInput!, $collectionId: ID!) {
        updateCollection(data: $data, collectionId: $collectionId) {
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
});
