import { track as vercelTrack } from "@vercel/analytics";

export type AnalyticsMeta = Record<string, string | number | boolean | null | undefined>;

type TtsAction = "play" | "pause" | "end" | "error";

const GA_ID =
  process.env.NEXT_PUBLIC_GA_ID ?? process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

let analyticsInitialized = false;
let errorHandlersBound = false;

const inputDebounceTimers = new Map<string, number>();

const ALWAYS_SEND_EVENTS = new Set([
  "tool_run",
  "tool_success",
  "tool_error",
  "copy",
  "paste",
  "clear",
  "tts",
  "page_view",
  "select_content",
]);

function isBrowser() {
  return typeof window !== "undefined";
}

function isDntEnabled() {
  if (!isBrowser()) {
    return false;
  }
  const dnt = window.navigator?.doNotTrack;
  return dnt === "1" || dnt === "yes";
}

function safeRandomId() {
  if (isBrowser() && window.crypto?.randomUUID) {
    return window.crypto.randomUUID();
  }
  return `id_${Math.random().toString(36).slice(2)}_${Date.now()}`;
}

function getOrCreateId(storage: Storage | undefined, key: string) {
  if (!storage) {
    return safeRandomId();
  }
  try {
    const existing = storage.getItem(key);
    if (existing) {
      return existing;
    }
    const next = safeRandomId();
    storage.setItem(key, next);
    return next;
  } catch (error) {
    return safeRandomId();
  }
}

export function getVisitorId() {
  return isBrowser() ? getOrCreateId(window.localStorage, "tt_visitor_id") : "";
}

export function getSessionId() {
  return isBrowser()
    ? getOrCreateId(window.sessionStorage, "tt_session_id")
    : "";
}

export function initAnalytics() {
  if (!isBrowser() || analyticsInitialized || isDntEnabled()) {
    return;
  }

  analyticsInitialized = true;
  getVisitorId();
  getSessionId();

  if (!errorHandlersBound) {
    errorHandlersBound = true;
    window.addEventListener("error", (event) => {
      trackEvent("client_error", {
        error_type: "error",
        error_name: event.error?.name ?? "unknown",
      });
    });

    window.addEventListener("unhandledrejection", (event) => {
      const reason = event.reason as { name?: string } | undefined;
      trackEvent("client_error", {
        error_type: "unhandledrejection",
        error_name: reason?.name ?? "unknown",
      });
    });
  }
}

function baseParams(meta?: AnalyticsMeta) {
  return {
    session_id: getSessionId(),
    visitor_id: getVisitorId(),
    ...meta,
  };
}

function sendToGa(event: string, params: AnalyticsMeta) {
  if (!isBrowser() || !GA_ID || isDntEnabled()) {
    return;
  }
  const gtag = (window as typeof window & { gtag?: (...args: unknown[]) => void })
    .gtag;
  if (typeof gtag !== "function") {
    return;
  }
  gtag("event", event, params);
}

function sendToVercel(event: string, params: AnalyticsMeta) {
  if (!isBrowser() || isDntEnabled()) {
    return;
  }
  try {
    vercelTrack(event, params);
  } catch (error) {
    // Ignore Vercel analytics errors.
  }
}

export function trackEvent(event: string, meta?: AnalyticsMeta) {
  if (!isBrowser() || isDntEnabled()) {
    return;
  }
  const params = baseParams(meta);
  sendToGa(event, params);
  sendToVercel(event, params);
}

export function trackPageView(url: string, meta?: AnalyticsMeta) {
  if (!isBrowser() || isDntEnabled()) {
    return;
  }
  const params = baseParams({
    page_location: url,
    page_path: url.replace(window.location.origin, ""),
    page_title: document.title,
    ...meta,
  });
  sendToGa("page_view", params);
  sendToVercel("page_view", params);
}

export function trackToolRun(
  toolName: string,
  inputMeta: AnalyticsMeta,
  optionsMeta?: AnalyticsMeta,
) {
  trackEvent("tool_run", {
    tool_name: toolName,
    ...inputMeta,
    ...optionsMeta,
  });
}

export function trackToolSuccess(toolName: string, outputMeta: AnalyticsMeta) {
  trackEvent("tool_success", {
    tool_name: toolName,
    ...outputMeta,
  });
}

export function trackToolUsed(
  toolName: string,
  action: string,
  meta?: AnalyticsMeta,
) {
  trackEvent("tool_used", {
    tool_name: toolName,
    action,
    ...meta,
  });
}

export function trackToolError(toolName: string, errorMeta: AnalyticsMeta) {
  trackEvent("tool_error", {
    tool_name: toolName,
    ...errorMeta,
  });
}

export function trackCopy(toolName: string, outputMeta?: AnalyticsMeta) {
  trackEvent("copy", {
    tool_name: toolName,
    ...outputMeta,
  });
}

export function trackPaste(toolName: string, inputMeta?: AnalyticsMeta) {
  trackEvent("paste", {
    tool_name: toolName,
    ...inputMeta,
  });
}

export function trackClear(toolName: string) {
  trackEvent("clear", {
    tool_name: toolName,
  });
}

export function trackOutboundLink(url: string, context?: string) {
  trackEvent("outbound_click", {
    url,
    context,
  });
}

export function trackTTS(action: TtsAction, meta?: AnalyticsMeta) {
  trackEvent("tts", {
    action,
    ...meta,
  });
}

export function trackToolSelect(
  toolName: string,
  context: string,
  meta?: AnalyticsMeta,
) {
  trackEvent("select_content", {
    content_type: "tool",
    item_id: toolName,
    context,
    ...meta,
  });
}

export function trackUseCaseView(slug: string, category: string) {
  trackEvent("use_case_view", {
    slug,
    category,
  });
}

export function trackInputChange(
  toolName: string,
  inputMeta: AnalyticsMeta,
  sampleRate = 0.15,
) {
  if (ALWAYS_SEND_EVENTS.has("input_change")) {
    trackEvent("input_change", { tool_name: toolName, ...inputMeta });
    return;
  }

  if (Math.random() > sampleRate) {
    return;
  }

  const key = `input:${toolName}`;
  const existing = inputDebounceTimers.get(key);
  if (existing) {
    window.clearTimeout(existing);
  }
  const timer = window.setTimeout(() => {
    inputDebounceTimers.delete(key);
    trackEvent("input_change", { tool_name: toolName, ...inputMeta });
  }, 800);
  inputDebounceTimers.set(key, timer);
}

export function getTextMeta(text: string) {
  const trimmed = text.trim();
  const characters = text.length;
  const words = trimmed ? trimmed.split(/\s+/).length : 0;
  const lines = text ? text.split(/\r\n|\r|\n/).length : 0;

  return {
    char_count: characters,
    word_count: words,
    line_count: lines,
    char_bucket: bucketValue(characters),
    word_bucket: bucketValue(words),
    line_bucket: bucketValue(lines),
  };
}

function bucketValue(value: number) {
  if (value === 0) return "0";
  if (value <= 50) return "1-50";
  if (value <= 200) return "51-200";
  if (value <= 1000) return "201-1000";
  if (value <= 5000) return "1001-5000";
  return "5001+";
}
