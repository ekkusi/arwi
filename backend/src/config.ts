import { SessionOptions } from "express-session";
import RedisStore from "connect-redis";
import { HelmetOptions } from "helmet";
import Redis from "ioredis";

const { env } = process;

const APP_ENV = env.APP_ENV || "development";

export const MINIMUM_SUPPORTED_APP_VERSION = "1.1.5";

export const ALLOWED_ORIGINS_DEV = ["http://localhost:3000"];

export const ALLOWED_ORIGINS_STAGING = [...ALLOWED_ORIGINS_DEV, "https://staging-website.arwi.fi"];

export const ALLOWED_ORIGINS_PROD = ["https://arwi.fi"];

export const getAllowedOrigins = () => {
  switch (APP_ENV) {
    case "production":
      return ALLOWED_ORIGINS_PROD;
    case "staging":
      return ALLOWED_ORIGINS_STAGING;
    default:
      return ALLOWED_ORIGINS_DEV;
  }
};

export const BRCRYPT_SALT_ROUNDS = 12;

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

export const SESSION_ID_HEADER_NAME = "x-session-id";

export const SESSION_TYPE_HEADER_NAME = "x-session-type";

export const API_TOKEN_HEADER_NAME = "x-api-token";

export const SESSION_ABSOLUTE_TIMEOUT_MS = +(env.SESSION_ABSOLUTE_TIME || ONE_DAY_MS * 30);

if (env.NODE_ENV === "production" && !env.REDIS_PASSWORD && !env.REDIS_HOST) {
  console.warn("WARNING: No REDIS_PASSWORD or REDIS_HOST environment variables found. Redis session setup will probably fail.");
}

if (env.NODE_ENV === "production" && env.NO_REDIS_SESSION === "true") throw new Error("NO_REDIS_SESSION cannot be true in production");

const sessionClient =
  env.NO_REDIS_SESSION !== "true"
    ? new Redis({
        password: env.REDIS_PASSWORD,
        host: env.REDIS_HOST,
        db: env.REDIS_DB_INDEX ? +env.REDIS_DB_INDEX : 0,
      })
    : undefined;

const getCookieSameSite = () => {
  switch (APP_ENV) {
    case "production":
      return "lax";
    case "staging":
      return "none";
    default:
      return "lax";
  }
};

const PROD_DOMAIN = env.PROD_DOMAIN || "arwi.fi";
export const COOKIE_DOMAIN = APP_ENV === "staging" ? `.${PROD_DOMAIN}` : undefined;

export const SESSION_OPTIONS: SessionOptions = {
  // Allow disabling redis session storage for testing with env var
  store: sessionClient ? new RedisStore({ client: sessionClient }) : undefined,
  secret: SESSION_SECRET,
  name: SESSION_NAME,
  headerName: SESSION_ID_HEADER_NAME,
  typeHeaderName: SESSION_TYPE_HEADER_NAME,
  cookie: {
    maxAge: +SESSION_IDLE_TIMEOUT_MS,
    secure: env.NODE_ENV === "production",
    domain: COOKIE_DOMAIN,
    sameSite: getCookieSameSite(),
  },
  resave: false,
  saveUninitialized: true,
};

export const MATOMO_EVENT_CATEGORIES = {
  OPEN_AI: "Backend: OpenAI",
  PASSWORD_RESET: "Backend: Password reset",
};
