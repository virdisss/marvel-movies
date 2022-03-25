import { getValue, exists } from "../helpers/cache";

/**
 * Loads from redis a response that has been already fetched from the server and cached
 *
 * @returns the value has been cached
 */
export const loadFromCache = async (req, res, next) => {
  const hasKey = await exists(req.url);
  req.keyCache = req.url;
  if (req.method === "GET" && hasKey) {
    const value = await getValue(req.url);
    return res.send(JSON.parse(value));
  }
  next();
};
