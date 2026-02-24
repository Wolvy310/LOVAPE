import { z } from "zod";
import { NextResponse } from "next/server";

import {
  createAdminSessionCookie,
  createAdminSessionFromPassword
} from "@/server/admin-session";

const loginPayloadSchema = z.object({
  password: z.string().trim().min(1).max(256)
});

export async function POST(request: Request): Promise<Response> {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  const parsed = loginPayloadSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid admin credentials payload." }, { status: 400 });
  }

  try {
    const session = await createAdminSessionFromPassword(request, parsed.data.password);
    if (!session) {
      return NextResponse.json({ error: "Connexion impossible. Verifiez vos informations." }, { status: 401 });
    }

    const response = NextResponse.json(
      {
        ok: true,
        expiresAt: session.expiresAt.toISOString()
      },
      { status: 200 }
    );
    response.cookies.set(createAdminSessionCookie(session.cookieValue, session.expiresAt));
    return response;
  } catch {
    return NextResponse.json({ error: "Admin auth is not configured." }, { status: 500 });
  }
}
