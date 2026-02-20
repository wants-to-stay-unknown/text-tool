"use client";

import {
  type MutableRefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import Link from "next/link";

import AnalyticsEvent from "../../components/AnalyticsEvent";
import Button from "../../components/Button";
import TextArea from "../../components/TextArea";
import ToolLayout from "../../components/ToolLayout";
import TrackedLink from "../../components/TrackedLink";
import {
  getTextMeta,
  trackClear,
  trackCopy,
  trackInputChange,
  trackPaste,
  trackToolRun,
  trackToolSuccess,
  trackToolError,
  trackTTS,
} from "../../lib/analytics";
import { getUseCasesByToolRoute, USE_CASE_BY_SLUG } from "../../lib/use-cases";
import {
  POST_ACTION_SUGGESTIONS,
  RELATED_TOOLS_BY_TOOL,
  TOOL_BY_ROUTE,
  TOOL_TIPS,
  TRY_NEXT_BY_TOOL,
} from "../../lib/tools";
import { sanitizeText } from "../../lib/text-safety";

const MAX_INPUT_CHARS = 5_000;
const MAX_SPEAK_DURATION_MS = 120_000;
const TOOL_URL = "https://text-tool.live/text-to-speech";

const TOOL_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Text to Speech",
  url: TOOL_URL,
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Web",
  description:
    "Convert text into spoken audio using browser speech synthesis with voice and speed controls.",
};

const FAQ_ITEMS = [
  {
    question: "Which browsers are supported?",
    answer:
      "Chrome and Edge provide the most reliable support for the Web Speech API.",
  },
  {
    question: "Can I control the reading speed?",
    answer:
      "Yes. Use the rate slider to speed up or slow down the voice.",
  },
  {
    question: "Does this work offline?",
    answer:
      "Some voices require network access. Availability depends on your browser.",
  },
  {
    question: "Is my text sent to a server?",
    answer:
      "No. The text stays in your browser and is not stored on our servers.",
  },
];

const FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

type SpeechStatus = "idle" | "speaking" | "paused";

