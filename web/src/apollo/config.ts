import { HttpOptions } from "@apollo/client";

export const LINK_CONFIG: HttpOptions = {
  uri: `${process.env.NEXT_PUBLIC_BACKEND_URL}/graphql`,
  credentials: "include",
};
