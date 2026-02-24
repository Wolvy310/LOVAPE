import { NextResponse } from "next/server";

import {
  createAdminSessionClearCookie,
  revokeAdminSessionFromRequest
} from "@/server/admin-session";

export async function POST(request: Request): Promise<Response> {
  await revokeAdminSessionFromRequest(request);

  const response = NextResponse.json({ ok: true }, { status: 200 });
  response.cookies.set(createAdminSessionClearCookie());
  return response;
}
