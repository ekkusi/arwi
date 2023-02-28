/* eslint-disable */
import { graphql } from "@/gql";
import graphqlClient from "@/graphql-client";
import NextAuth, { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { serverRequest } from "../graphql";

const Auth_LoginMutation = graphql(`
  mutation Auth_Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      teacher {
        id
        email
      }
    }
  }
`);

const IS_PROD = process.env.NODE_ENV && process.env.NODE_ENV === "production";

export const authOptions: AuthOptions = {
  useSecureCookies: IS_PROD, // NOTE: Comment this if running in localhost, wont work without https
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

        try {
          const {
            login: { teacher },
          } = await serverRequest(Auth_LoginMutation, {
            email,
            password,
          });

          return teacher;
        } catch (error) {
          throw new Error(String(error));
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user, account, profile, credentials }) {
      return true;
    },
    async session({ session, user, token }) {
      return {
        user: {
          email: token.email,
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
  debug: !IS_PROD,
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
