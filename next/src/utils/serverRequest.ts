import { ADMIN_USER } from "@/config";
import prisma from "@/graphql-server/prismaClient";
import { CustomContext } from "@/graphql-server/types/contextTypes";
import { options, ServerContext } from "@/pages/api/graphql";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { PrismaClient } from "@prisma/client";
import { RemoveIndex } from "graphql-request/dist/types";
import { createYoga } from "graphql-yoga";
import { getErrorMessage } from "./errorUtils";

// Yoga for server use only.
// NOTE: PASSES AUTHENTICATION WITH HARD CODED USER
// SHOULD NEVER BE USED AS A PUBLICLY ACCESSIBLE INSTANCE.
const yoga = createYoga<ServerContext, CustomContext>({
  ...options,
  context: {
    prisma,
    user: ADMIN_USER,
  },
});

const { contextFactory, execute, schema: schemaOverride } = yoga.getEnveloped();

type RequestOptions<T, V> = {
  document: TypedDocumentNode<T, V>;
  prismaOverride: PrismaClient;
};

function isDocumentOptions<T, V>(documentOrOptions: TypedDocumentNode<T, V> | RequestOptions<T, V>): documentOrOptions is RequestOptions<T, V> {
  return (documentOrOptions as RequestOptions<T, V>).document !== undefined;
}

// Custom request function to make a Graphql request without HTTP, use in server components
const serverRequest = async <T, V>(
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
  // Should prevent usage in client side code
  if (typeof window !== "undefined") throw new Error("serverRequest cannot be used in client side code.");

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

export default serverRequest;
