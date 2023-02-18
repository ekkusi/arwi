import { graphql } from "@/gql";
import graphqlClient from "@/graphql-client";
import { compare, hash } from "bcrypt";
import NextAuth, { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

const GetTeacher = graphql(`
  query GetTeacher($email: Email!) {
    teacher(by: { email: $email }) {
      id
      email
      name
      passwordHash
    }
  }
`);

const CreateTeacher = graphql(`
  mutation CreateTeacher(
    $name: String!
    $email: Email!
    $passwordHash: String!
  ) {
    teacherCreate(
      input: { name: $name, email: $email, passwordHash: $passwordHash }
    ) {
      teacher {
        id
        email
        name
        passwordHash
      }
    }
  }
`);

export const authOptions: AuthOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "test@email.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const { teacher } = await graphqlClient.request(GetTeacher, {
          email,
        });

        if (!teacher) {
          const name = "Masa Matittaja";
          const { teacherCreate } = await graphqlClient.request(CreateTeacher, {
            email,
            name,
            passwordHash: await hash(password, 12),
          });

          if (!teacherCreate?.teacher) {
            throw new Error("Something wrong in creating teacher. Try again.");
          }

          return {
            id: teacherCreate.teacher.id,
            email,
            name,
          };
        }

        const isValid = await compare(password, teacher.passwordHash);

        if (!isValid) {
          throw new Error("Wrong credentials. Try again.");
        }

        return teacher;
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
};

export default NextAuth(authOptions);
