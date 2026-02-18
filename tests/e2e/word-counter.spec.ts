import { test, expect } from "@playwright/test";

test("word counter updates counts", async ({ page }) => {
  await page.goto("/word-counter");
  await page.getByLabel("Text input").fill("Hello world");

  await expect(page.getByText("Word count")).toBeVisible();
  await expect(page.getByText("Character count")).toBeVisible();
  await expect(page.getByText("Characters (no spaces)")).toBeVisible();

  await expect(page.getByText("2")).toBeVisible();
});
