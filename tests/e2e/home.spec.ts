import { expect, test } from "@playwright/test";

test("home displays legal warnings", async ({ page }) => {
  await page.goto("/");
  const main = page.getByRole("main");
  await expect(main.getByText("Vente interdite aux mineurs.")).toBeVisible();
  await expect(main.getByText("Si vous ne fumez pas, ne vapez pas.")).toBeVisible();
});
