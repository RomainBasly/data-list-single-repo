import { AuthorizationApi } from "@/api/Back/AuthorizationApi";
import jwt from "jsonwebtoken";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

export default class AuthorizationService {
  public accessToken: string | null = null;
  private static instance: AuthorizationService | null = null;
  private readonly secretKey: string;

  private constructor() {
    if (!process.env.SECRET_ACCES_TOKEN_KEY) {
      throw new Error("Environment variable SECRET_ACCES_TOKEN_KEY is missing");
    }
    this.secretKey = process.env.SECRET_ACCES_TOKEN_KEY;
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
      console.log("Decoded JWT:", decoded);
      return decoded || null;
    } catch (error) {
      console.error("Invalid JWT", error);
      return null;
    }
  }

  public validateJWT(token: string | RequestCookie) {
    let tokenString = typeof token === "string" ? token : token.value;
    try {
      return jwt.verify(tokenString, this.secretKey);
    } catch (error) {
      console.error("JWT validation error:", error);
      return null;
    }
  }
}
