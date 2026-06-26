import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Extract isLoggedIn cookie
  const isLoggedIn = request.cookies.get("isLoggedIn")?.value === "true";

  // If trying to access dashboard and not logged in, redirect to login page
  if (pathname.startsWith("/dashboard") && !isLoggedIn) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // If already logged in and visiting login page, redirect to dashboard
  if (pathname === "/login" && isLoggedIn) {
    const dashboardUrl = new URL("/dashboard", request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

// Config matches dashboard page, all nested dashboard sub-pages, and login page
export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
