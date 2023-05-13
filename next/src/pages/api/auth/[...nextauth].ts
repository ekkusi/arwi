import ValidationError from "@/graphql-server/errors/ValidationError";
import prisma from "@/graphql-server/prismaClient";
import { compare } from "bcryptjs";
import NextAuth, { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

const IS_PROD = process.env.NODE_ENV && process.env.NODE_ENV === "production";
const isHttps = (process.env.IS_HTTPS && process.env.IS_HTTPS === "true") || false;

export const authOptions: AuthOptions = {
  useSecureCookies: isHttps,
  session: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
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

        const matchingTeacher = await prisma.teacher.findFirst({
          where: { email },
        });
        if (!matchingTeacher) throw new ValidationError(`Käyttäjää ei löytynyt sähköpostilla '${email}'`);
        const isValidPassword = await compare(password, matchingTeacher.passwordHash);
        if (!isValidPassword) throw new ValidationError(`Annettu salasana oli väärä.`);
        return {
          email: matchingTeacher.email,
          id: matchingTeacher.id,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn() {
      return true;
    },
    async session({ session, token }) {
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
      if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  debug: !IS_PROD,
  secret: process.env.SECRET,
};

export default NextAuth(authOptions);
