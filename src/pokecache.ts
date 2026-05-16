export type CacheEntry<T> = {
  createdAt: number;
  val: T;
};

export class Cache {
  #cache = new Map<string, CacheEntry<any>>();
  #reapIntervalId: NodeJS.Timeout | undefined = undefined;
  #interval: number;

  constructor(interval: number) {
    this.#interval = interval;
    this.#startReapLoop();
  }

  add<T>(key: string, value: T): void {
    this.#cache.set(key, { createdAt: Date.now(), val: value });
  }

  get<T>(key: string): T | undefined {
    return this.#cache.get(key)?.val;
  }

  #reap(): void {
    const now = Date.now();
    for (const [key, entry] of this.#cache.entries()) {
      if (now - entry.createdAt > this.#interval) {
        this.#cache.delete(key);
      }
    }
  }

  #startReapLoop(): void {
    const intervalId = setInterval(() => {
      this.#reap();
    }, this.#interval);
    this.#reapIntervalId = intervalId;
  }

  stopReapLoop(): void {
    clearInterval(this.#reapIntervalId!);
    this.#reapIntervalId = undefined;
  }
}
