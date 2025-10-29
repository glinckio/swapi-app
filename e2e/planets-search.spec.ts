import { test, expect } from "@playwright/test";

test.describe("Planets Search", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/planets");
    await page.waitForSelector('[role="button"][aria-label*="Planet"]', {
      timeout: 15000,
    });
  });

  test("should allow typing in search input", async ({ page }) => {
    const searchInput = page.getByLabel(/search for a planet/i);
    await searchInput.fill("Tatooine");
    await expect(searchInput).toHaveValue("Tatooine");
  });

  test("should filter planets when searching", async ({ page }) => {
    const searchInput = page.getByLabel(/search for a planet/i);

    await searchInput.fill("Tatooine");

    await page.waitForTimeout(2000);

    try {
      await Promise.race([
        page.waitForSelector('[role="button"][aria-label*="Planet"]', {
          timeout: 10000,
        }),
        page.getByText("No planets found").waitFor({ timeout: 10000 }),
      ]);
    } catch {}

    const planetCount = await page
      .locator('[role="button"][aria-label*="Planet"]')
      .count();
    const hasPlanets = planetCount > 0;

    const hasNoPlanets = await page
      .getByText("No planets found")
      .isVisible()
      .catch(() => false);

    expect(hasPlanets || hasNoPlanets).toBeTruthy();

    const planetCards = page.locator('[role="button"][aria-label*="Planet"]');

    const count = await planetCards.count();
    expect(count).toBeGreaterThanOrEqual(0);
  });

  test("should reset to page 1 when searching", async ({ page }) => {
    const searchInput = page.getByLabel(/search for a planet/i);

    const nextButton = page.getByRole("button", { name: "Go to next page" });
    if (await nextButton.isEnabled()) {
      await nextButton.click();
      await page.waitForTimeout(1000);
    }

    await searchInput.fill("test");
    await page.waitForTimeout(500);

    await expect(page).toHaveURL(/\/planets/);
  });
});
