import { test, expect } from "@playwright/test";

test.describe("Planets List Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/planets");
  });

  test("should display planets list page with header", async ({ page }) => {
    // Wait for page to finish loading (header appears after loading state)
    await page.waitForSelector("h1", { timeout: 15000 });
    await expect(page.locator("h1")).toContainText(
      /star wars planets|planets/i
    );
  });

  test("should display search input", async ({ page }) => {
    // Wait for page to load first
    await page.waitForSelector('[role="button"][aria-label*="Planet"]', {
      timeout: 15000,
    });

    // Use getByRole with aria-label or getByPlaceholder
    const searchInput = page.getByRole("textbox", {
      name: /search for a planet/i,
    });
    await expect(searchInput).toBeVisible({ timeout: 5000 });
    await expect(searchInput).toHaveAttribute("type", "text");
  });

  test("should display planets cards", async ({ page }) => {
    await page.waitForSelector('[role="button"][aria-label*="Planet"]', {
      timeout: 15000,
    });

    const planetCards = page.locator('[role="button"][aria-label*="Planet"]');
    await expect(planetCards.first()).toBeVisible();
    expect(await planetCards.count()).toBeGreaterThan(0);
  });

  test("should display planet information in cards", async ({ page }) => {
    await page.waitForSelector('[role="button"][aria-label*="Planet"]', {
      timeout: 15000,
    });

    const firstPlanetCard = page
      .locator('[role="button"][aria-label*="Planet"]')
      .first();

    await expect(firstPlanetCard).toBeVisible();

    const cardContent = firstPlanetCard.locator("..");
    await expect(cardContent).toContainText(/climate|terrain|diameter|film/i);
  });

  test("should display film names in planet cards", async ({ page }) => {
    await page.waitForSelector('[role="button"][aria-label*="Planet"]', {
      timeout: 15000,
    });

    // Wait a bit longer for films to load
    await page.waitForTimeout(3000);

    const firstPlanetCard = page
      .locator('[role="button"][aria-label*="Planet"]')
      .first();

    // Get the parent card element
    const planetCardContent = firstPlanetCard.locator("..");

    // Find the Films label specifically within this card, using .first() to avoid strict mode violation
    const filmsLabel = planetCardContent.getByText(/films/i).first();

    await expect(filmsLabel).toBeVisible({ timeout: 5000 });

    // Check if films section shows either film titles, loading state, or count
    const hasFilmContent = await planetCardContent
      .locator(
        "text=/A New Hope|The Empire Strikes Back|Return of the Jedi|The Phantom Menace|Attack of the Clones|Revenge of the Sith|Loading films|appearance|No films/i"
      )
      .first()
      .isVisible({ timeout: 3000 })
      .catch(() => false);

    // At least one of these should be visible: film title, loading, or count
    expect(hasFilmContent).toBeTruthy();
  });

  test("should display pagination controls", async ({ page }) => {
    await page.waitForSelector('[role="button"][aria-label*="Planet"]', {
      timeout: 15000,
    });

    const pagination = page.getByRole("navigation", {
      name: /planets pagination/i,
    });
    await expect(pagination).toBeVisible({ timeout: 5000 });

    const previousButton = page.getByRole("button", {
      name: "Go to previous page",
    });
    const nextButton = page.getByRole("button", { name: "Go to next page" });

    await expect(previousButton).toBeVisible();
    await expect(nextButton).toBeVisible();
  });
});
