"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import Button from "../../components/Button";
import TextArea from "../../components/TextArea";
import ToolLayout from "../../components/ToolLayout";
import { sanitizeText } from "../../lib/text-safety";

const MAX_INPUT_CHARS = 5_000;
const MAX_SPEAK_DURATION_MS = 120_000;

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
  const speakTimeoutRef = useRef<number | null>(null);

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
      return;
    }

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
    };
    utterance.onerror = () => {
      clearSpeakTimeout();
      setStatus("idle");
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
  };

  const handleResume = () => {
    if (!speechSupported) {
      return;
    }
    window.speechSynthesis.resume();
    setStatus("speaking");
  };

  const handleStop = () => {
    if (!speechSupported) {
      return;
    }
    clearSpeakTimeout();
    window.speechSynthesis.cancel();
    setStatus("idle");
  };

  const handleClear = () => {
    setText("");
    handleStop();
  };

  const isSpeaking = status === "speaking";
  const isPaused = status === "paused";

  return (
    <ToolLayout
      title="Text to Speech"
      description="Convert text into spoken audio using your browser's built-in speech synthesis."
      maxWidthClassName="max-w-5xl"
    >
      <section className="rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_70px_-40px_rgba(15,23,42,0.45)]">
        <TextArea
          id="tts-text"
          label="Text"
          value={text}
          onChange={(event) =>
            setText(sanitizeText(event.target.value, MAX_INPUT_CHARS))
          }
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

      <p className="text-xs text-zinc-500">
        Browser support note: Chrome and Edge provide the most reliable Web
        Speech API support. Other browsers may have limited or no voice
        availability.
      </p>
    </ToolLayout>
  );
}
