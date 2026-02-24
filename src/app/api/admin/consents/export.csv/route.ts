import { createAdminUnauthorizedResponse, isAdminRequestAuthorized } from "@/server/admin-request";
import { toCsv } from "@/server/csv";
import { prisma } from "@/server/db";

const HEADERS = ["id", "scope", "decision", "pagePath", "requestId", "userAgent", "ipHash", "userHash", "createdAt"];

export async function GET(request: Request): Promise<Response> {
  if (!(await isAdminRequestAuthorized(request))) {
    return createAdminUnauthorizedResponse();
  }

  const logs = await prisma.consentLog.findMany({
    orderBy: { createdAt: "desc" },
    take: 10000
  });

  const rows = logs.map((item) => ({
    id: item.id,
    scope: item.scope,
    decision: item.decision,
    pagePath: item.pagePath,
    requestId: item.requestId,
    userAgent: item.userAgent ?? "",
    ipHash: item.ipHash ?? "",
    userHash: item.userHash ?? "",
    createdAt: item.createdAt.toISOString()
  }));

  return new Response(toCsv(HEADERS, rows), {
    status: 200,
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": `attachment; filename="consent-export.csv"`
    }
  });
}
