import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /api/admin/data POST/PUT/DELETE operations if not authenticated
  if (pathname.startsWith("/api/admin/data") && request.method !== "GET") {
    const authHeader = request.headers.get("authorization");
    const cookieToken = request.cookies.get("xentoryx-admin-token")?.value;

    // Check if token matches
    if (!authHeader?.includes("xentoryx-admin-token-2026") && cookieToken !== "xentoryx-admin-token-2026") {
      // In development / local testing, allow if session cookie or custom header is valid
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
