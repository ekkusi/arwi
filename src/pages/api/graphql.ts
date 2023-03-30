import { createYoga } from "graphql-yoga";
import { NextApiRequest, NextApiResponse } from "next";

import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { RemoveIndex } from "graphql-request/dist/types";
import schema from "@/graphql-server";
import { getErrorMessage } from "@/utils/errorUtils";
import prisma from "@/graphql-server/prismaClient";
import { PrismaClient } from "@prisma/client";

export const config = {
  api: {
    // Disable body parsing (required for file uploads)
    bodyParser: false,
  },
};

const yoga = createYoga<{
  req: NextApiRequest;
  res: NextApiResponse;
}>({
  schema,
  // Needed to be defined explicitly because our endpoint lives at a different path other than `/graphql`
  graphqlEndpoint: "/api/graphql",
  context: ({ req, res }) => {
    return {
      prisma,
      req,
      res,
    };
  },
  logging: "debug",
});

const { contextFactory, execute, schema: schemaOverride } = yoga.getEnveloped();

type RequestOptions<T, V> = {
  document: TypedDocumentNode<T, V>;
  prismaOverride: PrismaClient;
};

function isDocumentOptions<T, V>(
  documentOrOptions: TypedDocumentNode<T, V> | RequestOptions<T, V>
): documentOrOptions is RequestOptions<T, V> {
  return (documentOrOptions as RequestOptions<T, V>).document !== undefined;
}

// Custom request function to make a Graphql request without HTTP, use in server components
export const serverRequest = async <T, V>(
  documentOrOptions:
    | TypedDocumentNode<T, V>
    | {
        document: TypedDocumentNode<T, V>;
        prismaOverride: PrismaClient;
      },
  ...variablesArray: keyof RemoveIndex<V> extends never // Spread from array to make variables optionality based on document type
    ? [variables?: V]
    : [variables: V]
): Promise<T> => {
  const variables = variablesArray[0];

  let document;
  let context;
  if (isDocumentOptions(documentOrOptions)) {
    document = documentOrOptions.document;
    context = await contextFactory({
      prisma: documentOrOptions.prismaOverride,
    });
  } else {
    document = documentOrOptions;
    context = await contextFactory();
  }

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
