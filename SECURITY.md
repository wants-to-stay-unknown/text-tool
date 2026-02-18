# Security

## Overview
Text Tool is a public, client-heavy utility site. User input is treated as hostile,
processed in memory only, and never stored or logged.

## Protections Implemented
- Strict security headers via middleware (CSP, HSTS, no-sniff, frame deny, etc.).
- Per-IP rate limiting with stricter limits for `/text-to-speech`.
- Request body size limits (global 100KB, TTS 20KB).
- Client-side input length limits (100k chars, TTS 5k chars).
- Automatic timeout for text-to-speech playback.
- No unsafe HTML rendering (no `dangerouslySetInnerHTML`).
- Structured security event logging (no user text logged).
- Lockfile enforcement and basic secret scanning config.

## Reporting
If you discover a vulnerability, please email security@texttool.example
with a detailed report and steps to reproduce.

## Manual Verification
Run these from a terminal while the app is running:

```bash
# Check headers
curl -I http://localhost:3000/word-counter

# Rate limiting (adjust host as needed)
for i in {1..150}; do curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/word-counter; done

# Body size limit (413 expected)
curl -X POST http://localhost:3000/word-counter -H "Content-Length: 200000"
```
