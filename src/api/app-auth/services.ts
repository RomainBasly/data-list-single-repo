import jwt from "jsonwebtoken";
import { injectable } from "tsyringe";
import { RoleAssignments, Roles } from "../../common/types/api";

export interface JwtPayloadAccessToken {
  userInfo: {
    email: string;
    roles: RoleAssignments;
  };
}

@injectable()
export class AuthService {
  private readonly accessTokenSecret: string | undefined = process.env.ACCESS_TOKEN_SECRET;
  private readonly refreshTokenSecret: string | undefined = process.env.REFRESH_TOKEN_SECRET;

  public generateAccessToken(payload: JwtPayloadAccessToken): string | null {
    if (!this.accessTokenSecret) return null;
    return jwt.sign(payload, this.accessTokenSecret, { expiresIn: "3600s" });
  }

  public generateRefreshToken(payload: { email: string }): string | null {
    if (!this.refreshTokenSecret) return null;
    return jwt.sign(payload, this.refreshTokenSecret, { expiresIn: "60d" });
  }

  // to implement and refacto methods from controller to service
  public createNewUser(email: string, password: string) {}
  public saveEmployeeToDatabase() {}
}
