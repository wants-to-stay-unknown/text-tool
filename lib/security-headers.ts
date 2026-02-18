type SecurityHeadersOptions = {
  isDev?: boolean;
};

export function buildSecurityHeaders(
  options: SecurityHeadersOptions = {}
): Record<string, string> {
  const cspDirectives = [
    "default-src 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "object-src 'none'",
    "img-src 'self' data:",
    "font-src 'self'",
    "style-src 'self' 'unsafe-inline'",
    "script-src 'self' 'unsafe-inline'",
    "connect-src 'self'",
    "media-src 'self'",
  ];

  return {
    "Content-Security-Policy": cspDirectives.join("; "),
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "X-DNS-Prefetch-Control": "off",
    "Permissions-Policy":
      "geolocation=(), camera=(), microphone=(), payment=(), usb=()",
    "Cross-Origin-Opener-Policy": "same-origin",
    "Cross-Origin-Resource-Policy": "same-origin",
    ...(options.isDev
      ? {}
      : {
          "Strict-Transport-Security":
            "max-age=63072000; includeSubDomains; preload",
        }),
  };
}
