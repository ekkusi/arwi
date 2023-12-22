import supertest from "supertest";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { DocumentNode, FormattedExecutionResult, print } from "graphql";
import createApp from "../app";

export type TestGraphQLRequest = <TData = any, TVariables = any>(
  query: DocumentNode | TypedDocumentNode<TData, TVariables>,
  variables?: TVariables
) => Promise<FormattedExecutionResult<TData>>;

const createServer = async () => {
  const request = supertest.agent(await createApp());

  const graphqlRequest: TestGraphQLRequest = async <TData = any, TVariables = any>(
    query: DocumentNode | TypedDocumentNode<TData, TVariables>,
    variables?: TVariables
  ) => {
    const queryStr = print(query);

    const res = await request.post("/graphql").send({ query: queryStr, variables });
    return res.body as FormattedExecutionResult<TData>;
  };

  return { graphqlRequest, request };
};

export default createServer;
