import { serverQueryWithoutErrorHandling } from "@/apollo/server";
import { graphql } from "@/graphql";

const GetIsAuthenticated_GetCurrentUser_Query = graphql(`
  query GetIsAuthenticated_GetCurrentUser {
    getCurrentUser {
      id
    }
  }
`);

export async function getIsAuthenticated() {
  try {
    await serverQueryWithoutErrorHandling({ query: GetIsAuthenticated_GetCurrentUser_Query, fetchPolicy: "no-cache" });
    return true;
  } catch (error) {
    return false;
  }
}
