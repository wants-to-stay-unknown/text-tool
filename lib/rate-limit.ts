export type RateLimitConfig = {
  capacity: number;
  refillPerSecond: number;
};

export type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  resetMs: number;
};

type BucketState = {
  tokens: number;
  lastRefill: number;
};

export class RateLimiter {
  private readonly config: RateLimitConfig;
  private readonly buckets = new Map<string, BucketState>();

  constructor(config: RateLimitConfig) {
    this.config = config;
  }

  check(key: string, now = Date.now()): RateLimitResult {
    const bucket = this.buckets.get(key) ?? {
      tokens: this.config.capacity,
      lastRefill: now,
    };

    const elapsedSeconds = Math.max(0, (now - bucket.lastRefill) / 1000);
    const refill = elapsedSeconds * this.config.refillPerSecond;
    const nextTokens = Math.min(this.config.capacity, bucket.tokens + refill);

    bucket.tokens = nextTokens;
    bucket.lastRefill = now;

    let allowed = false;
    if (bucket.tokens >= 1) {
      allowed = true;
      bucket.tokens -= 1;
    }

    this.buckets.set(key, bucket);

    const missingTokens = Math.max(0, 1 - bucket.tokens);
    const resetMs =
      missingTokens === 0
        ? 0
        : Math.ceil((missingTokens / this.config.refillPerSecond) * 1000);

    return {
      allowed,
      remaining: Math.floor(bucket.tokens),
      resetMs,
    };
  }
}
