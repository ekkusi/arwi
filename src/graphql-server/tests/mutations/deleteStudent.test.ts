import { graphql } from "@/gql";
import prisma from "@/graphql-server/prismaClient";
import { serverRequest } from "@/pages/api/graphql";
import { assertIsError } from "@/utils/errorUtils";

describe("ServerRequest - deleteStudent", () => {
  let groupId: string;
  let studentId: string;

  beforeEach(async () => {
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
        subjectCode: "LI",
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

  afterEach(async () => {
    await prisma.teacher.deleteMany();
    await prisma.student.deleteMany();
    await prisma.group.deleteMany();
  });

  it("should delete the student successfully", async () => {
    // Arrange
    const variables = {
      studentId,
    };

    const query = graphql(`
      mutation DeleteStudent($studentId: ID!) {
        deleteStudent(studentId: $studentId)
      }
    `);

    // Act
    const result = await serverRequest(
      { document: query, prismaOverride: prisma },
      variables
    );

    // Assert
    expect(result.deleteStudent).toBe(true);

    const deletedStudent = await prisma.student.findUnique({
      where: { id: studentId },
    });
    expect(deletedStudent).toBeNull();
  });

  it("should return an error when the student doesn't exist", async () => {
    // Arrange
    const variables = {
      studentId: "non-existent-student-id",
    };

    const query = graphql(`
      mutation DeleteStudent($studentId: ID!) {
        deleteStudent(studentId: $studentId)
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
