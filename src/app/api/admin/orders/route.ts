import { prisma } from "@/server/db";
import { createAdminUnauthorizedResponse, isAdminRequestAuthorized } from "@/server/admin-request";

export async function GET(request: Request): Promise<Response> {
  if (!isAdminRequestAuthorized(request)) {
    return createAdminUnauthorizedResponse();
  }

  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
    include: {
      items: {
        select: {
          id: true,
          quantity: true
        }
      }
    }
  });

  return Response.json({
    items: orders.map((order) => ({
      id: order.id,
      orderRef: order.orderRef,
      status: order.status,
      customerFirstName: order.customerFirstName,
      customerLastName: order.customerLastName,
      customerEmail: order.customerEmail,
      totalCents: order.totalCents,
      createdAt: order.createdAt,
      itemCount: order.items.reduce((acc, item) => acc + item.quantity, 0)
    }))
  });
}

