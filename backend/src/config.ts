import { CustomContext } from "./types/contextTypes";

export const ADMIN_USER: WithRequired<CustomContext, "user">["user"] = {
  email: "server-request@email.com",
  id: "SERVER_REQUEST_ID",
};

// Used to enforce minimum app version (force update on frontend). Only update this when there is a breaking change in database/backend that makes the old version unusable.
export const MIN_APP_VERSION = "1.0.9";
