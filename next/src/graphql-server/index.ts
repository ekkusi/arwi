import { readFileSync } from "fs";
import { applyMiddleware } from "graphql-middleware";
import { DateResolver, DateTypeDefinition, EmailAddressResolver, EmailAddressTypeDefinition } from "graphql-scalars";
import { createSchema } from "graphql-yoga";
import path from "path";
import isAuthenticatedMiddleware from "./middleware/authMiddleware";
import resolvers from "./resolvers";
import { CustomContext } from "./types/contextTypes";

// Construct a schema, using GraphQL schema language
const typeDefs = readFileSync(path.resolve(process.cwd(), "./src/graphql-server/schema.graphql"), "utf-8");

const schema = createSchema<CustomContext>({
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

export default schemaWithMiddleware;
