import { graphql } from "@/gql";
import prisma from "@/graphql-server/prismaClient";
import { serverRequest } from "@/pages/api/graphql";
import { assertIsError } from "@/utils/errorUtils";
import { ClassYearCode } from "@prisma/client";

describe("ServerRequest - deleteGroup", () => {
  let groupId: string;

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
        currentYearCode: ClassYearCode.PRIMARY_FIRST,
        subjectCode: "LI",
      },
    });

    groupId = group.id;
  });

  afterEach(async () => {
    await prisma.teacher.deleteMany();
    await prisma.group.deleteMany();
  });

  it("should delete the group successfully", async () => {
    // Arrange
    const variables = {
      groupId,
    };

    const query = graphql(`
      mutation DeleteGroup($groupId: ID!) {
        deleteGroup(groupId: $groupId)
      }
    `);

    // Act
    const result = await serverRequest(
      { document: query, prismaOverride: prisma },
      variables
    );

    // Assert
    expect(result.deleteGroup).toBe(true);

    const deletedGroup = await prisma.group.findUnique({
      where: { id: groupId },
    });
    expect(deletedGroup).toBeNull();
  });

  it("should return an error when the group doesn't exist", async () => {
    // Arrange
    const variables = {
      groupId: "non-existent-group-id",
    };

    const query = graphql(`
      mutation DeleteGroup($groupId: ID!) {
        deleteGroup(groupId: $groupId)
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
