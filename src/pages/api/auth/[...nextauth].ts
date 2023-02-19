/* eslint-disable */
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

export const BRCRYT_SALT_ROUNDS = 12;

export const authOptions: AuthOptions = {
  useSecureCookies:
    process.env.NODE_ENV && process.env.NODE_ENV === "production",
  session: {
    maxAge: 30 * 24 * 60 * 60,
  },
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
            passwordHash: await hash(password, BRCRYT_SALT_ROUNDS),
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

        const { passwordHash, ...returnData } = teacher;

        return returnData;
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async signIn({ user, account, profile, credentials }) {
      console.log("Signin callback, user: ", user);
      return true;
    },
    async session({ session, user, token }) {
      console.log("Session callback, session: ", session);
      // session.user

      return {
        user: {
          email: token.email,
          name: token.name,
          id: token.sub,
        },
        expires: session.expires,
      };
    },
  },
  debug: true,
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
