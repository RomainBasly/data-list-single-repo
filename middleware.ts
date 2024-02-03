import CspService from "@/Services/cspServices";
import JwtService from "@/Services/jwtService";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const privatePages = [
  "/",
  "/home",
  "/profile",
  "/create-list",
  "/list-page1",
  "/list-page2",
];

const logPagesArray = ["/login", "/register"];

export default async function middleware(request: NextRequest) {
  const { nonce, contentSecurityPolicyHeaderValue } =
    CspService.getInstance().initiateCsp();

  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const decodedAccessToken = JwtService.getInstance().decodeJwt(
    accessToken ? accessToken : null
  );
  const url = request.nextUrl.clone();
  const isLogPage = logPagesArray.includes(url.pathname);
  const isGetMethod = request.method === "GET";
  const isPostMethod = request.method === "POST";

  const isLoggedIn =
    accessToken && !JwtService.getInstance().isTokenExpired(decodedAccessToken);
  const response = NextResponse.next();
  response.headers.set("x-nonce", nonce);
  console.log("response.headers", response.headers);
  response.headers.set(
    "Content-Security-Policy",
    contentSecurityPolicyHeaderValue
  );

  if (isPostMethod) {
    return NextResponse.next();
  }
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
  matcher: ["/", "/login", "/register", "/home", "/profile"],
};
