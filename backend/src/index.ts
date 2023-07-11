import { readFileSync } from "fs";
import {
  DateResolver,
  DateTimeResolver,
  DateTimeTypeDefinition,
  DateTypeDefinition,
  EmailAddressResolver,
  EmailAddressTypeDefinition,
} from "graphql-scalars";
import { ApolloServer } from "@apollo/server";
import cors from "cors";
import { json } from "body-parser";
import cookieParser from "cookie-parser";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import path from "path";
import { applyMiddleware } from "graphql-middleware";
import dotenv from "dotenv";
import { assertIsError } from "./utils/errorUtils";
import resolvers from "./resolvers";
import isAuthenticatedMiddleware from "./middleware/authMiddleware";
import { createRefreshAndAccessTokens, parseAndVerifyToken, REFRESH_TOKEN_KEY } from "./utils/jwt";
import prisma from "./prismaClient";
import ValidationError from "./errors/ValidationError";

dotenv.config();

const PORT = process.env.PORT || 4000;

// Construct a schema, using GraphQL schema language
const typeDefs = readFileSync(path.resolve(process.cwd(), "./src/schema.graphql"), "utf-8");

const schema = makeExecutableSchema({
  typeDefs: `
    ${DateTypeDefinition}
    ${DateTimeTypeDefinition}
    ${EmailAddressTypeDefinition}
    ${typeDefs}
  `,
  resolvers: {
    Date: DateResolver,
    DateTime: DateTimeResolver,
    EmailAddress: EmailAddressResolver,
    ...resolvers,
  },
});

const schemaWithMiddleware = applyMiddleware(schema, isAuthenticatedMiddleware);

const server = new ApolloServer({
  schema: schemaWithMiddleware,
  introspection: process.env.NODE_ENV !== "production",
});

const app = express();

app.use(cookieParser());

server.start().then(() => {
  app.use(
    "/graphql",
    cors({
      credentials: true,
    }),
    json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => {
        const authHeader = req.headers.authorization || "";
        const user = parseAndVerifyToken(authHeader);
        return {
          prisma,
          user,
          req,
          res,
        };
      },
    })
  );

  app.get("/", (_, res) => {
    res.send("Hello World!");
  });

  app.post("/refresh-token", (req, res) => {
    try {
      const refreshToken = req.cookies[REFRESH_TOKEN_KEY];
      if (!refreshToken) throw new ValidationError("No refresh token found");
      const user = parseAndVerifyToken(refreshToken, "refresh");
      if (!user) throw new ValidationError("Token is invalid");
      const token = createRefreshAndAccessTokens(user, res);
      return res.status(200).send({
        accessToken: token,
      });
    } catch (error) {
      assertIsError(error);
      return res.status(500).send({
        error: error.message,
      });
    }
  });

  app.listen(PORT, () => {
    console.info("Test log for seeing if app is running");

    console.info(`Server listening on port ${PORT}. GraphQL API at /graphql.`);
  });
});
