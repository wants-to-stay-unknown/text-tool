type SecurityEvent = {
  event: string;
  ip: string;
  path: string;
  method: string;
  detail?: string;
};

export function logSecurityEvent(payload: SecurityEvent) {
  const entry = {
    ...payload,
    timestamp: new Date().toISOString(),
  };
  console.warn(JSON.stringify(entry));
}
