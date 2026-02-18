import { test, expect } from "@playwright/test";

test("case converter switches modes", async ({ page }) => {
  await page.goto("/case-converter");
  await page.getByLabel("Input").fill("hello world");

  await page.getByRole("button", { name: "UPPERCASE" }).click();
  await expect(page.getByLabel("Output")).toHaveValue("HELLO WORLD");

  await page.getByRole("button", { name: "Title Case" }).click();
  await expect(page.getByLabel("Output")).toHaveValue("Hello World");
});
