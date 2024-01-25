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

// import JwtService from "@/Services/jwtService";
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export default async function middleware(request: NextRequest) {
//   const { pathname, origin } = request.nextUrl;
//   const accessToken = request.cookies.get("accessToken")?.value;
//   const refreshToken = request.cookies.get("refreshToken")?.value;
//   console.log("I enter here", pathname);
//   if (accessToken) {
//     const decoded = JwtService.getInstance().decodeJwt(accessToken);
//     if (JwtService.getInstance().isTokenExpired(decoded)) {
//       console.log("I enter here", pathname);
//       return NextResponse.redirect(`${origin}/transition`);
//     } else {
//       return NextResponse.redirect(`${origin}/private-space`);
//     }
//   } else if (!accessToken && refreshToken) {
//     console.log("I enter here", pathname);
//     return NextResponse.redirect(`${origin}/transition`);
//   } else {
//     return NextResponse.redirect(`${origin}/login`);
//   }
// }
