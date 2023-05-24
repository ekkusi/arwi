import { CustomContext } from "./types/contextTypes";

export const ADMIN_USER: WithRequired<CustomContext, "user">["user"] = {
  email: "server-request@email.com",
  id: "SERVER_REQUEST_ID",
};

export const FALLBACK_SECRET = "some-secret"; // ONLY USE IN DEV!
