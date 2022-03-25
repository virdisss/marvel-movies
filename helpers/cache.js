import redis from "redis";
import util from "util";

const client = redis.createClient(process.env.REDIS_URL);
client.get = util.promisify(client.get);
client.exists = util.promisify(client.exists);

export const setValue = (key, value) => {
  client.set(key, JSON.stringify(value));
  client.expire(key, 60 * 60 * 24);
};

export const getValue = (key) => {
  return client.get(key);
};

export const exists = (key) => {
  try {
    return client.exists(key);
  } catch (error) {
    return false;
  }
};
