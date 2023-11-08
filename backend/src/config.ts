import { SessionOptions } from "express-session";

const { env } = process;

// Used to enforce minimum app version (force update on frontend). Only update this when there is a breaking change in database/backend that makes the old version unusable.
export const MIN_APP_VERSION = "1.0.9";

const ONE_DAY_MS = 1000 * 60 * 60 * 24;

export const { SESSION_SECRET = "secret", SESSION_NAME = "sid", SESSION_IDLE_TIMEOUT_MS = ONE_DAY_MS * 7 } = env;

export const SESSION_ABSOLUTE_TIMEOUT_MS = +(env.SESSION_ABSOLUTE_TIME || ONE_DAY_MS * 30);

export const SESSION_OPTIONS: SessionOptions = {
  secret: SESSION_SECRET,
  name: SESSION_NAME,
  cookie: {
    maxAge: +SESSION_IDLE_TIMEOUT_MS,
    secure: env.NODE_ENV === "production",
    sameSite: "lax",
  },
  resave: false,
  saveUninitialized: true,
};
