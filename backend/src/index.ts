import { readFileSync } from "fs";
import { DateResolver, DateTypeDefinition, EmailAddressResolver, EmailAddressTypeDefinition } from "graphql-scalars";
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
import resolvers from "./resolvers";
import isAuthenticatedMiddleware from "./middleware/authMiddleware";
import { parseAndVerifyToken } from "./utils/jwt";
import prisma from "./prismaClient";

dotenv.config();

const PORT = process.env.PORT || 4000;

// Construct a schema, using GraphQL schema language
const typeDefs = readFileSync(path.resolve(process.cwd(), "./src/schema.graphql"), "utf-8");

const schema = makeExecutableSchema({
  typeDefs: `
    ${DateTypeDefinition}
    ${EmailAddressTypeDefinition}
    ${typeDefs}
  `,
  resolvers: {
    Date: DateResolver,
    EmailAddress: EmailAddressResolver,
    ...resolvers,
  },
});

const schemaWithMiddleware = applyMiddleware(schema, isAuthenticatedMiddleware);

const server = new ApolloServer({
  schema: schemaWithMiddleware,
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

  app.listen(PORT, () => {
    console.info("Test log for seeing if app is running");

    console.info(`Server listening on port ${PORT}. GraphQL API at /graphql.`);
  });
});
