import { graphql } from "../gql";
import createServer, { TestGraphQLRequest } from "../createTestServer";
import prisma from "@/prismaClient";
import { TestTeacher, createTestUser, deleteTestUser } from "../testHelpers";

describe("Login", () => {
  let graphqlRequest: TestGraphQLRequest;
  let existingTeacher: TestTeacher;

  beforeAll(async () => {
    ({ graphqlRequest } = await createServer());

    existingTeacher = await createTestUser();
  });

  afterAll(async () => {
    await deleteTestUser();
  });

  it("should login an existing teacher", async () => {
    const loginData = {
      email: existingTeacher.email,
      password: existingTeacher.password,
    };

    const query = graphql(`
      mutation LoginTest_ValidLogin($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          userData {
            email
          }
        }
      }
    `);

    const response = await graphqlRequest(query, loginData);

    expect(response.data?.login.userData.email).toEqual(loginData.email);
  });

  it("should login user with email even in different case", async () => {
    const loginData = {
      email: existingTeacher.email.toUpperCase(),
      password: existingTeacher.password,
    };

    const query = graphql(`
      mutation LoginTest_ValidLoginInDifferentCase($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          userData {
            email
          }
        }
      }
    `);

    const response = await graphqlRequest(query, loginData);

    expect(response.data?.login.userData.email).toEqual(loginData.email.toLowerCase());
  });

  it("should throw an error for invalid login", async () => {
    const loginData = {
      email: existingTeacher.email,
      password: "wrongpassword",
    };

    const query = graphql(`
      mutation LoginTest_InvalidLogin($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          userData {
            email
          }
        }
      }
    `);

    const response = await graphqlRequest(query, loginData);

    expect(response.errors?.[0].message).toEqual(`Annettu sähköposti tai salasana oli virheellinen.`);
  });

  it("should throw an error if the teacher does not have local login enabled", async () => {
    const teacherWithoutEmailLogin = {
      email: "noemaillogin@example.com",
      passwordHash: null,
    };

    await prisma.teacher.create({
      data: teacherWithoutEmailLogin,
    });

    const loginData = {
      email: teacherWithoutEmailLogin.email,
      password: "password",
    };

    const query = graphql(`
      mutation LoginTest_NoEmailLogin($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          userData {
            email
          }
        }
      }
    `);

    const response = await graphqlRequest(query, loginData);

    expect(response.errors?.[0].message).toEqual(`Käyttäjällä ei ole sähköpostikirjautumista käytössä.`);
  });
});
