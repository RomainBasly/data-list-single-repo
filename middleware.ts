import AuthorizationService from "@/Services/authorizationService";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import cookie from "cookie"

export default function middleware(request: NextRequest) {
  //const refreshToken = request.cookies.get("refreshToken");
  const cookies = cookie.parse(request.headers.get('cookie') || '');
  const refreshToken = cookies.refreshToken;
  console.log("refreshToken", refreshToken);
  const url = request.nextUrl.clone();

  const isValidToken = (token: string | undefined) => {
    if (typeof token === "undefined") {
      return false;
    }
    const decodedToken = AuthorizationService.getInstance().decodeToken(token);
    return (
      decodedToken &&
      AuthorizationService.getInstance().isTokenValid(decodedToken)
    );
  };

  // Redirect to private space if the user is already authenticated and accessing login/register pages
  if (
    (url.pathname === "/" ||
      url.pathname === "/login" ||
      url.pathname === "/register") &&
    refreshToken &&
    isValidToken(refreshToken)
  ) {
    return NextResponse.redirect(new URL("/private-space", request.url));
  }

  // Redirect to login if the token is not valid or not present, except for login/register pages
  if (!refreshToken || !isValidToken(refreshToken)) {
    console.log("refreshToken", !refreshToken);
    console.log("!isValid", !isValidToken(refreshToken));
    if (url.pathname !== "/login" && url.pathname !== "/register") {
      console.log("I passed Here", refreshToken);
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/private-space", "/login", "/register"],
};
