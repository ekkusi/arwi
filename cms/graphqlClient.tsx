import React from "react";
import { LayoutProps } from "sanity";
import { Client, Provider, cacheExchange, fetchExchange } from "urql";

const GRAPHQL_API_URL = process.env.NODE_ENV === "production" ? "https://arwi.api.fi/graphql" : "http://localhost:4000/graphql";

const client = new Client({
  url: GRAPHQL_API_URL,
  exchanges: [cacheExchange, fetchExchange],
});

export default client;

export function LayoutWithGraphQLClient(props: LayoutProps) {
  const { renderDefault } = props;
  return <Provider value={client}>{renderDefault(props)}</Provider>;
}
