import { NextResponse } from "next/server";

const PUBLIC_ROUTES = ["/auth", "/about", "/contact"];

// Middleware
export function middleware(request) {
  const cookie = request.cookies.get("sb-access-token");
  const url = request.nextUrl.pathname;

  const isPublicRoute = PUBLIC_ROUTES.includes(url);

  if (isPublicRoute && cookie) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!isPublicRoute && !cookie) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  return NextResponse.next();
}
