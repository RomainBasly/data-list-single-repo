import jwt from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { RoleAssignments, Roles } from "../../common/types/api";
import { ErrorMessages, NoPreexistingRefreshToken, UserDoNotExists } from "../common/errors";
import bcrypt from "bcrypt";
import { AppUserRepository } from "../../infrastructure/database/repositories/AppUserRepository";
import { AppRefreshTokenRepository } from "../../infrastructure/database/repositories/AppRefreshTokenRepository";
import { User } from "../user/types";

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

  public async hashPassword(password: string) {
    const salt = bcrypt.genSaltSync(10);
    return await bcrypt.hash(password, salt);
  }

  public async checkCredentials(enteredPassword: string, passwordFromDB: string): Promise<boolean> {
    return await bcrypt.compare(enteredPassword, passwordFromDB);
  }
}
