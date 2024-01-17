import AuthorizationService from "@/Services/authorizationService";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function middleware(request: NextRequest) {
  const refreshToken = request.cookies.get("refreshToken");
  const url = request.nextUrl.clone();

  const isValidToken = (token: string | RequestCookie) => {
    const decodedToken = AuthorizationService.getInstance().decodeToken(token);
    return (
      decodedToken &&
      AuthorizationService.getInstance().isTokenValid(decodedToken)
    );
  };

  if (
    (url.pathname === "/" ||
      url.pathname === "/login" ||
      url.pathname === "/register") &&
    refreshToken &&
    isValidToken(refreshToken)
  ) {
    return NextResponse.redirect(new URL("/private-space", request.url));
  }

  if (!refreshToken || !isValidToken(refreshToken)) {
    if (url.pathname !== "/login" && url.pathname !== "/register") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/private-space", "/login", "/register"],
};
