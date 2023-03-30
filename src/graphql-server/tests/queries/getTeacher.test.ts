import { graphql } from "@/gql";
import prisma from "@/graphql-server/prismaClient";
import { serverRequest } from "@/pages/api/graphql";
import { assertIsError } from "@/utils/errorUtils";

describe("ServerRequest - getTeacher", () => {
  afterEach(async () => {
    await prisma.teacher.deleteMany();
  });

  it("should return a teacher by ID", async () => {
    // Arrange
    const teacher = await prisma.teacher.create({
      data: {
        email: "test@example.com",
        passwordHash: "hashedpassword",
      },
    });

    const variables = { id: teacher.id };
    const query = graphql(`
      query GetTeacher($id: ID!) {
        getTeacher(id: $id) {
          id
          email
        }
      }
    `);

    // Act
    const result = await serverRequest(query, variables);

    // Assert
    expect(result.getTeacher).toEqual({
      id: teacher.id,
      email: "test@example.com",
    });
  });

  it("should throw an error if teacher not found", async () => {
    const variables = { id: "non-existent-id" };
    const query = graphql(`
      query GetTeacher($id: ID!) {
        getTeacher(id: $id) {
          id
          email
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
      assertIsError(error);
      // Assert
      expect(error.message).toEqual(
        `Opettajaa ei löytynyt id:llä '${variables.id}'`
      );
    }
  });
});
