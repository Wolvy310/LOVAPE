import { createHash } from "node:crypto";

import { ConsentDecision, ConsentScope } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  ANALYTICS_CONSENT_COOKIE_MAX_AGE_SECONDS,
  ANALYTICS_CONSENT_COOKIE_NAME,
  apiDecisionToAnalyticsConsentStatus
} from "@/lib/consent";
import { prisma } from "@/server/db";

const consentPayloadSchema = z.object({
  scope: z.literal("ANALYTICS"),
  decision: z.enum(["ACCEPTED", "REJECTED"]),
  pagePath: z.string().trim().min(1).max(500)
});

function sanitizePagePath(input: string): string {
  const trimmed = input.trim();
  if (!trimmed.startsWith("/")) {
    return "/";
  }

  return trimmed.slice(0, 500);
}

function hashIpAddress(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

function extractIpHash(request: Request): string | null {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  if (forwarded) {
    return hashIpAddress(forwarded);
  }

  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) {
    return hashIpAddress(realIp);
  }

  return null;
}

export async function POST(request: Request): Promise<Response> {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  const parsed = consentPayloadSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid consent payload." }, { status: 400 });
  }

  const requestId = request.headers.get("x-request-id") ?? crypto.randomUUID();
  const userAgent = request.headers.get("user-agent")?.trim() || null;
  const normalizedPath = sanitizePagePath(parsed.data.pagePath);

  await prisma.consentLog.create({
    data: {
      scope: ConsentScope.ANALYTICS,
      decision: parsed.data.decision === "ACCEPTED" ? ConsentDecision.ACCEPTED : ConsentDecision.REJECTED,
      pagePath: normalizedPath,
      requestId,
      userAgent,
      ipHash: extractIpHash(request),
      userHash: null
    }
  });

  const cookieStatus = apiDecisionToAnalyticsConsentStatus(parsed.data.decision);
  const response = NextResponse.json({
    ok: true,
    scope: parsed.data.scope,
    decision: parsed.data.decision
  });

  response.cookies.set({
    name: ANALYTICS_CONSENT_COOKIE_NAME,
    value: cookieStatus,
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: ANALYTICS_CONSENT_COOKIE_MAX_AGE_SECONDS
  });

  return response;
}
