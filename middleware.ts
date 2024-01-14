import AuthorizationService from "@/Services/authorizationService";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function middleware(request: NextRequest) {
  const token = request.cookies.get("jwt");
  const url = request.nextUrl.clone();

  if (
    url.pathname === "/" ||
    url.pathname === "/login" ||
    url.pathname === "/register"
  ) {
    if (token) {
      const decodedToken =
        AuthorizationService.getInstance().decodeToken(token);
      if (
        token &&
        AuthorizationService.getInstance().isTokenValid(decodedToken)
      ) {
        return NextResponse.redirect(new URL("/private-space", request.url));
      }
    }
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const decodedToken = AuthorizationService.getInstance().decodeToken(token);
  if (!decodedToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/private-space", "/login", "/register"],
};
