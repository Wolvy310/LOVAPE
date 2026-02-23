import { NextResponse } from "next/server";

export function GET(request: Request): NextResponse {
  return NextResponse.json(
    {
      status: "ok",
      service: "lovape-web",
      requestId: request.headers.get("x-request-id") ?? "missing",
      timestamp: new Date().toISOString()
    },
    { status: 200 }
  );
}

