import { test, expect } from "@playwright/test";

test.describe("Planets Pagination", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/planets");
    await page.waitForSelector('[role="button"][aria-label*="Planet"]', {
      timeout: 15000,
    });
  });

  test("should navigate to next page", async ({ page }) => {
    const nextButton = page.getByRole("button", { name: "Go to next page" });

    if (await nextButton.isEnabled()) {
      const initialPlanets = await page
        .locator('[role="button"][aria-label*="Planet"]')
        .all();

      await nextButton.click();

      await page.waitForTimeout(1000);
      await page.waitForSelector('[role="button"][aria-label*="Planet"]', {
        timeout: 15000,
      });

      const newPlanets = await page
        .locator('[role="button"][aria-label*="Planet"]')
        .all();

      expect(newPlanets.length).toBeGreaterThan(0);
    } else {
      test.skip();
    }
  });

  test("should navigate to previous page", async ({ page }) => {
    const nextButton = page.getByRole("button", { name: "Go to next page" });
    const previousButton = page.getByRole("button", {
      name: "Go to previous page",
    });

    if (await nextButton.isEnabled()) {
      await nextButton.click();
      await page.waitForTimeout(1000);
      await page.waitForSelector('[role="button"][aria-label*="Planet"]', {
        timeout: 15000,
      });

      if (await previousButton.isEnabled()) {
        await previousButton.click();
        await page.waitForTimeout(1000);
        await page.waitForSelector('[role="button"][aria-label*="Planet"]', {
          timeout: 15000,
        });

        const planets = await page
          .locator('[role="button"][aria-label*="Planet"]')
          .all();

        expect(planets.length).toBeGreaterThan(0);
      }
    } else {
      test.skip();
    }
  });

  test("should disable previous button on first page", async ({ page }) => {
    const previousButton = page.getByRole("button", {
      name: "Go to previous page",
    });
    await expect(previousButton).toBeDisabled();
  });
});
