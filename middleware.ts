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

const logPagesArray = ["/login", "register"];

export default async function middleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const cspHeader = `
  default-src 'self';
  script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
  style-src 'self' 'nonce-${nonce}' fonts.googleapis.com;
  font-src 'self' fonts.gstatic.com;
  img-src 'self' data:;
  connect-src 'self' https://stingray-app-69yxe.ondigitalocean.app http://localhost:8000;
  base-uri 'self';
  object-src 'none';
`;
  const contentSecurityPolicyHeaderValue = cspHeader
    .replace(/\s{2,}/g, " ")
    .trim();

  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const decodedAccessToken = JwtService.getInstance().decodeJwt(
    accessToken ? accessToken : null
  );
  const url = request.nextUrl.clone();
  const isLogPage = logPagesArray.includes(url.pathname);
  const isGetMethod = request.method === "GET";

  const isLoggedIn =
    accessToken && !JwtService.getInstance().isTokenExpired(decodedAccessToken);
  const response = NextResponse.next();
  response.headers.set("x-nonce", nonce);
  response.headers.set(
    "Content-Security-Policy",
    contentSecurityPolicyHeaderValue
  );
  if (isGetMethod) {
    if (isLoggedIn && isLogPage) {
      return NextResponse.redirect(new URL("/profile", request.url));
    }

    if (!isLoggedIn && privatePages.includes(url.pathname)) {
      return NextResponse.redirect(new URL("/transition", request.url));
    }

    if (!accessToken && isLogPage && !refreshToken) {
      return response;
    }

    // Redirect to login page if no accessToken or refreshToken found
    if (!accessToken && !refreshToken && !isLogPage) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: ["/", "/login", "/register", "/private-space", "/profile"],
};
