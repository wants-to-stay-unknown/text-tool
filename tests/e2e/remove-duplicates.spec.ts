import { test, expect } from "@playwright/test";

test("remove duplicates updates output", async ({ page }) => {
  await page.goto("/remove-duplicates");
  await page.getByLabel("Input").fill("a\na\nb");

  await expect(page.getByLabel("Output")).toHaveValue("a\nb");
});
