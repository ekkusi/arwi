import { graphql } from "@/gql";
import prisma from "@/graphql-server/prismaClient";
import { serverRequest } from "@/pages/api/graphql";

describe("ServerRequest - createStudent", () => {
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
    await prisma.student.deleteMany();
    await prisma.group.deleteMany();
  });

  it("should create a student", async () => {
    // Arrange
    const variables = {
      data: {
        name: "Test Student",
      },
      groupId,
    };
    const query = graphql(
      `
        mutation CreateStudent($data: CreateStudentInput!, $groupId: ID!) {
          createStudent(data: $data, groupId: $groupId) {
            id
            name
          }
        }
      `
    );
    // Act
    const result = await serverRequest(
      { document: query, prismaOverride: prisma },
      variables
    );

    // Assert
    expect(result.createStudent).toEqual({
      id: expect.any(String),
      name: variables.data.name,
    });
  });
});
