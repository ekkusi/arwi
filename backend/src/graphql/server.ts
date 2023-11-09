import { makeExecutableSchema } from "@graphql-tools/schema";
import { readFileSync } from "fs";
import {
  DateResolver,
  DateTimeResolver,
  DateTimeTypeDefinition,
  DateTypeDefinition,
  EmailAddressResolver,
  EmailAddressTypeDefinition,
} from "graphql-scalars";
import { applyMiddleware } from "graphql-middleware";
import { ApolloServer } from "@apollo/server";
import path from "path";
import resolvers from "./resolvers";
import isAuthenticatedMiddleware from "./middleware/authMiddleware";

// Construct a schema, using GraphQL schema language
const typeDefs = readFileSync(path.resolve(__dirname, "./schema.graphql"), "utf-8");

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

export default server;
