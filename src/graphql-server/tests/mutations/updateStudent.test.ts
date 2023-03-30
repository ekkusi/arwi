import { graphql } from "@/gql";
import prisma from "@/graphql-server/prismaClient";
import { serverRequest } from "@/pages/api/graphql";
import { assertIsError } from "@/utils/errorUtils";

describe("ServerRequest - updateStudent", () => {
  let groupId: string;
  let studentId: string;

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

    const student = await prisma.student.create({
      data: {
        name: "Test Student",
        groupId,
      },
    });

    studentId = student.id;
  });

  afterAll(async () => {
    await prisma.teacher.deleteMany();
    await prisma.student.deleteMany();
    await prisma.group.deleteMany();
  });

  it("should update the student's name", async () => {
    // Arrange
    const variables = {
      data: {
        name: "Updated Student",
      },
      studentId,
    };

    const query = graphql(`
      mutation UpdateStudent($data: UpdateStudentInput!, $studentId: ID!) {
        updateStudent(data: $data, studentId: $studentId) {
          id
          name
        }
      }
    `);

    // Act
    const result = await serverRequest(
      { document: query, prismaOverride: prisma },
      variables
    );

    // Assert
    expect(result.updateStudent).toEqual({
      id: studentId,
      name: variables.data.name,
    });
  });

  it("should return an error when the student doesn't exist", async () => {
    // Arrange
    const variables = {
      data: {
        name: "Updated Student",
      },
      studentId: "non-existent-student-id",
    };

    const query = graphql(`
      mutation UpdateStudent($data: UpdateStudentInput!, $studentId: ID!) {
        updateStudent(data: $data, studentId: $studentId) {
          id
          name
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
      // Assert
      assertIsError(error);
      expect(error.message).toContain("Unexpected error.");
    }
  });
});
