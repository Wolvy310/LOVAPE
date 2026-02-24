import { getAdminSessionFromRequest } from "@/server/admin-session";

export async function isAdminRequestAuthorized(request: Request): Promise<boolean> {
  const session = await getAdminSessionFromRequest(request);
  return Boolean(session);
}

export function createAdminUnauthorizedResponse(): Response {
  return Response.json(
    {
      error: "Unauthorized admin request. Please log in to an admin session."
    },
    { status: 401 }
  );
}
