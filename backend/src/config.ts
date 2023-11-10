import { SessionOptions } from "express-session";
import { Redis } from "ioredis";
import RedisStore from "connect-redis";
import { HelmetOptions } from "helmet";

const { env } = process;

// Used to enforce minimum app version (force update on frontend). Only update this when there is a breaking change in database/backend that makes the old version unusable.
export const MIN_APP_VERSION = "1.1.0";

export const HELMET_OPTIONS: HelmetOptions = {
  contentSecurityPolicy:
    env.NODE_ENV !== "production"
      ? {
          directives: {
            imgSrc: [`'self'`, "data:", "apollo-server-landing-page.cdn.apollographql.com"],
            scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
            manifestSrc: [`'self'`, "apollo-server-landing-page.cdn.apollographql.com"],
            frameSrc: [`'self'`, "sandbox.embed.apollographql.com"],
          },
        }
      : undefined,
};

const ONE_DAY_MS = 1000 * 60 * 60 * 24;

export const { SESSION_SECRET = "secret", SESSION_NAME = "sid", SESSION_IDLE_TIMEOUT_MS = ONE_DAY_MS * 7 } = env;

export const SESSION_ABSOLUTE_TIMEOUT_MS = +(env.SESSION_ABSOLUTE_TIME || ONE_DAY_MS * 30);

if (env.NODE_ENV === "production" && !env.REDIS_PASSWORD) {
  console.warn("WARNING: REDIS_PASSWORD env var is not set. Redis storage will probably fail to connect or is not secure.");
}

const redisClient = new Redis({
  password: env.REDIS_PASSWORD,
});

const redisStore = new RedisStore({
  client: redisClient,
});

export const SESSION_OPTIONS: SessionOptions = {
  store: env.NO_REDIS_SESSION === "true" ? undefined : redisStore, // Allow disabling redis session storage for testing
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
