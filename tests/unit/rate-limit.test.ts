import { describe, expect, it } from "vitest";

import { RateLimiter } from "../../lib/rate-limit";

describe("RateLimiter", () => {
  it("blocks after capacity is exhausted", () => {
    const limiter = new RateLimiter({ capacity: 2, refillPerSecond: 0 });

    const first = limiter.check("ip", 0);
    const second = limiter.check("ip", 0);
    const third = limiter.check("ip", 0);

    expect(first.allowed).toBe(true);
    expect(second.allowed).toBe(true);
    expect(third.allowed).toBe(false);
  });

  it("refills over time", () => {
    const limiter = new RateLimiter({ capacity: 1, refillPerSecond: 1 });

    const first = limiter.check("ip", 0);
    const second = limiter.check("ip", 0);
    const third = limiter.check("ip", 1000);

    expect(first.allowed).toBe(true);
    expect(second.allowed).toBe(false);
    expect(third.allowed).toBe(true);
  });
});
