import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import TextToSpeechPage from "../../app/text-to-speech/page";

type MockSpeechSynthesis = {
  speaking: boolean;
  paused: boolean;
  speak: (utterance: SpeechSynthesisUtterance) => void;
  cancel: () => void;
  pause: () => void;
  resume: () => void;
  getVoices: () => SpeechSynthesisVoice[];
  addEventListener: (event: string, cb: () => void) => void;
  removeEventListener: (event: string, cb: () => void) => void;
};

const mockVoice = {
  voiceURI: "mock-voice",
  name: "Mock Voice",
  lang: "en-US",
} as SpeechSynthesisVoice;

describe("Text to Speech page", () => {
  let mockSpeech: MockSpeechSynthesis;

  beforeEach(() => {
    vi.useFakeTimers();
    const listeners = new Map<string, Set<() => void>>();
    mockSpeech = {
      speaking: false,
      paused: false,
      speak: () => {
        mockSpeech.speaking = true;
        mockSpeech.paused = false;
      },
      cancel: () => {
        mockSpeech.speaking = false;
        mockSpeech.paused = false;
      },
      pause: () => {
        mockSpeech.paused = true;
      },
      resume: () => {
        mockSpeech.paused = false;
      },
      getVoices: () => [mockVoice],
      addEventListener: (event, cb) => {
        if (!listeners.has(event)) {
          listeners.set(event, new Set());
        }
        listeners.get(event)?.add(cb);
      },
      removeEventListener: (event, cb) => {
        listeners.get(event)?.delete(cb);
      },
    };

    Object.assign(window, { speechSynthesis: mockSpeech });
    Object.assign(global, {
      SpeechSynthesisUtterance: class SpeechSynthesisUtterance {
        text: string;
        rate = 1;
        pitch = 1;
        volume = 1;
        voice: SpeechSynthesisVoice | null = null;
        onend: (() => void) | null = null;
        onerror: (() => void) | null = null;
        constructor(text: string) {
          this.text = text;
        }
      },
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders controls and toggles buttons", async () => {
    render(<TextToSpeechPage />);
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

    const textArea = screen.getByLabelText("Text");
    const speakButton = screen.getByRole("button", { name: "Speak" });
    expect(speakButton).toBeDisabled();

    await user.type(textArea, "Hello");
    expect(speakButton).toBeEnabled();

    await user.click(speakButton);
    vi.advanceTimersByTime(300);
    expect(mockSpeech.speaking).toBe(true);

    await user.click(screen.getByRole("button", { name: "Pause" }));
    vi.advanceTimersByTime(300);
    expect(mockSpeech.paused).toBe(true);

    await user.click(screen.getByRole("button", { name: "Resume" }));
    vi.advanceTimersByTime(300);
    expect(mockSpeech.paused).toBe(false);

    await user.click(screen.getByRole("button", { name: "Stop" }));
    vi.advanceTimersByTime(300);
    expect(mockSpeech.speaking).toBe(false);
  });
});
