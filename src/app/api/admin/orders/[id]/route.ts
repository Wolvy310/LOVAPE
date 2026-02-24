import { prisma } from "@/server/db";
import { createAdminUnauthorizedResponse, isAdminRequestAuthorized } from "@/server/admin-request";

interface RouteProps {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, { params }: RouteProps): Promise<Response> {
  if (!(await isAdminRequestAuthorized(request))) {
    return createAdminUnauthorizedResponse();
  }

  const { id } = await params;
  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      items: true
    }
  });

  if (!order) {
    return Response.json({ error: "Order not found." }, { status: 404 });
  }

  return Response.json({ item: order });
}
