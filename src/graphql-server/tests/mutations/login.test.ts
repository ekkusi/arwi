import { graphql } from "@/gql";
import { assertIsError } from "@/utils/errorUtils";
import prisma from "@/graphql-server/prismaClient";
import { serverRequest } from "@/pages/api/graphql";
import { hash } from "bcryptjs";

describe("ServerRequest - login", () => {
  const existingTeacher = {
    email: "login@example.com",
    passwordHash: "",
  };

  beforeAll(async () => {
    existingTeacher.passwordHash = await hash("testpassword", 10);
    await prisma.teacher.create({
      data: existingTeacher,
    });
  });

  afterAll(async () => {
    await prisma.teacher.deleteMany();
  });

  it("should log in a teacher with correct email and password", async () => {
    // Arrange
    const variables = {
      email: existingTeacher.email,
      password: "testpassword",
    };
    const query = graphql(`
      mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          teacher {
            id
            email
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
    expect(result.login.teacher).toEqual({
      id: expect.any(String),
      email: existingTeacher.email,
    });
  });

  it("should throw an error with the specified message if email is not found", async () => {
    // Arrange
    const variables = {
      email: "nonexistent@example.com",
      password: "testpassword",
    };
    const query = graphql(`
      mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          teacher {
            id
            email
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
      assertIsError(error);
      // Assert
      expect(error.message).toEqual(
        `Käyttäjää ei löytynyt sähköpostilla '${variables.email}'`
      );
    }
  });

  it("should throw an error with the specified message if password is incorrect", async () => {
    // Arrange
    const variables = {
      email: existingTeacher.email,
      password: "wrongpassword",
    };
    const query = graphql(`
      mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          teacher {
            id
            email
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
      assertIsError(error);
      // Assert
      expect(error.message).toEqual("Annettu salasana oli väärä.");
    }
  });
});
