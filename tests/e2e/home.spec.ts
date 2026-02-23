import { expect, test } from "@playwright/test";

test("home displays legal warnings", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Vente interdite aux mineurs.")).toBeVisible();
  await expect(page.getByText("Si vous ne fumez pas, ne vapez pas.")).toBeVisible();
});

