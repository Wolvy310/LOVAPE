import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { ADMIN_LOGIN_PATH, ADMIN_SESSION_COOKIE_NAME } from "@/lib/admin-session-constants";

const SECURITY_HEADERS: Record<string, string> = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "geolocation=(), microphone=(), camera=()"
};

function applySecurityHeaders(response: NextResponse, requestId: string): NextResponse {
  response.headers.set("x-request-id", requestId);
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    response.headers.set(key, value);
  }

  return response;
}

function isProtectedAdminUiPath(pathname: string): boolean {
  if (pathname === ADMIN_LOGIN_PATH) {
    return false;
  }

  return pathname === "/admin" || pathname.startsWith("/admin/");
}

function isProtectedAdminApiPath(pathname: string): boolean {
  if (pathname === "/api/admin/login") {
    return false;
  }

  return pathname.startsWith("/api/admin/");
}

export function middleware(request: NextRequest): NextResponse {
  const requestHeaders = new Headers(request.headers);
  const requestId = requestHeaders.get("x-request-id") ?? crypto.randomUUID();
  const pathname = request.nextUrl.pathname;
  const hasAdminCookie = Boolean(request.cookies.get(ADMIN_SESSION_COOKIE_NAME)?.value?.trim());

  requestHeaders.set("x-request-id", requestId);

  if (isProtectedAdminUiPath(pathname) && !hasAdminCookie) {
    const loginUrl = new URL(ADMIN_LOGIN_PATH, request.url);
    const nextPath = `${request.nextUrl.pathname}${request.nextUrl.search}`;
    loginUrl.searchParams.set("next", nextPath);
    return applySecurityHeaders(NextResponse.redirect(loginUrl), requestId);
  }

  if (isProtectedAdminApiPath(pathname) && !hasAdminCookie) {
    return applySecurityHeaders(
      NextResponse.json({ error: "Unauthorized admin request. Please log in." }, { status: 401 }),
      requestId
    );
  }

  const response = NextResponse.next({
    request: {
      headers: requestHeaders
    }
  });

  return applySecurityHeaders(response, requestId);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};
