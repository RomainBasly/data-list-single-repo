import jwt from "jsonwebtoken";
import { injectable } from "tsyringe";

@injectable()
export class AuthService {
  private readonly accessTokenSecret: string | undefined = process.env.ACCESS_TOKEN_SECRET;

  public generateAccessToken(payload: { email: string }): string | null {
    if (!this.accessTokenSecret) return null;
    return jwt.sign(payload, this.accessTokenSecret, { expiresIn: "300s" });
  }
  public generateRefreshToken(payload: { email: string }): string | null {
    if (!this.accessTokenSecret) return null;
    return jwt.sign(payload, this.accessTokenSecret, { expiresIn: "300s" });
  }

  // to implement and refacto methods from controller to service
  public createNewUser(email: string, password: string) {}
  public saveEmployeeToDatabase() {}
}
