import redis from "redis";
import { promisify } from "util";

type AsyncRedis = redis.RedisClient & {
  getAsync: (key: string) => Promise<string>;
  setAsync: (key: string, value: string) => Promise<void>;
};

export function connect(conf?: redis.ClientOpts): AsyncRedis {
  const client = redis.createClient(conf) as AsyncRedis;

  client.getAsync = promisify(client.get);
  client.setAsync = promisify(client.set);

  return client as AsyncRedis;
}
