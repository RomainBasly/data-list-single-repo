import { AuthorizationApi } from "@/api/Back/AuthorizationApi";
import jwt, { JwtPayload } from "jsonwebtoken";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

export default class AuthorizationService {
  public accessToken: string | null = null;
  private static instance: AuthorizationService | null = null;
  private readonly secretKey: string;

  private constructor() {
    if (!process.env.ACCESS_TOKEN_SECRET) {
      throw new Error("Environment variable SECRET_ACCES_TOKEN_KEY is missing");
    }
    this.secretKey = process.env.ACCESS_TOKEN_SECRET;
  }

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
      return decoded || null;
    } catch (error) {
      return null;
    }
  }

  public isTokenValid(decodedToken: string | JwtPayload | null): boolean {
    const currentTimeInSeconds = Math.floor(Date.now() / 1000);

    if (typeof decodedToken === "string" || decodedToken === null) return false;

    const expirationTime = decodedToken.exp;
    if (typeof expirationTime !== "number") return false;

    if (
      typeof decodedToken === "object" &&
      decodedToken !== null &&
      "exp" in decodedToken
    ) {
      console.log(expirationTime > currentTimeInSeconds);
      return expirationTime > currentTimeInSeconds;
    }
    return false;
  }
}
