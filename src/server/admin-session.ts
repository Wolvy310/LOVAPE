import { createHash, randomBytes, timingSafeEqual } from "node:crypto";

import type { AdminSession } from "@prisma/client";

import {
  createSignedAdminSessionCookieValue,
  hashAdminSessionToken,
  parseAndVerifyAdminSessionCookie
} from "@/lib/admin-session-token";
import {
  ADMIN_SESSION_COOKIE_NAME,
  DEFAULT_ADMIN_SESSION_TTL_HOURS
} from "@/lib/admin-session-constants";
import { prisma } from "@/server/db";

const SESSION_REFRESH_INTERVAL_MS = 5 * 60 * 1000;

export interface AdminSessionContext {
  sessionId: string;
  expiresAt: Date;
}

function hashIpAddress(ipAddress: string): string {
  return createHash("sha256").update(ipAddress).digest("hex");
}

function safeEqual(left: string, right: string): boolean {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return timingSafeEqual(leftBuffer, rightBuffer);
}

function getSessionSecret(): string | null {
  const secret = process.env.SESSION_SECRET?.trim();
  if (!secret || secret.length < 32) {
    return null;
  }
  return secret;
}

function getConfiguredAdminPassword(): string | null {
  const password = process.env.ADMIN_PASSWORD?.trim();
  return password && password.length > 0 ? password : null;
}

function parseSessionTtlHours(): number {
  const raw = process.env.ADMIN_SESSION_TTL_HOURS?.trim();
  const parsed = raw ? Number.parseInt(raw, 10) : DEFAULT_ADMIN_SESSION_TTL_HOURS;

  if (!Number.isFinite(parsed)) {
    return DEFAULT_ADMIN_SESSION_TTL_HOURS;
  }

  return Math.min(168, Math.max(1, parsed));
}

function extractCookieValue(cookieHeader: string | null, name: string): string | undefined {
  if (!cookieHeader) return undefined;

  const prefix = `${name}=`;
  for (const part of cookieHeader.split(";")) {
    const trimmed = part.trim();
    if (trimmed.startsWith(prefix)) {
      return trimmed.slice(prefix.length);
    }
  }

  return undefined;
}

function getRequestUserAgent(request: Request): string | null {
  const userAgent = request.headers.get("user-agent")?.trim();
  return userAgent && userAgent.length > 0 ? userAgent : null;
}

function getRequestIpHash(request: Request): string | null {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  if (forwardedFor) {
    return hashIpAddress(forwardedFor);
  }

  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) {
    return hashIpAddress(realIp);
  }

  return null;
}

function shouldRefreshSession(session: AdminSession, now: Date): boolean {
  if (!session.lastSeenAt) {
    return true;
  }

  const elapsed = now.getTime() - session.lastSeenAt.getTime();
  return elapsed >= SESSION_REFRESH_INTERVAL_MS;
}

async function touchSessionIfNeeded(session: AdminSession, now: Date): Promise<void> {
  if (!shouldRefreshSession(session, now)) {
    return;
  }

  await prisma.adminSession.update({
    where: { id: session.id },
    data: { lastSeenAt: now }
  });
}

function buildSessionExpiry(now = new Date()): Date {
  return new Date(now.getTime() + parseSessionTtlHours() * 60 * 60 * 1000);
}

export async function getAdminSessionFromCookieValue(
  cookieValue: string | undefined,
  now = new Date()
): Promise<AdminSessionContext | null> {
  const secret = getSessionSecret();
  if (!secret) {
    return null;
  }

  const parsed = parseAndVerifyAdminSessionCookie(cookieValue, secret, now);
  if (!parsed) {
    return null;
  }

  const tokenHash = hashAdminSessionToken(parsed.token);
  const session = await prisma.adminSession.findUnique({
    where: { tokenHash }
  });

  if (!session) {
    return null;
  }

  if (session.expiresAt.getTime() <= now.getTime()) {
    await prisma.adminSession.deleteMany({ where: { tokenHash } });
    return null;
  }

  await touchSessionIfNeeded(session, now);

  return {
    sessionId: session.id,
    expiresAt: session.expiresAt
  };
}

export async function getAdminSessionFromRequest(request: Request): Promise<AdminSessionContext | null> {
  const cookieValue = extractCookieValue(request.headers.get("cookie"), ADMIN_SESSION_COOKIE_NAME);
  return getAdminSessionFromCookieValue(cookieValue);
}

export async function createAdminSessionFromPassword(
  request: Request,
  rawPassword: string
): Promise<{ cookieValue: string; expiresAt: Date } | null> {
  const configuredAdminPassword = getConfiguredAdminPassword();
  const secret = getSessionSecret();
  if (!configuredAdminPassword || !secret) {
    throw new Error("Admin auth misconfigured. Missing ADMIN_PASSWORD or SESSION_SECRET.");
  }

  const providedPassword = rawPassword.trim();
  if (!providedPassword || !safeEqual(providedPassword, configuredAdminPassword)) {
    return null;
  }

  const now = new Date();
  const expiresAt = buildSessionExpiry(now);
  const token = randomBytes(32).toString("base64url");
  const tokenHash = hashAdminSessionToken(token);

  await prisma.adminSession.deleteMany({
    where: {
      expiresAt: { lt: now }
    }
  });

  await prisma.adminSession.create({
    data: {
      tokenHash,
      expiresAt,
      lastSeenAt: now,
      userAgent: getRequestUserAgent(request),
      ipHash: getRequestIpHash(request)
    }
  });

  return {
    cookieValue: createSignedAdminSessionCookieValue(token, expiresAt, secret),
    expiresAt
  };
}

export async function revokeAdminSessionFromRequest(request: Request): Promise<void> {
  const secret = getSessionSecret();
  if (!secret) {
    return;
  }

  const cookieValue = extractCookieValue(request.headers.get("cookie"), ADMIN_SESSION_COOKIE_NAME);
  const parsed = parseAndVerifyAdminSessionCookie(cookieValue, secret);
  if (!parsed) {
    return;
  }

  const tokenHash = hashAdminSessionToken(parsed.token);
  await prisma.adminSession.deleteMany({
    where: { tokenHash }
  });
}

export function createAdminSessionCookie(cookieValue: string, expiresAt: Date): {
  name: string;
  value: string;
  httpOnly: true;
  secure: boolean;
  sameSite: "lax";
  path: "/";
  expires: Date;
} {
  return {
    name: ADMIN_SESSION_COOKIE_NAME,
    value: cookieValue,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt
  };
}

export function createAdminSessionClearCookie(): {
  name: string;
  value: string;
  httpOnly: true;
  secure: boolean;
  sameSite: "lax";
  path: "/";
  expires: Date;
  maxAge: 0;
} {
  return {
    name: ADMIN_SESSION_COOKIE_NAME,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(0),
    maxAge: 0
  };
}
