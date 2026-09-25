import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySession, SESSION_COOKIE_NAME } from "@/lib/auth";

// Routes that require authentication
const protectedRoutes = ["/profile", "/checkout"];
const adminRoutes = ["/admin"];

// Routes only accessible to logged-out users
const authRoutes = ["/account/login", "/account/signup", "/login", "/signup"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const session = sessionCookie ? await verifySession(sessionCookie) : null;
  const isAuthenticated = !!session?.userId;

  const isAdminRoute = adminRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
  const isAdminLogin = pathname === "/admin/login";

  if (isAdminRoute && !isAdminLogin) {
    if (!isAuthenticated || session?.role !== "admin") {
      const loginUrl = new URL("/admin/login", request.nextUrl);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 1. Check if user is trying to access a protected route
  const isProtected = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (isProtected && !isAuthenticated) {
    const loginUrl = new URL("/account/login", request.nextUrl);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 2. Check if authenticated user is trying to visit login/signup
  const isAuthRoute = authRoutes.some((route) => pathname === route);
  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/profile", request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/profile/:path*",
    "/profile",
    "/checkout",
    "/account/login",
    "/account/signup",
    "/login",
    "/signup",
    "/admin",
    "/admin/:path*",
  ],
};

