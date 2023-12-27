import jwt from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { RoleAssignments, Roles } from "../../common/types/api";
import { AppUserRepository } from "../../infrastructure/database/repositories/AppUserRepository";
import { AppRefreshTokenRepository } from "../../infrastructure/database/repositories/AppRefreshTokenRepository";

export interface JwtPayloadAccessToken {
  userInfo: {
    email: string;
    roles: RoleAssignments;
  };
}

@injectable()
export class TokenService {
  private readonly accessTokenSecret: string | undefined = process.env.ACCESS_TOKEN_SECRET;
  private readonly refreshTokenSecret: string | undefined = process.env.REFRESH_TOKEN_SECRET;

  constructor(
    @inject(AppUserRepository) private readonly userRepository: AppUserRepository,
    @inject(AppRefreshTokenRepository) private readonly refreshTokenRepository: AppRefreshTokenRepository
  ) {}

  public generateAccessToken(payload: JwtPayloadAccessToken): string | null {
    if (!this.accessTokenSecret) return null;
    return jwt.sign(payload, this.accessTokenSecret, { expiresIn: "3600s" });
  }

  public generateRefreshToken(payload: { email: string }): string | null {
    if (!this.refreshTokenSecret) return null;
    return jwt.sign(payload, this.refreshTokenSecret, { expiresIn: "60d" });
  }
}
