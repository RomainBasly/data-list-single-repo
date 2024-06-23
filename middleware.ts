import CspService from "@/Services/cspServices";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken");
  const { nonce, contentSecurityPolicyHeaderValue } =
    CspService.getInstance().initiateCsp();

  const publicPaths = ["/login", "/register", "/faq"];
  const url = request.nextUrl.clone();

  const response = NextResponse.next();
  response.headers.set("x-nonce", nonce);
  response.headers.set(
    "Content-Security-Policy",
    contentSecurityPolicyHeaderValue
  );

  if (publicPaths.includes(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  if (url.pathname === "/") {
    if (accessToken) {
      const url = request.nextUrl.clone();
      url.pathname = "/home";
      return NextResponse.redirect(url);
    } else {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  if (publicPaths.includes(url.pathname)) {
    return response;
  }

  if (!accessToken) {
    // prevent an infinite loop if backend is unreachable and you try to connect to it with a refreshToken
    if (url.searchParams.get("redirectAttempt") === "true") {
      return response;
    } else {
      url.pathname = "/login";
      url.searchParams.set("redirectAttempt", "true");
      return NextResponse.redirect(url);
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/",
    "/home",
    "/lists/create-list",
    "/profile",
    "/((?!api|_next/static|favicon.ico).*)",
  ],
  api: {
    bodyParser: true,
  },
};
