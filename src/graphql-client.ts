import { GraphQLClient } from "graphql-request";

export default new GraphQLClient(process.env.GRAPHQL_API_URL as string, {
  headers: {
    accept: "application/json",
  },
});
