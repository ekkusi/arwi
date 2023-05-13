import { GraphQLClient } from "graphql-request";

export default new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHQL_API_URL as string, {
  headers: {
    accept: "application/json",
  },
});
