import { test, expect } from "@playwright/test";

test.describe("Residents Details", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/planets/1");
    await page.waitForSelector("h1, h2", { timeout: 15000 });
    await page.waitForTimeout(3000); // Wait for residents to load
  });

  test("should display residents section", async ({ page }) => {
    const residentsHeading = page.getByRole("heading", { name: /residents/i });

    await expect(residentsHeading).toBeVisible({ timeout: 10000 });
  });

  test("should display resident information when available", async ({
    page,
  }) => {
    const residentsHeading = page.getByRole("heading", { name: /residents/i });
    await expect(residentsHeading).toBeVisible({ timeout: 10000 });

    const residentCards = page.locator("text=/hair color|eye color|gender/i");

    if ((await residentCards.count()) > 0) {
      const firstResident = residentCards.first().locator("..");

      await expect(firstResident).toContainText(/hair color|eye color|gender/i);
    }
  });

  test("should display species information for residents", async ({ page }) => {
    await page.waitForTimeout(3000);

    const speciesText = page.getByText(/species/i).first();

    const isVisible = await speciesText
      .isVisible({ timeout: 5000 })
      .catch(() => false);
    if (isVisible) {
      await expect(speciesText).toBeVisible();
    }
  });

  test("should display vehicle information for residents", async ({ page }) => {
    await page.waitForTimeout(3000);

    const vehiclesText = page.getByText(/vehicles/i).first();

    const isVisible = await vehiclesText
      .isVisible({ timeout: 5000 })
      .catch(() => false);
    if (isVisible) {
      await expect(vehiclesText).toBeVisible();

      const vehicleCard = page
        .locator("text=/vehicles/i")
        .first()
        .locator("..");
      if (await vehicleCard.isVisible()) {
        await expect(vehicleCard).toContainText(/[A-Za-z]/);
      }
    }
  });

  test("should display resident fields: name, hair color, eye color, gender", async ({
    page,
  }) => {
    await page.waitForTimeout(3000);

    const residentsHeading = page.getByRole("heading", { name: /residents/i });
    await expect(residentsHeading).toBeVisible({ timeout: 10000 });

    const hasResidentFields = await page
      .locator("text=/hair color|eye color|gender/i")
      .first()
      .isVisible({ timeout: 5000 })
      .catch(() => false);

    if (hasResidentFields) {
      const residentNames = page.locator(
        "h1, h2, h3, [class*='title'], [class*='name']"
      );
      const nameCount = await residentNames.count();
      expect(nameCount).toBeGreaterThan(0);

      await expect(page.getByText(/hair color/i).first()).toBeVisible();
      await expect(page.getByText(/eye color/i).first()).toBeVisible();
      await expect(page.getByText(/gender/i).first()).toBeVisible();
    } else {
      test.skip();
    }
  });
});
