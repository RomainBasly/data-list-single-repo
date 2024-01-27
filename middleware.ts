import JwtService from "@/Services/jwtService";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const privatePages = [
  "/private-space",
  "/profile",
  "/create-list",
  "/list-page1",
  "/list-page2",
];

export default async function middleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const cspHeader = `
  default-src 'self';
  script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
  style-src 'self' 'nonce-${nonce}' fonts.googleapis.com;
  font-src 'self' fonts.gstatic.com;
  img-src 'self' data:;
  connect-src 'self' https://stingray-app-69yxe.ondigitalocean.app;
`;
  const contentSecurityPolicyHeaderValue = cspHeader
    .replace(/\s{2,}/g, " ")
    .trim();

  const accessToken = request.cookies.get("accessToken")?.value;
  const decodedAccessToken = JwtService.getInstance().decodeJwt(
    accessToken ? accessToken : null
  );
  const url = request.nextUrl.clone();
  const response = NextResponse.next();
  response.headers.set("x-nonce", nonce);
  response.headers.set(
    "Content-Security-Policy",
    contentSecurityPolicyHeaderValue
  );
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
    if (url.pathname !== "/login" && url.pathname !== "/register" && url.pathname !== "/transition") {
      return NextResponse.redirect(new URL("/transition", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: ["/**"],
};
