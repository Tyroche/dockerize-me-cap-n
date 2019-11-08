import redis from "redis";
import { promisify } from "util";

type AsyncRedis = redis.RedisClient & {
  getAsync: (key: string) => Promise<string>;
  setAsync: (key: string, value: string) => Promise<boolean>;
};

export function connect(conf?: redis.ClientOpts): AsyncRedis {
  const client = redis.createClient(conf);

  client.getAsync! = promisify(client.get);
  client.setAsync! = promisify(client.set);

  return client as AsyncRedis;
}