function isSpeechSupported() {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

function mapStatus(speaking: boolean, paused: boolean): SpeechStatus {
  if (speaking) {
    return paused ? "paused" : "speaking";
  }
  return "idle";
}

export default function TextToSpeechPage() {
  const [text, setText] = useState("");
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voiceUri, setVoiceUri] = useState("");
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [volume, setVolume] = useState(1);
  const [status, setStatus] = useState<SpeechStatus>("idle");
  const [hasUsed, setHasUsed] = useState(false);
  const [inputCopyLabel, setInputCopyLabel] = useState("Copy");
  const speakTimeoutRef = useRef<number | null>(null);
  const copyTimeoutRef = useRef<number | null>(null);
  const hasTrackedRef = useRef(false);

  const speechSupported = useMemo(() => isSpeechSupported(), []);

  useEffect(() => {
    if (!speechSupported) {
      return;
    }

    const synth = window.speechSynthesis;
    const updateVoices = () => {
      const loadedVoices = synth.getVoices();
      setVoices(loadedVoices);
      if (!voiceUri && loadedVoices.length > 0) {
        setVoiceUri(loadedVoices[0].voiceURI);
      }
    };

    updateVoices();
    synth.addEventListener("voiceschanged", updateVoices);

    return () => {
      if (speakTimeoutRef.current) {
        window.clearTimeout(speakTimeoutRef.current);
      }
      if (copyTimeoutRef.current) {
        window.clearTimeout(copyTimeoutRef.current);
      }
      synth.removeEventListener("voiceschanged", updateVoices);
      synth.cancel();
    };
  }, [speechSupported, voiceUri]);

  useEffect(() => {
    if (!speechSupported) {
      return;
    }

    const synth = window.speechSynthesis;
    const interval = window.setInterval(() => {
      setStatus(mapStatus(synth.speaking, synth.paused));
    }, 250);

    return () => {
      window.clearInterval(interval);
    };
  }, [speechSupported]);

  const selectedVoice = voices.find((voice) => voice.voiceURI === voiceUri);

  const clearSpeakTimeout = () => {
    if (speakTimeoutRef.current) {
      window.clearTimeout(speakTimeoutRef.current);
      speakTimeoutRef.current = null;
    }
  };

  const handleSpeak = () => {
    if (!speechSupported || !text.trim()) {
      if (!speechSupported) {
        trackToolError("text-to-speech", { error_type: "unsupported" });
      }
      return;
    }

    if (!hasTrackedRef.current) {
      hasTrackedRef.current = true;
      setHasUsed(true);
    }

    const inputMeta = getTextMeta(text);
    trackToolRun("text-to-speech", inputMeta, {
      voice: selectedVoice?.name ?? "unknown",
      rate,
      pitch,
      volume,
    });
    trackToolSuccess("text-to-speech", {
      ...inputMeta,
      action: "play",
    });
    trackTTS("play", {
      tool_name: "text-to-speech",
      voice: selectedVoice?.name ?? "unknown",
      rate,
      pitch,
      volume,
    });

    const synth = window.speechSynthesis;
    synth.cancel();
    clearSpeakTimeout();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = selectedVoice ?? null;
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = volume;
    utterance.onend = () => {
      clearSpeakTimeout();
      setStatus("idle");
      trackTTS("end", { tool_name: "text-to-speech" });
    };
    utterance.onerror = () => {
      clearSpeakTimeout();
      setStatus("idle");
      trackTTS("error", { tool_name: "text-to-speech" });
      trackToolError("text-to-speech", { error_type: "tts_error" });
    };

    synth.speak(utterance);
    setStatus("speaking");

    speakTimeoutRef.current = window.setTimeout(() => {
      synth.cancel();
      setStatus("idle");
    }, MAX_SPEAK_DURATION_MS);
  };

  const handlePause = () => {
    if (!speechSupported) {
      return;
    }
    window.speechSynthesis.pause();
    setStatus("paused");
    trackTTS("pause", { tool_name: "text-to-speech" });
  };

  const handleResume = () => {
    if (!speechSupported) {
      return;
    }
    window.speechSynthesis.resume();
    setStatus("speaking");
    trackTTS("play", { tool_name: "text-to-speech", resume: true });
  };

  const handleStop = () => {
    if (!speechSupported) {
      return;
    }
    clearSpeakTimeout();
    window.speechSynthesis.cancel();
    setStatus("idle");
    trackTTS("end", { tool_name: "text-to-speech", stopped: true });
  };

  const handleClear = () => {
    setText("");
    handleStop();
    trackClear("text-to-speech");
  };

  const showCopyStatus = (
    label: string,
    setLabel: (value: string) => void,
    timeoutRef: MutableRefObject<number | null>,
  ) => {
    setLabel(label);
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = window.setTimeout(() => {
      setLabel("Copy");
    }, 1600);
  };

  const handleCopyInput = async () => {
    if (!text.trim()) {
      showCopyStatus("Empty", setInputCopyLabel, copyTimeoutRef);
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
      showCopyStatus("Copied", setInputCopyLabel, copyTimeoutRef);
      trackCopy("text-to-speech", {
        ...getTextMeta(text),
        target: "input",
      });
    } catch (error) {
      showCopyStatus("Failed", setInputCopyLabel, copyTimeoutRef);
    }
  };

  const isSpeaking = status === "speaking";
  const isPaused = status === "paused";

  const tryNextRoutes = TRY_NEXT_BY_TOOL["/text-to-speech"];
  const relatedToolRoutes = RELATED_TOOLS_BY_TOOL["/text-to-speech"];
  const popularUseCases = getUseCasesByToolRoute("/text-to-speech").slice(0, 6);
  const tips = TOOL_TIPS["/text-to-speech"];
  const postAction = POST_ACTION_SUGGESTIONS["/text-to-speech"];
  const postActionUseCase = USE_CASE_BY_SLUG[postAction.useCaseSlug];

  return (
    <ToolLayout
      title="Text to Speech"
      description="Convert text into spoken audio using your browser's built-in speech synthesis."
      maxWidthClassName="max-w-5xl"
    >
      <AnalyticsEvent event="tool_page_view" props={{ tool: "text-to-speech" }} />
      <script type="application/ld+json">{JSON.stringify(TOOL_JSON_LD)}</script>
      <script type="application/ld+json">{JSON.stringify(FAQ_JSON_LD)}</script>
      <section className="rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_70px_-40px_rgba(15,23,42,0.45)]">
        <TextArea
          id="tts-text"
          label="Text"
          labelAction={
            <button
              type="button"
              onClick={handleCopyInput}
              className="rounded-full border border-zinc-200 px-3 py-1 text-xs font-semibold text-zinc-600 transition hover:border-zinc-300 hover:text-zinc-900"
            >
              {inputCopyLabel}
            </button>
          }
          value={text}
          onChange={(event) => {
            const nextValue = sanitizeText(
              event.target.value,
              MAX_INPUT_CHARS,
            );
            setText(nextValue);
            if (nextValue.trim()) {
              trackInputChange("text-to-speech", getTextMeta(nextValue));
            }
          }}
          onPaste={(event) => {
            const pasted = event.clipboardData.getData("text");
            if (pasted) {
              trackPaste("text-to-speech", getTextMeta(pasted));
            }
          }}
          placeholder="Type or paste text to read aloud..."
          minHeightClassName="min-h-[260px]"
          maxLength={MAX_INPUT_CHARS}
          helperText="For safety and performance, text is limited to 5,000 characters."
        />
      </section>

      <section className="grid gap-6 rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_70px_-40px_rgba(15,23,42,0.45)] lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <label className="text-sm font-semibold text-zinc-700">
            Voice
            <select
              value={voiceUri}
              onChange={(event) => setVoiceUri(event.target.value)}
              disabled={!speechSupported || voices.length === 0}
              className="mt-2 w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-900 focus:border-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-200 disabled:cursor-not-allowed"
            >
              {voices.length === 0 ? (
                <option value="">Loading voices...</option>
              ) : (
                voices.map((voice) => (
                  <option key={voice.voiceURI} value={voice.voiceURI}>
                    {voice.name} ({voice.lang})
                  </option>
                ))
              )}
            </select>
          </label>

          <div className="text-xs text-zinc-500">
            Status:{" "}
            <span className="font-semibold text-zinc-900">
              {status === "speaking"
                ? "Speaking..."
                : status === "paused"
                ? "Paused"
                : "Idle"}
            </span>
          </div>
        </div>

        <div className="grid gap-4">
          <label className="flex flex-col gap-2 text-sm font-semibold text-zinc-700">
            Rate ({rate.toFixed(1)})
            <input
              type="range"
              min={0.5}
              max={2}
              step={0.1}
              value={rate}
              onChange={(event) => setRate(Number(event.target.value))}
              className="w-full accent-zinc-900"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-semibold text-zinc-700">
            Pitch ({pitch.toFixed(1)})
            <input
              type="range"
              min={0}
              max={2}
              step={0.1}
              value={pitch}
              onChange={(event) => setPitch(Number(event.target.value))}
              className="w-full accent-zinc-900"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-semibold text-zinc-700">
            Volume ({volume.toFixed(1)})
            <input
              type="range"
              min={0}
              max={1}
              step={0.1}
              value={volume}
              onChange={(event) => setVolume(Number(event.target.value))}
              className="w-full accent-zinc-900"
            />
          </label>
        </div>
      </section>

      <section className="flex flex-wrap gap-3 rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_70px_-40px_rgba(15,23,42,0.45)]">
        <Button
          onClick={handleSpeak}
          disabled={!text.trim()}
          variant="primary"
          size="md"
        >
          Speak
        </Button>
        <Button
          onClick={handlePause}
          disabled={!isSpeaking}
          variant="secondary"
          size="md"
        >
          Pause
        </Button>
        <Button
          onClick={handleResume}
          disabled={!isPaused}
          variant="secondary"
          size="md"
        >
          Resume
        </Button>
        <Button
          onClick={handleStop}
          disabled={!isSpeaking && !isPaused}
          variant="secondary"
          size="md"
        >
          Stop
        </Button>
        <Button onClick={handleClear} variant="secondary" size="md">
          Clear
        </Button>
      </section>

      <section className="rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.35)]">
        <h2 className="text-lg font-semibold text-zinc-900">Try next</h2>
        <p className="mt-2 text-sm text-zinc-600">
          Keep the workflow moving with another tool.
        </p>
        <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold text-zinc-900">
          {tryNextRoutes.map((route) => (
            <TrackedLink
              key={route}
              href={route}
              eventName="click_try_next"
              eventProps={{ from: "text-to-speech", to: route }}
              className="underline"
            >
              {TOOL_BY_ROUTE[route]?.name}
            </TrackedLink>
          ))}
        </div>
      </section>

      <p className="text-xs text-zinc-500">
        Browser support note: Chrome and Edge provide the most reliable Web
        Speech API support. Other browsers may have limited or no voice
        availability.
      </p>

      <section className="rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.35)]">
        <h2 className="text-lg font-semibold text-zinc-900">
          Popular use cases for this tool
        </h2>
        <p className="mt-2 text-sm text-zinc-600">
          Use text to speech in real scenarios.
        </p>
        <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold text-zinc-900">
          <Link className="underline" href="/use-cases/text-to-speech">
            View all text to speech use cases
          </Link>
          {popularUseCases.map((useCase) => (
            <Link
              key={useCase.slug}
              className="underline"
              href={`/use-cases/${useCase.slug}`}
            >
              {useCase.title}
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.35)]">
        <h2 className="text-lg font-semibold text-zinc-900">Tips</h2>
        <div className="mt-4 space-y-3 text-sm text-zinc-600">
          {tips.map((tip) => (
            <details
              key={tip.title}
              className="rounded-2xl border border-zinc-200/80 bg-zinc-50 px-4 py-3"
            >
              <summary className="cursor-pointer text-sm font-semibold text-zinc-900">
                {tip.title}
              </summary>
              <p className="mt-2 text-sm text-zinc-600">{tip.text}</p>
              <Link className="mt-2 inline-flex text-sm font-semibold text-zinc-900 underline" href={tip.linkHref}>
                {tip.linkLabel}
              </Link>
            </details>
          ))}
        </div>
      </section>

      {hasUsed ? (
        <section className="rounded-3xl border border-zinc-200/80 bg-white p-5 text-sm text-zinc-600 shadow-sm">
          <p className="font-semibold text-zinc-900">
            Next, you might want to...
          </p>
          <div className="mt-3 flex flex-wrap gap-3 text-sm font-semibold text-zinc-600">
            {postAction.tools.map((route) => (
              <Link key={route} className="underline" href={route}>
                {TOOL_BY_ROUTE[route]?.name}
              </Link>
            ))}
            {postActionUseCase ? (
              <Link className="underline" href={`/use-cases/${postActionUseCase.slug}`}>
                {postActionUseCase.title}
              </Link>
            ) : null}
          </div>
        </section>
      ) : null}

      <section className="rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.35)]">
        <h2 className="text-lg font-semibold text-zinc-900">FAQ</h2>
        <div className="mt-4 space-y-3 text-sm text-zinc-600">
          {FAQ_ITEMS.map((item) => (
            <details
              key={item.question}
              className="rounded-2xl border border-zinc-200/80 bg-zinc-50 px-4 py-3"
            >
              <summary className="cursor-pointer text-sm font-semibold text-zinc-900">
                {item.question}
              </summary>
              <p className="mt-2 text-sm text-zinc-600">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="flex flex-wrap gap-3 text-sm font-semibold text-zinc-600">
        <span>Try also:</span>
        {relatedToolRoutes.map((route) => (
          <Link key={route} className="text-zinc-900 underline" href={route}>
            {TOOL_BY_ROUTE[route]?.name}
          </Link>
        ))}
      </section>
    </ToolLayout>
  );
}
