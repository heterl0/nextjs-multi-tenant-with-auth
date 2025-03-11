import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { domain } from "@/lib/env";

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || "";
  const url = request.nextUrl.clone();
  const path = url.pathname;
  const params = url.searchParams;
  const cookieParam = params.get("cookie");

  // Check if it's a tenant subdomain
  const tenantSlug = hostname.split(".")[0];

  // If it's localhost without subdomain, redirect to login.localhost:3000
  if (hostname === domain || hostname === domain.split(":")[0]) {
    return NextResponse.redirect(new URL(`http://login.${domain}`));
  }

  // If it's login subdomain, allow access to login page
  if (tenantSlug === "login") {
    if (path !== "/" && path !== "/api/login") {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  if (cookieParam) {
    const response = NextResponse.redirect(
      new URL(`http://${tenantSlug}.${domain}`, request.url)
    );
    response.cookies.set("userId", cookieParam, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });
    return response;
  }

  // For tenant subdomains, check if user is authenticated
  const userId = request.cookies.get("userId")?.value;

  if (!userId && tenantSlug !== "login") {
    return NextResponse.redirect(
      new URL(`http://login.${domain}/`, request.url)
    );
  }

  if (url.pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  url.pathname = `/${tenantSlug}${url.pathname}`;

  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
