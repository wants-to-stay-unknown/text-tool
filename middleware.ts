import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { RateLimiter } from "./lib/rate-limit";
import { buildSecurityHeaders } from "./lib/security-headers";
import { logSecurityEvent } from "./lib/security-logger";
import { isAllowedMethod, parseContentLength } from "./lib/request-validation";

const DEFAULT_LIMIT = new RateLimiter({ capacity: 120, refillPerSecond: 2 });
const TTS_LIMIT = new RateLimiter({ capacity: 30, refillPerSecond: 0.5 });

const MAX_BODY_BYTES = 100 * 1024;
const MAX_BODY_TTS_BYTES = 20 * 1024;

const PUBLIC_PATH_PREFIXES = ["/_next", "/favicon.ico", "/robots.txt"];

function getClientIp(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }
  const realIp = request.headers.get("x-real-ip");
  if (realIp) {
    return realIp.trim();
  }
  return "unknown";
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  if (PUBLIC_PATH_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    return NextResponse.next();
  }

  const ip = getClientIp(request);
  const method = request.method.toUpperCase();
  const response = NextResponse.next();

  const securityHeaders = buildSecurityHeaders({
    isDev: process.env.NODE_ENV !== "production",
  });

  const applySecurityHeaders = (res: NextResponse) => {
    Object.entries(securityHeaders).forEach(([key, value]) => {
      res.headers.set(key, value);
    });
    return res;
  };

  if (!isAllowedMethod(method)) {
    logSecurityEvent({
      event: "blocked_method",
      ip,
      path: pathname,
      method,
    });
    const methodResponse = new NextResponse("Method Not Allowed", {
      status: 405,
    });
    Object.entries(rateHeaders).forEach(([key, value]) => {
      methodResponse.headers.set(key, value);
    });
    return applySecurityHeaders(methodResponse);
  }

  const isTextToSpeech = pathname.startsWith("/text-to-speech");
  const limitResult = (isTextToSpeech ? TTS_LIMIT : DEFAULT_LIMIT).check(
    `${ip}:${isTextToSpeech ? "tts" : "default"}`
  );

  const rateHeaders = {
    "X-RateLimit-Limit": String(isTextToSpeech ? 30 : 120),
    "X-RateLimit-Remaining": String(limitResult.remaining),
    "X-RateLimit-Reset": String(Math.ceil(limitResult.resetMs / 1000)),
  };
  Object.entries(rateHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  if (!limitResult.allowed) {
    logSecurityEvent({
      event: "rate_limited",
      ip,
      path: pathname,
      method,
    });
    const limitedResponse = new NextResponse("Too Many Requests", {
      status: 429,
    });
    Object.entries(rateHeaders).forEach(([key, value]) => {
      limitedResponse.headers.set(key, value);
    });
    return applySecurityHeaders(limitedResponse);
  }

  const contentLength = parseContentLength(
    request.headers.get("content-length")
  );
  if (contentLength !== null) {
    const limit = isTextToSpeech ? MAX_BODY_TTS_BYTES : MAX_BODY_BYTES;
    if (contentLength > limit) {
      logSecurityEvent({
        event: "body_too_large",
        ip,
        path: pathname,
        method,
        detail: `size=${contentLength}`,
      });
      const sizeResponse = new NextResponse("Payload Too Large", {
        status: 413,
      });
      Object.entries(rateHeaders).forEach(([key, value]) => {
        sizeResponse.headers.set(key, value);
      });
      return applySecurityHeaders(sizeResponse);
    }
  }

  return applySecurityHeaders(response);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
