import AuthorizationService from "@/Services/authorizationService";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("jwt");
  console.log("token", token);
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const decodedToken = AuthorizationService.getInstance().decodeToken(token);
  if (!decodedToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/private-space", "/register"],
};
