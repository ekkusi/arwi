import { graphql } from "@/gql";
import prisma from "@/graphql-server/prismaClient";
import { serverRequest } from "@/pages/api/graphql";

describe("ServerRequest - createGroup", () => {
  let teacherId: string;

  beforeAll(async () => {
    const teacher = await prisma.teacher.create({
      data: {
        email: "testteacher@example.com",
        passwordHash: "hashed-password",
      },
    });
    teacherId = teacher.id;
  });

  afterAll(async () => {
    await prisma.group.deleteMany();
    await prisma.teacher.deleteMany();
  });

  it("should create a group without students", async () => {
    // Arrange
    const variables = {
      data: {
        name: "Test Group",
        teacherId,
      },
    };
    const query = graphql(`
      mutation CreateGroupWithoutStudents($data: CreateGroupInput!) {
        createGroup(data: $data) {
          id
          name
          teacher {
            id
          }
          students {
            id
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
    expect(result.createGroup).toEqual({
      id: expect.any(String),
      name: variables.data.name,
      teacher: {
        id: teacherId,
      },
      students: [],
    });
  });

  it("should create a group with students", async () => {
    // Arrange
    const variables = {
      data: {
        name: "Test Group with Students",
        teacherId,
        students: [
          {
            name: "Student 1",
          },
          {
            name: "Student 2",
          },
        ],
      },
    };
    const query = graphql(`
      mutation CreateGroupWithStudents($data: CreateGroupInput!) {
        createGroup(data: $data) {
          id
          name
          teacher {
            id
          }
          students {
            id
            name
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
    expect(result.createGroup).toEqual({
      id: expect.any(String),
      name: variables.data.name,
      teacher: {
        id: teacherId,
      },
      students: [
        {
          id: expect.any(String),
          name: "Student 1",
        },
        {
          id: expect.any(String),
          name: "Student 2",
        },
      ],
    });
  });
});
