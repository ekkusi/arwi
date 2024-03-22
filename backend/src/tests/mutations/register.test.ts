import { graphql } from "../graphql";
import createServer, { TestGraphQLRequest } from "../createTestServer";
import { TestTeacher, createTestUser } from "../testHelpers";
import prisma from "../../prismaClient";

const query = graphql(`
  mutation RegisterTest_Register($data: CreateTeacherInput!) {
    register(data: $data) {
      userData {
        email
        verifiedEmails
      }
    }
  }
`);

describe("Register", () => {
  let graphqlRequest: TestGraphQLRequest;
  let existingTeacher: TestTeacher;

  beforeAll(async () => {
    ({ graphqlRequest } = await createServer());
  });

  beforeEach(async () => {
    existingTeacher = await createTestUser();
  });

  afterEach(async () => {
    await prisma.teacher.deleteMany();
  });

  it("should register a new teacher correctly", async () => {
    const password = "password";
    const teacherData = {
      data: {
        email: "test@example.com",
        password,
      },
    };

    const response = await graphqlRequest(query, teacherData);

    expect(response.data?.register.userData.email).toEqual(teacherData.data.email);
    expect(response.data?.register.userData.verifiedEmails).toEqual([teacherData.data.email]);
  });

  it("should throw an error if email is already in use", async () => {
    const userData = {
      data: {
        email: existingTeacher.email,
        password: "password",
      },
    };

    const response = await graphqlRequest(query, userData);

    expect(response.errors?.[0].message).toEqual(`Sähköposti '${userData.data.email}' on jo käytössä`);
  });

  it("should register email in lowercase", async () => {
    const userData = {
      data: {
        email: "Test-user@email.com",
        password: "password",
      },
    };

    const response = await graphqlRequest(query, userData);

    expect(response.data?.register.userData.email).toEqual(userData.data.email.toLowerCase());
  });

  it("should throw an error if language preference is invalid", async () => {
    const password = "password";
    const userData = {
      data: {
        email: "test@example.com",
        password,
        languagePreference: "invalid_language",
      },
    };

    const response = await graphqlRequest(query, userData);

    expect(response.errors?.[0].message).toEqual(`Kielikoodi '${userData.data.languagePreference}' ei ole sallittu`);
  });
});
