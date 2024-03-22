import { Teacher } from "@prisma/client";
import { graphql } from "@/tests/graphql";
import createServer, { TestGraphQLRequest } from "../createTestServer";
import prisma from "../../prismaClient";
import { MOCK_VALID_CODE, TestGroup, TestTeacher, createTestGroup, createTestUser, testLogin } from "../testHelpers";
import { teacherLoader } from "../../graphql/dataLoaders/teacher";
import { groupsByTeacherLoader } from "../../graphql/dataLoaders/group";

const connectLocalCredentialsQuery = graphql(`
  mutation ConnectLocalCredentials($email: EmailAddress!, $password: String!) {
    connectLocalCredentials(email: $email, password: $password) {
      userData {
        id
        email
        groups {
          id
        }
      }
    }
  }
`);

const mPassIDLoginQuery = graphql(`
  mutation ConnectLocalCredentials_MPassIDLogin($code: String!) {
    mPassIDLogin(code: $code) {
      payload {
        userData {
          id
          isMPassIDConnected
        }
      }
      newUserCreated
    }
  }
`);

describe("connectLocalCredentials", () => {
  let graphqlRequest: TestGraphQLRequest;
  let nonMPassIDUser: TestTeacher;
  let mPassIDUser: Teacher;
  let group: TestGroup;

  beforeAll(async () => {
    ({ graphqlRequest } = await createServer());
  });

  beforeEach(async () => {
    nonMPassIDUser = await createTestUser();
    const response = await graphqlRequest(mPassIDLoginQuery, { code: MOCK_VALID_CODE });

    mPassIDUser = (await prisma.teacher.findUnique({ where: { id: response.data?.mPassIDLogin.payload.userData.id } }))!;
    group = await createTestGroup(nonMPassIDUser.id);
  });

  afterEach(async () => {
    await prisma.teacher.deleteMany();
  });

  it("should successfully connect local credentials for a user without existing local credentials", async () => {
    const response = await graphqlRequest(connectLocalCredentialsQuery, { email: nonMPassIDUser.email, password: nonMPassIDUser.password });

    expect(response.data?.connectLocalCredentials).toBeDefined();
    expect(response.data?.connectLocalCredentials.userData.id).toEqual(mPassIDUser.id);
    expect(response.data?.connectLocalCredentials.userData.email).toEqual(nonMPassIDUser.email);
    expect(response.data?.connectLocalCredentials.userData.groups).toContainEqual({ id: group.id });

    // Check that the local credentials user has been deleted
    const deletedUser = await prisma.teacher.findUnique({ where: { id: nonMPassIDUser.id } });
    expect(deletedUser).toBeNull();
  });

  it("should throw an error if the user already has local credentials", async () => {
    await testLogin(graphqlRequest, nonMPassIDUser);
    const response = await graphqlRequest(connectLocalCredentialsQuery, { email: nonMPassIDUser.email, password: nonMPassIDUser.password });

    expect(response.errors).toBeDefined();
    expect(response.errors?.[0].message).toEqual("Tilisi on jo liitetty lokaaleihin tunnuksiin");
  });

  it("should throw an error if no user is found with the provided email", async () => {
    const nonExistentEmail = "nonexistent@test.com";

    const response = await graphqlRequest(connectLocalCredentialsQuery, { email: nonExistentEmail, password: "dummyPassword" });

    expect(response.errors).toBeDefined();
    expect(response.errors?.[0].message).toEqual(`Käyttäjää ei löytynyt sähköpostilla '${nonExistentEmail}'`);
  });

  it("should throw an error if the user is already linked with mPassID", async () => {
    // Ensure the local credentials user has an mPassID
    await prisma.teacher.update({
      where: { id: nonMPassIDUser.id },
      data: { mPassID: "someMpassID" },
    });

    const response = await graphqlRequest(connectLocalCredentialsQuery, { email: nonMPassIDUser.email, password: nonMPassIDUser.password });

    expect(response.errors).toBeDefined();
    expect(response.errors?.[0].message).toEqual(`Käyttäjä on jo liitetty mpass-id tunnuksiin`);
  });

  it("should throw an error if the provided password is incorrect", async () => {
    // Assuming nonMPassIDUser has local credentials
    const incorrectPassword = "wrongPassword";

    const response = await graphqlRequest(connectLocalCredentialsQuery, { email: nonMPassIDUser.email, password: incorrectPassword });

    expect(response.errors).toBeDefined();
    expect(response.errors?.[0].message).toEqual(`Annettu salasana oli väärä.`);
  });

  it("should clear the DataLoader cache for the user when connected", async () => {
    // Fetch initial state from DataLoaders
    const teacherBeforeUpdate = await teacherLoader.load(nonMPassIDUser.id);
    const groupsBeforeUpdate = await groupsByTeacherLoader.load(nonMPassIDUser.id);
    const mPassIDUserGroups = await groupsByTeacherLoader.load(mPassIDUser.id);
    expect(teacherBeforeUpdate).toBeDefined();
    expect(groupsBeforeUpdate).toContainEqual(expect.objectContaining({ id: group.id }));
    expect(mPassIDUserGroups).toHaveLength(0);

    const response = await graphqlRequest(connectLocalCredentialsQuery, { email: nonMPassIDUser.email, password: nonMPassIDUser.password });

    expect(response.data?.connectLocalCredentials).toBeDefined();

    // Assert DataLoader errors for deleted teacher and its related entities
    await Promise.all([
      expect(teacherLoader.load(nonMPassIDUser.id)).rejects.toThrowError("Hakemaasi resurssia ei löytynyt. Tarkista syöttämäsi id:t."),
      expect(groupsByTeacherLoader.load(nonMPassIDUser.id)).resolves.not.toContainEqual(expect.objectContaining({ id: group.id })),
      expect(groupsByTeacherLoader.load(mPassIDUser.id)).resolves.toContainEqual(expect.objectContaining({ id: group.id })),
    ]);
  });
});
