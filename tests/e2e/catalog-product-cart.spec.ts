import { expect, test, type Page } from "@playwright/test";

import { E2E_CATALOG_SEED } from "./fixtures/catalog-seed";

const CART_STORAGE_KEY = "lovape:cart:v1";
const CONSENT_STORAGE_KEY = "lovape:analytics-consent";

async function prepareStablePublicState(page: Page): Promise<void> {
  await page.addInitScript(
    ({ cartKey, consentKey, initializedKey }) => {
      const alreadyInitialized = window.sessionStorage.getItem(initializedKey) === "1";
      if (alreadyInitialized) {
        return;
      }

      window.localStorage.setItem(consentKey, "rejected");
      window.localStorage.setItem(cartKey, "[]");
      window.sessionStorage.setItem(initializedKey, "1");
    },
    {
      cartKey: CART_STORAGE_KEY,
      consentKey: CONSENT_STORAGE_KEY,
      initializedKey: "lovape:e2e-initialized"
    }
  );
}

async function openProductFromCatalog(page: Page, catalogPath: string, productSlug: string): Promise<void> {
  await page.goto(catalogPath);
  const detailsLink = page.locator(`a[href="/product/${productSlug}"]`);
  await expect(detailsLink).toBeVisible();
  await detailsLink.click();
  await page.waitForURL(`**/product/${productSlug}`);
}

async function readCartSnapshot(page: Page): Promise<Array<{ sku?: string; quantity?: number }>> {
  return page.evaluate((storageKey) => {
    try {
      return JSON.parse(window.localStorage.getItem(storageKey) ?? "[]") as Array<{ sku?: string; quantity?: number }>;
    } catch {
      return [];
    }
  }, CART_STORAGE_KEY);
}

test.describe("catalog to cart flow without api mock", () => {
  test.beforeEach(async ({ page }) => {
    await prepareStablePublicState(page);
  });

  test("e-liquids catalog goes to product and adds one cart item", async ({ page }) => {
    await openProductFromCatalog(page, "/catalog/e-liquides", E2E_CATALOG_SEED.eLiquid.slug);

    await expect(page.getByRole("heading", { name: E2E_CATALOG_SEED.eLiquid.name })).toBeVisible();
    await page.getByRole("button", { name: "Ajouter au panier" }).click();
    await expect(page.getByRole("button", { name: "Ajoute" })).toBeVisible();
    await page.getByRole("link", { name: "Voir panier" }).click();

    await page.waitForURL("**/cart");
    await expect(page.getByRole("heading", { name: "Panier" })).toBeVisible();
    await expect(page.getByText(E2E_CATALOG_SEED.eLiquid.name)).toBeVisible();
    await expect(page.getByRole("link", { name: "Panier (1)" })).toBeVisible();

    const cartSnapshot = await readCartSnapshot(page);
    expect(cartSnapshot).toHaveLength(1);
    expect(cartSnapshot[0]?.sku).toBe(E2E_CATALOG_SEED.eLiquid.sku);
    expect(cartSnapshot[0]?.quantity).toBe(1);
  });

  test("mtl catalog item keeps cart quantity after reload", async ({ page }) => {
    await openProductFromCatalog(page, "/catalog/materiel-mtl", E2E_CATALOG_SEED.mtlMaterial.slug);

    await expect(page.getByRole("heading", { name: E2E_CATALOG_SEED.mtlMaterial.name })).toBeVisible();
    await page.getByRole("button", { name: "Ajouter au panier" }).click();
    await page.getByRole("link", { name: "Voir panier" }).click();
    await page.waitForURL("**/cart");

    await expect(page.getByText(E2E_CATALOG_SEED.mtlMaterial.name)).toBeVisible();
    await page.getByRole("button", { name: "+" }).click();
    await expect(page.getByRole("link", { name: "Panier (2)" })).toBeVisible();

    await expect
      .poll(async () => {
        const cartSnapshot = await readCartSnapshot(page);
        return cartSnapshot[0]?.quantity ?? 0;
      })
      .toBe(2);

    await page.reload();
    await expect(page.getByText(E2E_CATALOG_SEED.mtlMaterial.name)).toBeVisible();
    await expect(page.getByRole("link", { name: "Panier (2)" })).toBeVisible();

    const cartSnapshotAfterReload = await readCartSnapshot(page);
    expect(cartSnapshotAfterReload).toHaveLength(1);
    expect(cartSnapshotAfterReload[0]?.sku).toBe(E2E_CATALOG_SEED.mtlMaterial.sku);
    expect(cartSnapshotAfterReload[0]?.quantity).toBe(2);
  });
});
