import AuthorizationService from "@/Services/authorizationService";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default async function middleware(request: NextRequest) {
  const token = request.cookies.get("refreshToken");
  const url = request.nextUrl.clone();

  async function isValidToken(token: string | RequestCookie) {
    const decodedToken = AuthorizationService.getInstance().decodeToken(token);
    let isTokenNotExpired =
      AuthorizationService.getInstance().isTokenNotExpired(decodedToken);

    if (!isTokenNotExpired) {
      const decodedToken = await AuthorizationService.getInstance().getNewAccessToken();
    }
    return decodedToken && isTokenNotExpired;
  }

  // Redirect to private space if the user is already authenticated and accessing login/register pages
  if (
    (url.pathname === "/" ||
      url.pathname === "/login" ||
      url.pathname === "/register") &&
    token &&
    (await isValidToken(token))
  ) {
    return NextResponse.redirect(new URL("/private-space", request.url));
  }

  // Redirect to login if the token is not valid or not present, except for login/register pages
  if (!token || !isValidToken(token)) {
    if (url.pathname !== "/login" && url.pathname !== "/register") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/private-space", "/login", "/register"],
};
