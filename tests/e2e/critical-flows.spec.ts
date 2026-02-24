import { expect, test, type Page } from "@playwright/test";

interface CheckoutRequestPayload {
  customerFirstName: string;
  customerLastName: string;
  customerEmail: string;
  customerPhone: string | null;
  customerMessage: string | null;
  legalAccepted: boolean;
  ageConfirmed: boolean;
  analyticsConsent: boolean;
  items: Array<{
    sku: string;
    name: string;
    unitPriceCents: number;
    quantity: number;
  }>;
}

async function preRejectAnalyticsConsent(page: Page): Promise<void> {
  await page.addInitScript(() => {
    window.localStorage.setItem("lovape:analytics-consent", "rejected");
  });
}

test("cookie banner can be rejected and remains hidden on reload", async ({ page }) => {
  await page.route("**/api/consent", async (route) => {
    const payload = route.request().postDataJSON() as { decision?: string; scope?: string; pagePath?: string };
    expect(payload.scope).toBe("ANALYTICS");
    expect(payload.decision).toBe("REJECTED");
    expect(payload.pagePath).toBe("/");

    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ ok: true })
    });
  });

  await page.goto("/");

  const bannerTitle = page.getByText("Cookies et mesure d audience");
  await expect(bannerTitle).toBeVisible();
  await page.getByRole("button", { name: "Refuser" }).click();
  await expect(bannerTitle).toBeHidden();

  await expect
    .poll(async () => page.evaluate(() => window.localStorage.getItem("lovape:analytics-consent")))
    .toBe("rejected");

  await page.reload();
  await expect(bannerTitle).toBeHidden();
});

test("admin routes are protected without session", async ({ page, request }) => {
  await preRejectAnalyticsConsent(page);

  const uiResponse = await page.goto("/admin");
  await page.waitForURL(/\/admin\/login\?next=%2Fadmin/);
  await expect(page.getByRole("heading", { name: "Connexion admin" })).toBeVisible();

  expect(uiResponse?.headers()["x-content-type-options"]).toBe("nosniff");
  expect(uiResponse?.headers()["x-frame-options"]).toBe("DENY");
  expect(uiResponse?.headers()["x-request-id"]).toBeTruthy();

  const apiResponse = await request.get("/api/admin/products");
  expect(apiResponse.status()).toBe(401);
  expect(apiResponse.headers()["x-content-type-options"]).toBe("nosniff");
  expect(apiResponse.headers()["x-frame-options"]).toBe("DENY");
  expect(apiResponse.headers()["x-request-id"]).toBeTruthy();

  const payload = (await apiResponse.json()) as { error?: string };
  expect(payload.error).toContain("Unauthorized admin request");
});

test("checkout request shows empty cart guard", async ({ page }) => {
  await preRejectAnalyticsConsent(page);

  await page.goto("/checkout/request");
  await expect(page.getByText("Votre panier est vide.")).toBeVisible();
  await expect(page.getByRole("link", { name: "Retour catalogue" })).toBeVisible();
});

test("checkout request submits with valid payload and redirects to confirmation", async ({ page }) => {
  const seededCart = [
    {
      sku: "E2E-LIQ-001",
      slug: "e2e-liquide-10ml",
      name: "E-liquide E2E",
      brandName: "Test Brand",
      imageUrl: "/og-image.svg",
      priceCents: 590,
      productType: "E_LIQUID",
      quantity: 2,
      addedAt: "2026-02-24T00:00:00.000Z"
    }
  ];

  await page.addInitScript((cart) => {
    window.localStorage.setItem("lovape:analytics-consent", "rejected");
    window.localStorage.setItem("lovape:cart:v1", JSON.stringify(cart));
  }, seededCart);

  const submittedPayloads: CheckoutRequestPayload[] = [];
  await page.route("**/api/checkout/request", async (route) => {
    submittedPayloads.push(route.request().postDataJSON() as CheckoutRequestPayload);
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ orderRef: "CMD-E2E-001" })
    });
  });

  await page.goto("/checkout/request");

  await expect(page.getByText("Recapitulatif")).toBeVisible();
  await page.getByLabel("Prenom").fill("Alice");
  await page.getByLabel(/^Nom$/).fill("Durand");
  await page.getByLabel("Email").fill("alice@example.com");
  await page
    .getByLabel("Je confirme avoir lu les informations legales et les conditions de demande.")
    .check();
  await page.getByLabel("Je certifie etre majeur.").check();

  await page.getByRole("button", { name: "Envoyer ma demande" }).click();
  await page.waitForURL("**/checkout/confirmation/CMD-E2E-001");
  await expect(page.getByText("Reference de demande: CMD-E2E-001")).toBeVisible();

  expect(submittedPayloads).toHaveLength(1);
  const submittedPayload = submittedPayloads[0];
  expect(submittedPayload.customerFirstName).toBe("Alice");
  expect(submittedPayload.customerLastName).toBe("Durand");
  expect(submittedPayload.customerEmail).toBe("alice@example.com");
  expect(submittedPayload.legalAccepted).toBe(true);
  expect(submittedPayload.ageConfirmed).toBe(true);
  expect(submittedPayload.items).toEqual([
    {
      sku: "E2E-LIQ-001",
      name: "E-liquide E2E",
      unitPriceCents: 590,
      quantity: 2
    }
  ]);

  const cartAfterSubmit = await page.evaluate(() => window.localStorage.getItem("lovape:cart:v1"));
  expect(cartAfterSubmit).toBe("[]");
});
