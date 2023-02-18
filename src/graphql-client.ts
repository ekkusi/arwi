import { GraphQLClient } from "graphql-request";

export default new GraphQLClient(
  process.env.NEXT_PUBLIC_GRAFBASE_API_URL as string,
  {
    headers: {
      accept: "application/json",
      "x-api-key": process.env.NEXT_PUBLIC_GRAFBASE_API_KEY as string,
    },
  }
);
