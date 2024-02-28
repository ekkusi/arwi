import { initGraphQLTada } from "gql.tada";
import type { introspection } from "./types/graphql-env";

export const graphql = initGraphQLTada<{
  introspection: introspection;

  scalars: {
    DateTime: string;
    Date: string;
    EmailAddress: string;
    ID: string;
  };
}>();

export type { FragmentOf, ResultOf, VariablesOf } from "gql.tada";
export { readFragment } from "gql.tada";
