const ALLOWED_METHODS = new Set(["GET", "HEAD"]);

export function isAllowedMethod(method: string) {
  return ALLOWED_METHODS.has(method.toUpperCase());
}

export function parseContentLength(headerValue: string | null) {
  if (!headerValue) {
    return null;
  }
  const parsed = Number(headerValue);
  if (!Number.isFinite(parsed) || parsed < 0) {
    return null;
  }
  return parsed;
}
