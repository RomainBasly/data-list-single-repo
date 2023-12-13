import jwt from "jsonwebtoken";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

export default class AuthService {
  public accessToken: string | null = null;
  private static instance: AuthService | null = null;
  private _isAuthenticated: boolean = false;
  private readonly secretKey: string;

  private constructor() {
    if (!process.env.SECRET_ACCES_TOKEN_KEY) {
      throw new Error("Environment variable SECRET_ACCES_TOKEN_KEY is missing");
    }
    this.secretKey = process.env.SECRET_ACCES_TOKEN_KEY;
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  public setToken(token: string) {}

  public isAuthenticated() {
    return this._isAuthenticated;
  }

  public logout() {
    this._isAuthenticated = false;
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
