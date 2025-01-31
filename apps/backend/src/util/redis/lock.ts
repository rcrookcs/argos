import type { createClient } from "redis";

type RedisClient = ReturnType<typeof createClient>;

const acquireLock = ({
  client,
  name,
  timeout,
  retryDelay,
}: {
  client: RedisClient;
  name: string;
  timeout: number;
  retryDelay: number;
}) => {
  return new Promise<string>((resolve, reject) => {
    function tryAcquire() {
      const rdn = Math.random().toString(36);
      client
        .set(name, rdn, {
          PX: timeout,
          NX: true,
        })
        .then((result) => {
          if (result === "OK") {
            resolve(rdn);
          } else {
            const adjustedTimeout = retryDelay + Math.ceil(Math.random() * 10);
            setTimeout(tryAcquire, adjustedTimeout);
          }
        })
        .catch(reject);
    }

    tryAcquire();
  });
};

export const createRedisLock = (client: RedisClient) => {
  async function acquire<T>(
    name: string,
    task: () => Promise<T>,
    { timeout = 20000, retryDelay = 500 } = {},
  ) {
    const fullName = `lock.${name}`;
    const id = await acquireLock({
      client,
      name: fullName,
      timeout,
      retryDelay,
    });
    let timer: NodeJS.Timeout | null = null;
    const result = (await Promise.race([
      task(),
      new Promise((_resolve, reject) => {
        timer = setTimeout(() => {
          reject(new Error("Lock timeout"));
        }, timeout);
      }),
    ])) as T;
    if (timer) {
      clearTimeout(timer);
    }
    const value = await client.get(fullName);
    if (value === id) {
      await client.del(fullName);
    }
    return result;
  }

  return { acquire };
};
