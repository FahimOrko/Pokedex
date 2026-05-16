import { sleep } from "../utils/sleep.js";
import { Cache } from "../pokecache.js";
import { test, expect } from "vitest";

const testCases = [
  {
    key: "https://example.com",
    val: "testdata",
    interval: 500, // 1/2 second
  },
  {
    key: "https://example.com/path",
    val: "moretestdata",
    interval: 1000, // 1 second
  },
];

test.concurrent.each(testCases)(
  "Test Caching $interval ms",
  async ({ key, val, interval }) => {
    const cache = new Cache(interval);

    cache.add(key, val);
    const cached = cache.get(key);
    expect(cached).toBe(val);

    await sleep(interval * 4);
    const reaped = cache.get(key);
    expect(reaped).toBe(undefined);

    cache.stopReapLoop();
  },
);
