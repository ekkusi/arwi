import { graphql } from "@/gql";
import { Rating } from "@/gql/graphql";
import prisma from "@/graphql-server/prismaClient";
import { serverRequest } from "@/pages/api/graphql";
import { assertIsError } from "@/utils/errorUtils";

describe("ServerRequest - updateEvaluations", () => {
  let groupId: string;
  let collectionId: string;
  let studentId: string;
  let evaluationId: string;

  beforeAll(async () => {
    const teacher = await prisma.teacher.create({
      data: {
        email: "testteacher@example.com",
        passwordHash: "hashed-password",
      },
    });

    const group = await prisma.group.create({
      data: {
        name: "Test Group",
        teacherId: teacher.id,
      },
    });

    groupId = group.id;

    const student = await prisma.student.create({
      data: {
        name: "Test Student",
        groupId,
      },
    });

    studentId = student.id;

    const evaluationCollection = await prisma.evaluationCollection.create({
      data: {
        date: new Date(),
        type: "Test Type",
        groupId,
      },
    });

    collectionId = evaluationCollection.id;

    const evaluation = await prisma.evaluation.create({
      data: {
        wasPresent: true,
        studentId,
        evaluationCollectionId: collectionId,
      },
    });

    evaluationId = evaluation.id;
  });

  afterAll(async () => {
    await prisma.teacher.deleteMany();
    await prisma.student.deleteMany();
    await prisma.group.deleteMany();
    await prisma.evaluationCollection.deleteMany();
    await prisma.evaluation.deleteMany();
  });

  it("should update the evaluations", async () => {
    // Arrange
    const variables = {
      data: [
        {
          id: evaluationId,
          skillsRating: Rating.Good,
          behaviourRating: Rating.Fair,
          notes: "Updated notes",
        },
      ],
      collectionId,
    };

    const query = graphql(`
      mutation UpdateEvaluations(
        $data: [UpdateEvaluationInput!]!
        $collectionId: ID!
      ) {
        updateEvaluations(data: $data, collectionId: $collectionId)
      }
    `);

    // Act
    const result = await serverRequest(
      { document: query, prismaOverride: prisma },
      variables
    );

    // Assert
    expect(result.updateEvaluations).toEqual(1);

    const updatedEvaluation = await prisma.evaluation.findUnique({
      where: { id: evaluationId },
    });

    expect(updatedEvaluation).toMatchObject({
      skillsRating: variables.data[0].skillsRating,
      behaviourRating: variables.data[0].behaviourRating,
      notes: variables.data[0].notes,
    });
  });

  it("should return an error when the evaluation doesn't exist", async () => {
    // Arrange
    const variables = {
      data: [
        {
          id: "non-existent-id",
          wasPresent: false,
          skillsRating: Rating.Good,
          behaviourRating: Rating.Fair,
          notes: "Updated notes",
        },
      ],
      collectionId,
    };

    const query = graphql(`
      mutation UpdateEvaluations(
        $data: [UpdateEvaluationInput!]!
        $collectionId: ID!
      ) {
        updateEvaluations(data: $data, collectionId: $collectionId)
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

  it("should return an error when the collection doesn't exist", async () => {
    // Arrange
    const variables = {
      data: [
        {
          id: evaluationId,
          wasPresent: false,
          skillsRating: Rating.Good,
          behaviourRating: Rating.Fair,
          notes: "Updated notes",
        },
      ],
      collectionId: "non-existent-collection-id",
    };

    const query = graphql(`
      mutation UpdateEvaluations(
        $data: [UpdateEvaluationInput!]!
        $collectionId: ID!
      ) {
        updateEvaluations(data: $data, collectionId: $collectionId)
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
