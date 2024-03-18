import Redis from "ioredis";

const { env } = process;

if (env.NODE_ENV === "production" && !env.REDIS_PASSWORD && !env.REDIS_HOST) {
  console.warn("WARNING: No REDIS_PASSWORD or REDIS_HOST environment variables found. Redis session setup will probably fail.");
}

if (env.NODE_ENV === "production" && env.NO_REDIS_SESSION === "true") throw new Error("NO_REDIS_SESSION cannot be true in production");

const redis = new Redis({
  password: env.REDIS_PASSWORD,
  host: env.REDIS_HOST,
  db: env.REDIS_DB_INDEX ? +env.REDIS_DB_INDEX : 0,
  lazyConnect: env.NODE_ENV === "test",
});

export default redis;
