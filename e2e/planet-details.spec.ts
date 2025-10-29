import { test, expect } from "@playwright/test";

test.describe("Planet Details Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/planets");
    await page.waitForSelector('[role="button"][aria-label*="Planet"]', {
      timeout: 15000,
    });
  });

  test("should navigate to planet details when clicking a planet card", async ({
    page,
  }) => {
    const firstPlanetCard = page
      .locator('[role="button"][aria-label*="Planet"]')
      .first();

    const ariaLabel = await firstPlanetCard.getAttribute("aria-label");
    const planetName =
      ariaLabel?.replace(/^Planet\s+/, "").replace(/\s+details$/, "") || "";

    await firstPlanetCard.click();

    await page.waitForURL(/\/planets\/\d+/, { timeout: 15000 });

    await expect(page).toHaveURL(/\/planets\/\d+/);

    await page.waitForTimeout(2000);
    if (planetName && planetName.trim()) {
      await expect(
        page.getByRole("heading", { level: 1 }).first()
      ).toContainText(planetName.trim(), {
        timeout: 5000,
      });
    }
  });

  test("should display planet information", async ({ page }) => {
    const firstPlanetCard = page
      .locator('[role="button"][aria-label*="Planet"]')
      .first();

    await firstPlanetCard.click();
    await page.waitForURL(/\/planets\/\d+/, { timeout: 15000 });

    await page.waitForTimeout(1000);

    await expect(
      page
        .getByText(
          /rotation period|orbital period|diameter|climate|gravity|terrain|population/i
        )
        .first()
    ).toBeVisible({ timeout: 10000 });
  });

  test("should display films section", async ({ page }) => {
    const firstPlanetCard = page
      .locator('[role="button"][aria-label*="Planet"]')
      .first();

    await firstPlanetCard.click();
    await page.waitForURL(/\/planets\/\d+/, { timeout: 15000 });

    await page.waitForTimeout(2000);
    await page.waitForSelector('h2:has-text("Films"), [class*="Films"]', {
      timeout: 10000,
    });

    const filmsSection = page.getByRole("heading", { name: /films/i });
    await expect(filmsSection).toBeVisible({ timeout: 5000 });
  });

  test("should display residents section", async ({ page }) => {
    const firstPlanetCard = page
      .locator('[role="button"][aria-label*="Planet"]')
      .first();

    await firstPlanetCard.click();
    await page.waitForURL(/\/planets\/\d+/, { timeout: 15000 });

    await page.waitForTimeout(3000);

    const residentsSection = page.getByRole("heading", { name: /residents/i });

    await expect(residentsSection)
      .toBeVisible({ timeout: 10000 })
      .catch(() => {
        return page.waitForSelector(
          'h2:has-text("Residents"), [class*="Residents"]',
          {
            timeout: 5000,
          }
        );
      });
  });
});
