import { AuthorizationApi } from "@/api/Back/AuthorizationApi";
import jwt, { JwtPayload } from "jsonwebtoken";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

export default class AuthorizationService {
  public accessToken: string | null = null;
  private static instance: AuthorizationService | null = null;

  private constructor() {}

  public static getInstance(): AuthorizationService {
    if (!AuthorizationService.instance) {
      AuthorizationService.instance = new AuthorizationService();
    }
    return AuthorizationService.instance;
  }

  public decodeToken(token: string | RequestCookie) {
    let tokenString = typeof token === "string" ? token : token.value;

    try {
      const decoded = jwt.decode(tokenString);
      // verify here the token as well as decode it and rename the function
      return decoded ?? null;
    } catch (error) {
      return null;
    }
  }

  public isTokenNotExpired(decodedToken: string | JwtPayload | null): boolean {
    const currentTimeInSeconds = Math.floor(Date.now() / 1000);

    if (typeof decodedToken === "string" || decodedToken === null) {
      return false;
    }

    const expirationTime = decodedToken.exp;
    if (typeof expirationTime !== "number") {
      return false;
    }

    if (
      typeof decodedToken === "object" &&
      decodedToken !== null &&
      "exp" in decodedToken
    ) {
      return expirationTime > currentTimeInSeconds;
    }

    return false;
  }

  public async getNewAccessToken() {
    const newAccessToken =
      await AuthorizationApi.getInstance().getNewAccessToken();
    return newAccessToken;
  }
}
