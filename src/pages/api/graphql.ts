import { createYoga } from "graphql-yoga";
import { NextApiRequest, NextApiResponse } from "next";

// import schema from "@/graphql-server";
import { PrismaClient } from "@prisma/client";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { RemoveIndex } from "graphql-request/dist/types";
import schema from "@/graphql-server";
import { getErrorMessage } from "@/utils/errorUtils";

export const config = {
  api: {
    // Disable body parsing (required for file uploads)
    bodyParser: false,
  },
};

export const prismaClient = new PrismaClient();

const yoga = createYoga<{
  req: NextApiRequest;
  res: NextApiResponse;
}>({
  schema,
  // Needed to be defined explicitly because our endpoint lives at a different path other than `/graphql`
  graphqlEndpoint: "/api/graphql",
  context: () => {
    // console.log("Running graphql context");
    // const requestMapped: Request = req;

    // console.log("Request: ", req);
    // console.log("Response :", res);

    return {
      prisma: prismaClient,
    };
  },
});

const { contextFactory, execute, schema: schemaOverride } = yoga.getEnveloped();

// Custom request function to make a Graphql request without HTTP, use in server components
export const serverRequest = async <T, V>(
  document: TypedDocumentNode<T, V>,
  ...variablesArray: keyof RemoveIndex<V> extends never // Spread from array to make variables optionality based on document type
    ? [variables?: V]
    : [variables: V]
): Promise<T> => {
  const context = await contextFactory();
  const variables = variablesArray[0];

  const result = await execute({
    document,
    variableValues: variables,
    schema: schemaOverride,
    contextValue: context,
  });
  const parsedResult = JSON.parse(JSON.stringify(result));

  if (parsedResult.data) {
    return JSON.parse(JSON.stringify(result.data));
  }
  throw new Error(getErrorMessage(parsedResult));
};

export default yoga;
