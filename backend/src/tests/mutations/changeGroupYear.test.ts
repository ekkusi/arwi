import { graphql } from "@/gql";
import prisma from "@/graphql-server/prismaClient";
import { ClassYearCode } from "@/graphql-server/types";
import serverRequest from "@/utils/serverRequest";
import { assertIsError } from "@/utils/errorUtils";
import { ClassYearCode as PrismaClassYearCode } from "@prisma/client";

describe("ServerRequest - changeGroupYear", () => {
  let groupId: string;
  let classYearId: string;
  let teacherId: string;

  beforeAll(async () => {
    // Create test data for the changeGroupYear
    const teacher = await prisma.teacher.create({
      data: {
        email: "testteacher@example.com",
        passwordHash: "hashed-password",
      },
    });
    teacherId = teacher.id;
  });

  beforeEach(async () => {
    const group = await prisma.group.create({
      data: {
        name: "Test Group",
        teacherId,
        subjectCode: "LI",
        currentYearCode: PrismaClassYearCode.PRIMARY_FIRST,
      },
    });

    groupId = group.id;

    const classYear = await prisma.classYear.create({
      data: {
        code: PrismaClassYearCode.PRIMARY_FIRST,
        groupId: group.id,
      },
    });

    classYearId = classYear.id;
  });

  afterAll(async () => {
    // Clean up test data
    await prisma.teacher.deleteMany();
  });

  afterEach(async () => {
    await prisma.classYear.deleteMany();
    await prisma.group.deleteMany();
  });

  it("should change the current year of the group", async () => {
    // Arrange
    const variables = {
      groupId,
      newYearCode: ClassYearCode.PRIMARY_SECOND,
    };

    const query = graphql(`
      mutation ChangeGroupYearTest_ChangeGroupYear($groupId: ID!, $newYearCode: ClassYearCode!) {
        changeGroupYear(groupId: $groupId, newYearCode: $newYearCode) {
          id
          currentClassYear {
            info {
              code
            }
          }
        }
      }
    `);

    // Act
    const result = await serverRequest({ document: query, prismaOverride: prisma }, variables);

    // Assert
    expect(result.changeGroupYear).toEqual({
      id: groupId,
      currentClassYear: {
        info: {
          code: ClassYearCode.PRIMARY_SECOND,
        },
      },
    });
  });

  it("should return an error when the group doesn't exist", async () => {
    // Arrange
    const variables = {
      groupId: "non-existent-group-id",
      newYearCode: ClassYearCode.PRIMARY_SECOND,
    };

    const query = graphql(`
      mutation ChangeGroupYearTest_ChangeGroupYearError($groupId: ID!, $newYearCode: ClassYearCode!) {
        changeGroupYear(groupId: $groupId, newYearCode: $newYearCode) {
          id
          currentClassYear {
            info {
              code
            }
          }
        }
      }
    `);

    // Act
    try {
      await serverRequest({ document: query, prismaOverride: prisma }, variables);
    } catch (error) {
      // Assert
      assertIsError(error);
      expect(error.message).toContain("Unexpected error.");
    }
  });
  it("should keep evaluationCollections inside the previousYear when the classYear is changed", async () => {
    // Arrange
    const variables = {
      groupId,
      newYearCode: ClassYearCode.PRIMARY_SECOND,
    };
    await prisma.evaluationCollection.create({
      data: {
        type: "Test Collection",
        classYearId,
        environmentCode: "LI_TALVI",
      },
    });

    const query = graphql(`
      mutation ChangeGroupYearTest_ChangeGroupYearEvaluationCollections($groupId: ID!, $newYearCode: ClassYearCode!) {
        changeGroupYear(groupId: $groupId, newYearCode: $newYearCode) {
          id
          currentClassYear {
            info {
              code
            }
            evaluationCollections {
              id
            }
          }
        }
      }
    `);

    // Act
    const result = await serverRequest({ document: query, prismaOverride: prisma }, variables);

    // Assert
    expect(result.changeGroupYear).toEqual({
      id: groupId,
      currentClassYear: {
        info: {
          code: ClassYearCode.PRIMARY_SECOND,
        },
        evaluationCollections: [],
      },
    });

    // Check the evaluationCollections of the previous class year
    const previousClassYear = await prisma.classYear.findFirstOrThrow({
      where: { groupId, code: ClassYearCode.PRIMARY_FIRST },
      include: { evaluationCollections: true },
    });

    expect(previousClassYear.evaluationCollections).toHaveLength(1);
  });

  it("should transfer evaluationCollections from the previous classYear to the new classYear when transferEvaluations is set to true", async () => {
    // Create an evaluationCollection for the first class year
    const evaluationCollection = await prisma.evaluationCollection.create({
      data: {
        type: "Test Collection",
        classYearId,
        environmentCode: "LI_TALVI",
      },
    });

    // Arrange
    const variables = {
      groupId,
      newYearCode: ClassYearCode.PRIMARY_SECOND,
      transferEvaluations: true,
    };

    const query = graphql(`
      mutation ChangeGroupYearTest_ChangeGroupYearTransferEvaluations($groupId: ID!, $newYearCode: ClassYearCode!, $transferEvaluations: Boolean) {
        changeGroupYear(groupId: $groupId, newYearCode: $newYearCode, transferEvaluations: $transferEvaluations) {
          id
          currentClassYear {
            info {
              code
            }
            evaluationCollections {
              id
            }
          }
        }
      }
    `);

    // Act
    const result = await serverRequest({ document: query, prismaOverride: prisma }, variables);

    // Assert
    expect(result.changeGroupYear).toEqual({
      id: groupId,
      currentClassYear: {
        info: {
          code: ClassYearCode.PRIMARY_SECOND,
        },
        evaluationCollections: [
          {
            id: evaluationCollection.id,
          },
        ],
      },
    });

    // Check the evaluationCollections of the previous class year
    const previousClassYear = await prisma.classYear.findFirstOrThrow({
      where: { groupId, code: ClassYearCode.PRIMARY_FIRST },
      include: { evaluationCollections: true },
    });

    expect(previousClassYear.evaluationCollections).toEqual([]);
  });
});
