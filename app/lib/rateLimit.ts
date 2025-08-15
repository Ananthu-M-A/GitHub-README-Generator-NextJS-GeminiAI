import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(60, "10 m"), // 60 requests per 10 minutes per key
  analytics: true,
  prefix: "rl:readme",
});