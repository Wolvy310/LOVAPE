import { OrderStatus } from "@prisma/client";
import { z } from "zod";

import { prisma } from "@/server/db";
import { createAdminUnauthorizedResponse, isAdminRequestAuthorized } from "@/server/admin-request";

interface RouteProps {
  params: Promise<{ id: string }>;
}

const updateStatusSchema = z.object({
  status: z.nativeEnum(OrderStatus)
});

export async function PATCH(request: Request, { params }: RouteProps): Promise<Response> {
  if (!(await isAdminRequestAuthorized(request))) {
    return createAdminUnauthorizedResponse();
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  const parsed = updateStatusSchema.safeParse(payload);
  if (!parsed.success) {
    return Response.json({ error: "Invalid status payload." }, { status: 400 });
  }

  const { id } = await params;
  try {
    const updated = await prisma.order.update({
      where: { id },
      data: { status: parsed.data.status },
      select: {
        id: true,
        orderRef: true,
        status: true,
        updatedAt: true
      }
    });

    return Response.json({ item: updated });
  } catch {
    return Response.json({ error: "Order not found." }, { status: 404 });
  }
}
