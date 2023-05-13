import { graphql } from "@/gql";
import prisma from "@/graphql-server/prismaClient";
import serverRequest from "@/utils/serverRequest";
import { assertIsError } from "@/utils/errorUtils";
import { ClassYearCode } from "@prisma/client";

describe("ServerRequest - deleteCollection", () => {
  let classYearId: string;
  let collectionId: string;

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

    classYearId = classYear.id;

    const collection = await prisma.evaluationCollection.create({
      data: {
        date: new Date(),
        type: "Test Type",
        classYearId,
        environmentCode: "LI_TALVI",
      },
    });

    collectionId = collection.id;
  });

  afterEach(async () => {
    await prisma.teacher.deleteMany();
    await prisma.evaluationCollection.deleteMany();
    await prisma.group.deleteMany();
  });

  it("should delete the collection successfully", async () => {
    // Arrange
    const variables = {
      collectionId,
    };

    const query = graphql(`
      mutation DeleteCollection($collectionId: ID!) {
        deleteCollection(collectionId: $collectionId)
      }
    `);

    // Act
    const result = await serverRequest({ document: query, prismaOverride: prisma }, variables);

    // Assert
    expect(result.deleteCollection).toBe(true);

    const deletedCollection = await prisma.evaluationCollection.findUnique({
      where: { id: collectionId },
    });
    expect(deletedCollection).toBeNull();
  });

  it("should return an error when the collection doesn't exist", async () => {
    // Arrange
    const variables = {
      collectionId: "non-existent-collection-id",
    };

    const query = graphql(`
      mutation DeleteCollection($collectionId: ID!) {
        deleteCollection(collectionId: $collectionId)
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
});
