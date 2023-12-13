import AuthService from "@/Services/authService";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const excludedPaths = ["/login", "/register"];
  if (excludedPaths.some((path) => request.nextUrl.pathname.startsWith(path))) {
    return NextResponse.next();
  }

  const token = request.cookies.get("jwt");

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const decodedToken = AuthService.getInstance().decodeToken(token);
  if (!decodedToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/private-space"],
};
