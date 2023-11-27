import { SessionOptions } from "express-session";
import { Redis } from "ioredis";
import RedisStore from "connect-redis";
import { HelmetOptions } from "helmet";

const { env } = process;
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

export const SESSION_ABSOLUTE_TIMEOUT_MS = +(env.SESSION_ABSOLUTE_TIME || ONE_DAY_MS * 30);

if (env.NODE_ENV === "production" && !env.REDIS_PASSWORD && !env.REDIS_HOST) {
  console.warn("WARNING: No REDIS_PASSWORD or REDIS_HOST environment variables found. Redis session setup will probably fail.");
}

let sessionStore;

// Allow disabling redis session storage for testing with env var
if (env.NO_REDIS_SESSION !== "true") {
  const redisClient = new Redis({
    password: env.REDIS_PASSWORD,
    host: env.REDIS_HOST,
  });
  sessionStore = new RedisStore({
    client: redisClient,
  });
}

export const SESSION_OPTIONS: SessionOptions = {
  store: sessionStore,
  secret: SESSION_SECRET,
  name: SESSION_NAME,
  cookie: {
    maxAge: +SESSION_IDLE_TIMEOUT_MS,
    // secure: env.NODE_ENV === "production",
    // NOTE: Currently secure cookies break mobile app authentication as cookies are not being sent when it is set
    // See: https://github.com/facebook/react-native/issues/23185
    // TODO: Figure out how to make secure cookies work with mobile app
    secure: false,
    sameSite: "lax",
  },
  resave: false,
  saveUninitialized: true,
};

export const MATOMO_EVENT_CATEGORIES = {
  OPEN_AI: "OpenAI",
  PASSWORD_RESET: "Password reset",
};
