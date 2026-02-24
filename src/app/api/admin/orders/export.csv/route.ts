import { createAdminUnauthorizedResponse, isAdminRequestAuthorized } from "@/server/admin-request";
import { toCsv } from "@/server/csv";
import { prisma } from "@/server/db";

const HEADERS = [
  "orderId",
  "orderRef",
  "status",
  "createdAt",
  "customerFirstName",
  "customerLastName",
  "customerEmail",
  "customerPhone",
  "currency",
  "totalCents",
  "itemSku",
  "itemName",
  "itemQuantity",
  "itemUnitPriceCents",
  "itemLineTotalCents"
];

export async function GET(request: Request): Promise<Response> {
  if (!(await isAdminRequestAuthorized(request))) {
    return createAdminUnauthorizedResponse();
  }

  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { items: true },
    take: 5000
  });

  const rows: Array<Record<string, unknown>> = [];

  for (const order of orders) {
    if (order.items.length === 0) {
      rows.push({
        orderId: order.id,
        orderRef: order.orderRef,
        status: order.status,
        createdAt: order.createdAt.toISOString(),
        customerFirstName: order.customerFirstName,
        customerLastName: order.customerLastName,
        customerEmail: order.customerEmail,
        customerPhone: order.customerPhone ?? "",
        currency: order.currency,
        totalCents: order.totalCents,
        itemSku: "",
        itemName: "",
        itemQuantity: "",
        itemUnitPriceCents: "",
        itemLineTotalCents: ""
      });
      continue;
    }

    for (const item of order.items) {
      rows.push({
        orderId: order.id,
        orderRef: order.orderRef,
        status: order.status,
        createdAt: order.createdAt.toISOString(),
        customerFirstName: order.customerFirstName,
        customerLastName: order.customerLastName,
        customerEmail: order.customerEmail,
        customerPhone: order.customerPhone ?? "",
        currency: order.currency,
        totalCents: order.totalCents,
        itemSku: item.skuSnapshot,
        itemName: item.productNameSnapshot,
        itemQuantity: item.quantity,
        itemUnitPriceCents: item.unitPriceCents,
        itemLineTotalCents: item.lineTotalCents
      });
    }
  }

  return new Response(toCsv(HEADERS, rows), {
    status: 200,
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": `attachment; filename="orders-export.csv"`
    }
  });
}
