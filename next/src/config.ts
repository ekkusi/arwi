import { CustomContext } from "./graphql-server/types/contextTypes";

export const ADMIN_USER: WithRequired<CustomContext, "user">["user"] = {
  email: "server-request@email.com",
  id: "SERVER_REQUEST_ID",
};
