import { readFileSync } from "fs";
import {
  DateResolver,
  DateTypeDefinition,
  EmailAddressResolver,
  EmailAddressTypeDefinition,
} from "graphql-scalars";
import { createSchema } from "graphql-yoga";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import resolvers from "./resolvers";

// Construct a schema, using GraphQL schema language
const typeDefs = readFileSync(
  path.resolve(process.cwd(), "./src/graphql-server/schema.graphql"),
  "utf-8"
);

const schema = createSchema<{
  req: NextApiRequest;
  res: NextApiResponse;
}>({
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

export default schema;
