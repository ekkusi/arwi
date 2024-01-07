import { hash } from "bcryptjs";
import { BRCRYPT_SALT_ROUNDS } from "../../config";
import { graphql } from "../gql";
import { RegisterTest_RegisterMutationVariables } from "../gql/graphql";
import createServer, { TestGraphQLRequest } from "../createTestServer";
import { TestTeacher, createTestUser } from "../testHelpers";
import prisma from "../../prismaClient";

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

  it("should register a new teacher", async () => {
    const password = "password";
    const passwordHash = await hash(password, BRCRYPT_SALT_ROUNDS);
    const teacherData: RegisterTest_RegisterMutationVariables = {
      data: {
        email: "test@example.com",
        password: passwordHash,
      },
    };

    const query = graphql(`
      mutation RegisterTest_Register($data: CreateTeacherInput!) {
        register(data: $data) {
          userData {
            email
          }
        }
      }
    `);

    const response = await graphqlRequest(query, teacherData);

    expect(response.data?.register.userData.email).toEqual(teacherData.data.email);
  });

  it("should throw an error if email is already in use", async () => {
    const passwordHash = await hash("password", BRCRYPT_SALT_ROUNDS);
    const userData = {
      data: {
        email: existingTeacher.email,
        password: passwordHash,
      },
    };

    const query = graphql(`
      mutation RegisterTest_RegisterExistingEmail($data: CreateTeacherInput!) {
        register(data: $data) {
          userData {
            email
          }
        }
      }
    `);

    const response = await graphqlRequest(query, userData);

    expect(response.errors?.[0].message).toEqual(`Sähköposti '${userData.data.email}' on jo käytössä`);
  });

  it("should throw an error if language preference is invalid", async () => {
    const password = "password";
    const passwordHash = await hash(password, BRCRYPT_SALT_ROUNDS);
    const userData = {
      data: {
        email: "test@example.com",
        password: passwordHash,
        languagePreference: "invalid_language",
      },
    };

    const query = graphql(`
      mutation RegisterTest_RegisterInvalidLanguage($data: CreateTeacherInput!) {
        register(data: $data) {
          userData {
            email
          }
        }
      }
    `);

    const response = await graphqlRequest(query, userData);

    expect(response.errors?.[0].message).toEqual(`Kielikoodi '${userData.data.languagePreference}' ei ole sallittu`);
  });
});
