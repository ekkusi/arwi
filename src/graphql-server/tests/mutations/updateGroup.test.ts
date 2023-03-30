import { graphql } from "@/gql";
import prisma from "@/graphql-server/prismaClient";
import { serverRequest } from "@/pages/api/graphql";
import { assertIsError } from "@/utils/errorUtils";

describe("ServerRequest - updateGroup", () => {
  let groupId: string;

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
  });

  afterAll(async () => {
    await prisma.teacher.deleteMany();
    await prisma.group.deleteMany();
  });

  it("should update the group's name", async () => {
    // Arrange
    const variables = {
      data: {
        name: "Updated Group",
      },
      groupId,
    };

    const query = graphql(`
      mutation UpdateGroup($data: UpdateGroupInput!, $groupId: ID!) {
        updateGroup(data: $data, groupId: $groupId) {
          id
          name
        }
      }
    `);

    // Act
    const result = await serverRequest(
      { document: query, prismaOverride: prisma },
      variables
    );

    // Assert
    expect(result.updateGroup).toEqual({
      id: groupId,
      name: variables.data.name,
    });
  });

  it("should return an error when the group doesn't exist", async () => {
    // Arrange
    const variables = {
      data: {
        name: "Updated Group",
      },
      groupId: "non-existent-group-id",
    };

    const query = graphql(`
      mutation UpdateGroup($data: UpdateGroupInput!, $groupId: ID!) {
        updateGroup(data: $data, groupId: $groupId) {
          id
          name
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
