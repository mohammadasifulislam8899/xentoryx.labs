import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = request.headers.get("host") || "";

  // If host is asif.xentoryxlabs.site or asif.localhost, route root '/' directly to '/founder'
  if (
    (hostname.startsWith("asif.") || hostname.startsWith("founder.")) &&
    url.pathname === "/"
  ) {
    return NextResponse.rewrite(new URL("/founder", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - assets (public image files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|assets).*)",
  ],
};
