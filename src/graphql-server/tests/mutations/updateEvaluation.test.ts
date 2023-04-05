import { graphql } from "@/gql";
import prisma from "@/graphql-server/prismaClient";
import { Rating } from "@/graphql-server/types";
import { serverRequest } from "@/pages/api/graphql";
import { assertIsError } from "@/utils/errorUtils";

describe("ServerRequest - updateEvaluation", () => {
  let evaluationId: string;

  beforeAll(async () => {
    // Create test data for the evaluation update
    const teacher = await prisma.teacher.create({
      data: {
        email: "testteacher@example.com",
        passwordHash: "hashed-password",
      },
    });

    const group = await prisma.group.create({
      data: { name: "Test Group", teacherId: teacher.id },
    });

    const student = await prisma.student.create({
      data: { name: "Test Student", groupId: group.id },
    });

    const collection = await prisma.evaluationCollection.create({
      data: { type: "Test Collection", groupId: group.id },
    });

    const evaluation = await prisma.evaluation.create({
      data: {
        studentId: student.id,
        evaluationCollectionId: collection.id,
        wasPresent: true,
        skillsRating: "GOOD",
        behaviourRating: "GOOD",
      },
    });

    evaluationId = evaluation.id;
  });

  afterAll(async () => {
    // Clean up test data
    await prisma.evaluation.deleteMany();
    await prisma.evaluationCollection.deleteMany();
    await prisma.student.deleteMany();
    await prisma.group.deleteMany();
    await prisma.teacher.deleteMany();
  });

  it("should update the evaluation's data", async () => {
    // Arrange
    const variables = {
      data: {
        id: evaluationId,
        wasPresent: true,
        skillsRating: Rating.Great,
        behaviourRating: Rating.Great,
        notes: "Test notes",
      },
    };

    const query = graphql(`
      mutation UpdateEvaluationTest_UpdateEvaluationDefault(
        $data: UpdateEvaluationInput!
      ) {
        updateEvaluation(data: $data) {
          id
          wasPresent
          skillsRating
          behaviourRating
          notes
        }
      }
    `);

    // Act
    const result = await serverRequest(
      { document: query, prismaOverride: prisma },
      variables
    );

    // Assert
    expect(result.updateEvaluation).toEqual({
      id: evaluationId,
      wasPresent: true,
      skillsRating: Rating.Great,
      behaviourRating: Rating.Great,
      notes: "Test notes",
    });
  });

  it("should nullify skillsRating and behaviourRating when wasPresent is updated to false", async () => {
    // Arrange
    const variables = {
      data: {
        id: evaluationId,
        wasPresent: false,
        skillsRating: Rating.Great,
        behaviourRating: Rating.Great,
      },
    };

    const query = graphql(`
      mutation UpdateEvaluationTest_UpdateEvaluationNullify(
        $data: UpdateEvaluationInput!
      ) {
        updateEvaluation(data: $data) {
          id
          wasPresent
          skillsRating
          behaviourRating
        }
      }
    `);

    // Act
    const result = await serverRequest(
      { document: query, prismaOverride: prisma },
      variables
    );

    // Assert
    expect(result.updateEvaluation).toEqual({
      id: evaluationId,
      wasPresent: false,
      skillsRating: null,
      behaviourRating: null,
    });
  });

  it("should return an error when the evaluation doesn't exist", async () => {
    // Arrange
    const variables = {
      data: {
        id: "non-existent-evaluation-id",
        wasPresent: false,
        skillsRating: Rating.Great,
        behaviourRating: Rating.Great,
      },
    };

    const query = graphql(`
      mutation UpdateEvaluationTest_UpdateEvaluationError(
        $data: UpdateEvaluationInput!
      ) {
        updateEvaluation(data: $data) {
          id
          wasPresent
          skillsRating
          behaviourRating
        }
      }
    `);

    // Act
    try {
      await serverRequest(
        { document: query, prismaOverride: prisma },
        variables
      );
    } catch (error) {
      // Assert
      assertIsError(error);
      expect(error.message).toContain("Unexpected error.");
    }
  });
});
