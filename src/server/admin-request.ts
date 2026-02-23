import { timingSafeEqual } from "node:crypto";

function safeEqual(left: string, right: string): boolean {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }
  return timingSafeEqual(leftBuffer, rightBuffer);
}

export function isAdminRequestAuthorized(request: Request): boolean {
  const configured = process.env.ADMIN_PASSWORD?.trim();
  if (!configured) return false;

  const provided = request.headers.get("x-admin-password")?.trim();
  if (!provided) return false;

  return safeEqual(provided, configured);
}

export function createAdminUnauthorizedResponse(): Response {
  return Response.json(
    {
      error: "Unauthorized admin request. Provide a valid x-admin-password header."
    },
    { status: 401 }
  );
}

