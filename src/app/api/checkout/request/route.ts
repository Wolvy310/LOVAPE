import { OrderStatus } from "@prisma/client";

import { sendOrderRequestedEmail } from "@/server/email-provider";
import { checkoutRequestSchema, calculateCheckoutTotals, buildOrderRef } from "@/server/order-request";
import { prisma } from "@/server/db";

export async function POST(request: Request): Promise<Response> {
  const requestId = request.headers.get("x-request-id") ?? crypto.randomUUID();

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  const parsed = checkoutRequestSchema.safeParse(payload);
  if (!parsed.success) {
    return Response.json(
      {
        error: "Invalid checkout request payload.",
        issues: parsed.error.flatten()
      },
      { status: 400 }
    );
  }

  const { items } = parsed.data;
  const totals = calculateCheckoutTotals(items);
  const orderRef = buildOrderRef();
  const now = new Date();

  try {
    const productRows = await prisma.product.findMany({
      where: {
        sku: {
          in: items.map((item) => item.sku)
        }
      },
      select: {
        id: true,
        sku: true,
        name: true
      }
    });
    const productIdBySku = new Map(productRows.map((product) => [product.sku, product.id]));

    await prisma.order.create({
      data: {
        orderRef,
        status: OrderStatus.REQUESTED,
        customerFirstName: parsed.data.customerFirstName,
        customerLastName: parsed.data.customerLastName,
        customerEmail: parsed.data.customerEmail,
        customerPhone: parsed.data.customerPhone ?? null,
        customerMessage: parsed.data.customerMessage ?? null,
        legalAcceptedAt: now,
        ageConfirmedAt: now,
        analyticsConsentAt: parsed.data.analyticsConsent ? now : null,
        currency: "EUR",
        totalCents: totals.totalCents,
        items: {
          create: items.map((item) => ({
            productId: productIdBySku.get(item.sku) ?? null,
            productNameSnapshot: item.name,
            skuSnapshot: item.sku,
            unitPriceCents: item.unitPriceCents,
            quantity: item.quantity,
            lineTotalCents: item.unitPriceCents * item.quantity
          }))
        }
      }
    });

    await sendOrderRequestedEmail({
      orderRef,
      customerEmail: parsed.data.customerEmail,
      totalCents: totals.totalCents,
      itemCount: totals.itemCount,
      requestId
    });

    return Response.json(
      {
        orderRef,
        status: OrderStatus.REQUESTED
      },
      { status: 201 }
    );
  } catch (error) {
    process.stderr.write(
      `[checkout.request.error] ${JSON.stringify({
        requestId,
        orderRef,
        message: error instanceof Error ? error.message : "unknown"
      })}\n`
    );
    return Response.json(
      {
        error: "Failed to create order request."
      },
      { status: 500 }
    );
  }
}

