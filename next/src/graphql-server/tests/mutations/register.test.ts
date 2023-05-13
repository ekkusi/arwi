import { graphql } from "@/gql";
import { assertIsError } from "@/utils/errorUtils";
import prisma from "@/graphql-server/prismaClient";
import serverRequest from "@/utils/serverRequest";

describe("ServerRequest - register", () => {
  afterEach(async () => {
    await prisma.teacher.deleteMany();
  });

  it("should register a new teacher", async () => {
    // Arrange
    const variables = {
      data: {
        email: "register@example.com",
        password: "testpassword",
      },
    };
    const query = graphql(`
      mutation Register($data: CreateTeacherInput!) {
        register(data: $data) {
          id
          email
        }
      }
    `);

    // Act
    const result = await serverRequest(
      { document: query, prismaOverride: prisma },
      variables
    );

    // Assert
    const savedTeacher = await prisma.teacher.findFirst({
      where: { email: "register@example.com" },
    });
    expect(savedTeacher).toBeTruthy();
    expect(result.register).toEqual({
      id: savedTeacher?.id,
      email: "register@example.com",
    });
  });

  it("should throw an error with the specified message if email already exists", async () => {
    // Arrange
    await prisma.teacher.create({
      data: {
        email: "existing@example.com",
        passwordHash: "hashedpassword",
      },
    });

    const variables = {
      data: {
        email: "existing@example.com",
        password: "testpassword",
      },
    };
    const query = graphql(`
      mutation Register($data: CreateTeacherInput!) {
        register(data: $data) {
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
        `Sähköposti '${variables.data.email}' on jo käytössä`
      );
    }
  });
});
