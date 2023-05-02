import { graphql } from "@/gql";
import prisma from "@/graphql-server/prismaClient";
import { Rating } from "@/graphql-server/types";
import { serverRequest } from "@/pages/api/graphql";
import { assertIsError } from "@/utils/errorUtils";
import { ClassYearCode } from "@prisma/client";

describe("ServerRequest - updateCollection", () => {
  let groupId: string;
  let classYearId: string;
  let collectionId: string;
  let studentId: string;
  let evaluationId: string;

  beforeEach(async () => {
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
        subjectCode: "LI",
        currentYearCode: ClassYearCode.PRIMARY_FIRST,
      },
    });

    const classYear = await prisma.classYear.create({
      data: {
        code: ClassYearCode.PRIMARY_FIRST,
        groupId: group.id,
      },
    });

    groupId = group.id;
    classYearId = classYear.id;

    const student = await prisma.student.create({
      data: {
        name: "Test Student",
        groupId,
      },
    });

    studentId = student.id;

    const collection = await prisma.evaluationCollection.create({
      data: {
        date: new Date(),
        type: "Test Type",
        classYearId,
        environmentCode: "LI_TALVI",
      },
    });

    collectionId = collection.id;

    const evaluation = await prisma.evaluation.create({
      data: {
        wasPresent: true,
        skillsRating: Rating.GOOD,
        studentId,
        evaluationCollectionId: collectionId,
      },
    });

    evaluationId = evaluation.id;
  });

  afterEach(async () => {
    await prisma.teacher.deleteMany();
    await prisma.evaluation.deleteMany();
    await prisma.evaluationCollection.deleteMany();
    await prisma.student.deleteMany();
    await prisma.group.deleteMany();
  });

  it("should update the collection's environment, date and learning codes", async () => {
    // Arrange
    const variables = {
      data: {
        environmentCode: "LI_PALLO",
        date: "2023-04-01",
        learningObjectiveCodes: ["T1", "T2"],
      },
      collectionId,
    };

    const query = graphql(`
      mutation UpdateCollectionTest_UpdateCollectionDefault(
        $data: UpdateCollectionInput!
        $collectionId: ID!
      ) {
        updateCollection(data: $data, collectionId: $collectionId) {
          id
          environment {
            code
          }
          date
          learningObjectives {
            code
          }
        }
      }
    `);

    // Act
    const result = await serverRequest(
      { document: query, prismaOverride: prisma },
      variables
    );

    // Assert
    expect(result.updateCollection).toEqual({
      id: collectionId,
      environment: {
        code: variables.data.environmentCode,
      },
      date: variables.data.date,
      learningObjectives: [
        {
          code: variables.data.learningObjectiveCodes[0],
        },
        {
          code: variables.data.learningObjectiveCodes[1],
        },
      ],
    });
  });

  it("should update the evaluation's skillsRating and behaviourRating", async () => {
    // Arrange
    const variables = {
      data: {
        evaluations: [
          {
            id: evaluationId,
            wasPresent: true,
            skillsRating: Rating.EXCELLENT,
            behaviourRating: Rating.EXCELLENT,
          },
        ],
      },
      collectionId,
    };

    const query = graphql(`
      mutation UpdateCollectionTest_UpdateCollectionEvaluation(
        $data: UpdateCollectionInput!
        $collectionId: ID!
      ) {
        updateCollection(data: $data, collectionId: $collectionId) {
          id
          evaluations {
            id
            skillsRating
            behaviourRating
          }
        }
      }
    `);

    // Act
    const result = await serverRequest(
      { document: query, prismaOverride: prisma },
      variables
    );

    // Assert
    expect(result.updateCollection).toEqual({
      id: collectionId,
      evaluations: [
        {
          id: evaluationId,
          skillsRating: Rating.EXCELLENT,
          behaviourRating: Rating.EXCELLENT,
        },
      ],
    });
  });

  it("should return an error when the collection doesn't exist", async () => {
    // Arrange
    const variables = {
      data: {
        date: "2023-04-01",
      },
      collectionId: "non-existent-collection-id",
    };

    const query = graphql(`
      mutation UpdateCollectionTest_UpdateCollectionError(
        $data: UpdateCollectionInput!
        $collectionId: ID!
      ) {
        updateCollection(data: $data, collectionId: $collectionId) {
          id
          date
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

  it("should return an error when the environmentCode is invalid", async () => {
    // Arrange
    const variables = {
      data: {
        date: "2023-04-01",
        environmentCode: "INVALID_ENVIRONMENT_CODE",
      },
      collectionId,
    };

    const query = graphql(`
      mutation UpdateCollectionTest_UpdateCollectionInvalidEnvironmentCode(
        $data: UpdateCollectionInput!
        $collectionId: ID!
      ) {
        updateCollection(data: $data, collectionId: $collectionId) {
          id
          date
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
      expect(error.message).toContain(
        "Ympäristöä koodilla 'INVALID_ENVIRONMENT_CODE' ei ole olemassa."
      );
    }
  });

  it("should return an error when the learningObjectiveCodes are invalid", async () => {
    // Arrange
    const variables = {
      data: {
        date: "2023-04-01",
        environmentCode: "LI_TALVI",
        learningObjectiveCodes: ["INVALID_LEARNING_OBJECTIVE_CODE"],
      },
      collectionId,
    };

    const query = graphql(`
      mutation UpdateCollectionTest_UpdateCollectionInvalidLearningObjectiveCodes(
        $data: UpdateCollectionInput!
        $collectionId: ID!
      ) {
        updateCollection(data: $data, collectionId: $collectionId) {
          id
          date
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
      expect(error.message).toContain(
        `Osa oppimistavoitteista ei ole olemassa tai ei ole arvioitavia.`
      );
    }
  });
});
