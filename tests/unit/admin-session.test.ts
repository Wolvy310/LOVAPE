import { describe, expect, it } from "vitest";

import {
  createSignedAdminSessionCookieValue,
  hashAdminSessionToken,
  parseAndVerifyAdminSessionCookie
} from "@/lib/admin-session-token";

const SECRET = "this_is_a_test_secret_with_enough_length_12345";

describe("admin session helpers", () => {
  it("creates and verifies a signed admin session cookie", () => {
    const expiresAt = new Date("2030-01-01T00:00:00.000Z");
    const cookieValue = createSignedAdminSessionCookieValue("token-123", expiresAt, SECRET);
    const parsed = parseAndVerifyAdminSessionCookie(cookieValue, SECRET, new Date("2029-12-31T00:00:00.000Z"));

    expect(parsed).not.toBeNull();
    expect(parsed?.token).toBe("token-123");
    expect(parsed?.expiresAt.toISOString()).toBe("2030-01-01T00:00:00.000Z");
  });

  it("rejects a cookie with invalid signature", () => {
    const expiresAt = new Date("2030-01-01T00:00:00.000Z");
    const cookieValue = createSignedAdminSessionCookieValue("token-abc", expiresAt, SECRET);
    const tampered = `${cookieValue}tamper`;

    const parsed = parseAndVerifyAdminSessionCookie(tampered, SECRET, new Date("2029-12-31T00:00:00.000Z"));
    expect(parsed).toBeNull();
  });

  it("rejects an expired cookie", () => {
    const expiresAt = new Date("2030-01-01T00:00:00.000Z");
    const cookieValue = createSignedAdminSessionCookieValue("token-expired", expiresAt, SECRET);

    const parsed = parseAndVerifyAdminSessionCookie(cookieValue, SECRET, new Date("2030-01-01T00:00:01.000Z"));
    expect(parsed).toBeNull();
  });

  it("hashes token values deterministically", () => {
    const left = hashAdminSessionToken("same-token");
    const right = hashAdminSessionToken("same-token");
    const other = hashAdminSessionToken("other-token");

    expect(left).toBe(right);
    expect(left).not.toBe(other);
  });
});
