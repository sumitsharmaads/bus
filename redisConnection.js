import redis from "redis";
import { promisify } from "util";

// Create Redis client with retry strategy
const redisClient = redis.createClient({
  url: process.env.REDIS_CLIENT_URL || "redis://127.0.0.1:6379",
  socket: {
    reconnectStrategy: (attempt) => {
      if (attempt > 10) {
        return new Error("Retrying too many times");
      }
      return Math.min(attempt * 100, 3000);
    },
  },
});

// Promisify Redis client methods
const redisGetAsync = promisify(redisClient.get).bind(redisClient);
const redisSetAsync = promisify(redisClient.set).bind(redisClient);
const redisDelAsync = promisify(redisClient.del).bind(redisClient);

// Event listeners for Redis client to handle errors and connection status
redisClient.on("connect", () => {
  console.log("Connected to Redis");
});

redisClient.on("ready", () => {
  console.log("Redis client is ready to use");
});

redisClient.on("error", (err) => {
  console.error("Redis error:", err);
});

redisClient.on("end", () => {
  console.log("Redis connection closed");
});

redisClient.on("reconnecting", (params) => {
  console.log(`Reconnecting to Redis: attempt ${params.attempt}`);
});

redisClient.on("warning", (warning) => {
  console.warn("Redis warning:", warning);
});

// Keeping the Redis client connection alive
async function connectToRedis() {
  try {
    await redisClient.connect();
  } catch (err) {
    console.error("Failed to connect to Redis:", err);
  }
}

connectToRedis();

export {
  redisClient,
  redisGetAsync,
  redisSetAsync,
  redisDelAsync,
  connectToRedis,
};
