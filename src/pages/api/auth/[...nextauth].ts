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
          throw new Error("Given user doesn't exist.");
        }

        const isValid = await compare(password, teacher.passwordHash);

        if (!isValid) {
          throw new Error("Incorrect password.");
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
      return true;
    },
    async session({ session, user, token }) {
      return {
        user: {
          email: token.email,
          name: token.name,
          id: token.sub,
        },
        expires: session.expires,
      };
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  debug: true,
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
