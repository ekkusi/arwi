import { graphql } from "@/gql";
import ValidationError from "@/graphql-server/errors/ValidationError";
import prisma from "@/graphql-server/prismaClient";
import { ClassYearCode } from "@/graphql-server/types";
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
        subjectCode: "LI",
        yearCode: ClassYearCode.PRIMARY_FIRST,
        students: [],
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
          currentClassYear {
            info {
              code
            }
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
      currentClassYear: {
        info: {
          code: variables.data.yearCode,
        },
      },
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
        subjectCode: "LI",
        yearCode: ClassYearCode.PRIMARY_FIRST,
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

  it("should throw an error when invalid subjectCode is provided", async () => {
    // Arrange
    const invalidSubjectCode = "INVALID_CODE";
    const variables = {
      data: {
        name: "Test Group with Invalid Subject Code",
        teacherId,
        subjectCode: invalidSubjectCode,
        yearCode: ClassYearCode.PRIMARY_FIRST,
        students: [],
      },
    };
    const query = graphql(`
      mutation CreateGroupWithInvalidSubjectCode($data: CreateGroupInput!) {
        createGroup(data: $data) {
          id
        }
      }
    `);

    // Act
    const result = serverRequest(
      { document: query, prismaOverride: prisma },
      variables
    ).catch((e) => e);

    // Assert
    await expect(result).resolves.toThrow(
      new ValidationError(
        `Aihetta koodilla '${invalidSubjectCode}' ei ole olemassa.`
      )
    );
  });
});
