import { test, expect } from "@playwright/test";

test("text to speech triggers speak", async ({ page }) => {
  await page.addInitScript(() => {
    const voice = {
      voiceURI: "mock-voice",
      name: "Mock Voice",
      lang: "en-US",
    };

    (window as any).__ttsCalls = 0;
    (window as any).speechSynthesis = {
      speaking: false,
      paused: false,
      getVoices: () => [voice],
      addEventListener: () => {},
      removeEventListener: () => {},
      speak: () => {
        (window as any).__ttsCalls += 1;
      },
      cancel: () => {},
      pause: () => {},
      resume: () => {},
    };

    (window as any).SpeechSynthesisUtterance = function (text: string) {
      this.text = text;
    };
  });

  await page.goto("/text-to-speech");
  await page.getByLabel("Text").fill("Hello world");
  await page.getByRole("button", { name: "Speak" }).click();

  const calls = await page.evaluate(() => (window as any).__ttsCalls);
  expect(calls).toBe(1);
});
