import CspService from "@/Services/cspServices";
import JwtService from "@/Services/jwtService";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// TODO : use jose.verify to check the validity of the accessToken inside the middleware and see if everything still works

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
  const isRootPage = url.pathname === "/";

  const isLoggedIn =
    accessToken && !JwtService.getInstance().isTokenExpired(decodedAccessToken);
  const response = NextResponse.next();
  response.headers.set("x-nonce", nonce);
  response.headers.set(
    "Content-Security-Policy",
    contentSecurityPolicyHeaderValue
  );

  // Redirect when I hit the / page to redirect to home and check in the same time if connected
  if (isRootPage) {
    if (isLoggedIn && refreshToken) {
      return NextResponse.redirect(new URL("/home", request.url));
    } else if (refreshToken && !isLoggedIn) {
      // let the transition page make the call and retrive new accessToken
      console.log(
        "je passe par là refreshToken && !isLoggedIn",
        accessToken &&
          !JwtService.getInstance().isTokenExpired(decodedAccessToken)
      );
      return NextResponse.redirect(new URL("/transition", request.url));
    } else {
      console.log("je passe par ici dans le else", refreshToken, isLoggedIn);
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // if it faces a post method, do not alter it (otherwise will get a 307 on a form posting)
  if (isPostMethod) {
    return NextResponse.next();
  }

  if (isGetMethod) {
    if (isLoggedIn && isLogPage) {
      return NextResponse.redirect(new URL("/home", request.url));
    }

    if (!isLoggedIn && privatePages.includes(url.pathname)) {
      console.log(
        "je passe ici !isLoggedIn && privatePages.includes(url.pathname)",
        accessToken
      );
      return NextResponse.redirect(new URL("/transition", request.url));
    }

    if (!accessToken && isLogPage && !refreshToken) {
      return response;
    }

    // Redirect to login page if no accessToken or refreshToken found
    if (!accessToken && !refreshToken && !isLogPage) {
      console.log(
        "je passe par ici !accessToken && !refreshToken && !isLogPage",
        accessToken,
        refreshToken,
        isLogPage
      );
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: ["/", "/login", "/register", "/home", "/lists/create-list"],
};
