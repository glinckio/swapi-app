import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("should redirect from home to planets page", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL("/planets");
  });

  test("should navigate to planets page", async ({ page }) => {
    await page.goto("/planets");
    await expect(page).toHaveURL("/planets");

    // Wait for page to finish loading (wait for header to appear)
    await page.waitForSelector("h1", { timeout: 15000 });
    await expect(page.locator("h1")).toContainText(
      /star wars planets|planets/i
    );
  });
});
