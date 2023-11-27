import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

const { env } = process;
if (env.NODE_ENV === "production" && !env.REDIS_PASSWORD && !env.REDIS_HOST) {
  console.warn("WARNING: No REDIS_PASSWORD or REDIS_HOST environment variables found. Redis session setup will probably fail.");
}

const redisClient = new Redis({
  password: env.REDIS_PASSWORD,
  host: env.REDIS_HOST,
});

export default redisClient;
