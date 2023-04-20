import { graphql } from "@/gql";
import prisma from "@/graphql-server/prismaClient";
import { ClassYearCode } from "@/graphql-server/types";
import { serverRequest } from "@/pages/api/graphql";
import { assertIsError } from "@/utils/errorUtils";
import { ClassYearCode as PrismaClassYearCode } from "@prisma/client";

describe("ServerRequest - changeGroupYear", () => {
  let groupId: string;

  beforeAll(async () => {
    // Create test data for the changeGroupYear
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

    await prisma.evaluationCollection.create({
      data: {
        type: "Test Collection",
        classYearId: classYear.id,
        environmentCode: "LI_TALVI",
      },
    });
  });

  afterAll(async () => {
    // Clean up test data
    await prisma.classYear.deleteMany();
    await prisma.group.deleteMany();
    await prisma.teacher.deleteMany();
  });

  it("should change the current year of the group", async () => {
    // Arrange
    const variables = {
      groupId,
      newYearCode: ClassYearCode.PRIMARY_SECOND,
    };

    const query = graphql(`
      mutation ChangeGroupYearTest_ChangeGroupYear(
        $groupId: ID!
        $newYearCode: ClassYearCode!
      ) {
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
    const result = await serverRequest(
      { document: query, prismaOverride: prisma },
      variables
    );

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
      mutation ChangeGroupYearTest_ChangeGroupYearError(
        $groupId: ID!
        $newYearCode: ClassYearCode!
      ) {
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
  it("should change evaluationCollections inside the currentClassYear when the classYear is changed", async () => {
    // Arrange
    const variables = {
      groupId,
      newYearCode: ClassYearCode.PRIMARY_SECOND,
    };

    const query = graphql(`
      mutation ChangeGroupYearTest_ChangeGroupYearEvaluationCollections(
        $groupId: ID!
        $newYearCode: ClassYearCode!
      ) {
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
    const result = await serverRequest(
      { document: query, prismaOverride: prisma },
      variables
    );

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
});
