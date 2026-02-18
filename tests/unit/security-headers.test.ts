import { describe, expect, it } from "vitest";

import { buildSecurityHeaders } from "../../lib/security-headers";

describe("buildSecurityHeaders", () => {
  it("returns required headers", () => {
    const headers = buildSecurityHeaders({ isDev: false });

    const required = [
      "Content-Security-Policy",
      "Strict-Transport-Security",
      "X-Content-Type-Options",
      "Referrer-Policy",
      "Permissions-Policy",
      "X-Frame-Options",
    ];

    required.forEach((key) => {
      expect(headers[key]).toBeTruthy();
    });

    expect(headers["Content-Security-Policy"]).toMatch(/frame-ancestors 'none'/);
  });
});
