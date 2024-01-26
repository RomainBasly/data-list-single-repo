import JwtService from "@/Services/jwtService";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const decodedAccessToken = JwtService.getInstance().decodeJwt(
    accessToken ? accessToken : null
  );
  const url = request.nextUrl.clone();

  if (
    accessToken &&
    !JwtService.getInstance().isTokenExpired(decodedAccessToken) &&
    url.pathname !== "/private-space"
  ) {
    return NextResponse.redirect(new URL("/private-space", request.url));
  }

  if (
    !accessToken ||
    JwtService.getInstance().isTokenExpired(decodedAccessToken)
  ) {
    if (url.pathname !== "/login" && url.pathname !== "/register") {
      return NextResponse.redirect(new URL("/transition", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/private-space", "/login", "/register"],
};
