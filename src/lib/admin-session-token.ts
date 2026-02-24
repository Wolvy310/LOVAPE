import { createHash, createHmac, timingSafeEqual } from "node:crypto";

export interface ParsedCookieSession {
  token: string;
  expiresAt: Date;
}

export function hashAdminSessionToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

function safeEqual(left: string, right: string): boolean {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return timingSafeEqual(leftBuffer, rightBuffer);
}

function signSessionPayload(payload: string, secret: string): string {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

export function createSignedAdminSessionCookieValue(token: string, expiresAt: Date, secret: string): string {
  const expiresAtSeconds = Math.floor(expiresAt.getTime() / 1000);
  const payload = `${token}.${expiresAtSeconds}`;
  const signature = signSessionPayload(payload, secret);
  return `${payload}.${signature}`;
}

export function parseAndVerifyAdminSessionCookie(
  cookieValue: string | undefined,
  secret: string,
  now = new Date()
): ParsedCookieSession | null {
  if (!cookieValue) {
    return null;
  }

  const [token = "", expiresAtRaw = "", signature = "", ...rest] = cookieValue.split(".");
  if (rest.length > 0 || !token || !expiresAtRaw || !signature) {
    return null;
  }

  const expectedSignature = signSessionPayload(`${token}.${expiresAtRaw}`, secret);
  if (!safeEqual(signature, expectedSignature)) {
    return null;
  }

  const expiresAtSeconds = Number.parseInt(expiresAtRaw, 10);
  if (!Number.isFinite(expiresAtSeconds)) {
    return null;
  }

  const expiresAt = new Date(expiresAtSeconds * 1000);
  if (expiresAt.getTime() <= now.getTime()) {
    return null;
  }

  return { token, expiresAt };
}
