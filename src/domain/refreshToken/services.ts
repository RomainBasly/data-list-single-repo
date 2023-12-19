import { inject, injectable } from "tsyringe";
import { AppUserRepository } from "../../infrastructure/database/repositories/AppUserRepository";
import { IRefreshTokenService } from "./types";
import { ErrorMessages, ForbiddenError, JWTError, NoPreexistingRefreshToken, accessTokenError } from "../common/errors";
import { User } from "../user/types";
import jwt, { JwtPayload } from "jsonwebtoken";

@injectable()
export class RefreshTokenService implements IRefreshTokenService {
  constructor(@inject(AppUserRepository) private readonly userRepository: AppUserRepository) {}

  public async getUser(token: string): Promise<User | null> {
    const foundUser = await this.userRepository.getUserByRefreshToken(token);
    if (!foundUser) throw new NoPreexistingRefreshToken(ErrorMessages.NO_EXISTING_REFRESH_TOKEN);
    return foundUser;
  }

  public async verifyToken(
    refreshToken: string,
    refreshTokenSecret: string,
    accessTokenSecret: string,
    foundUser: User
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      jwt.verify(
        refreshToken,
        refreshTokenSecret,
        (err: jwt.VerifyErrors | null, decoded: string | jwt.JwtPayload | undefined) => {
          if (err) {
            reject(new JWTError(ErrorMessages.JWT_ERROR));
            return;
          }
          const decodedPayload = decoded as JwtPayload; // force type otherwise TS does not know that email exists in payload
          if (!decodedPayload.email || foundUser.email !== decodedPayload.email) {
            reject(new ForbiddenError(ErrorMessages.FORBIDDEN_ERROR));
            return;
          }
          if (!accessTokenSecret) {
            reject(new accessTokenError(ErrorMessages.ACCESSTOKEN_ERROR));
            return;
          }
          const roles = foundUser.roles;
          const accessToken = jwt.sign({ UserInfo: { email: decodedPayload.email, roles } }, accessTokenSecret, {
            expiresIn: "3600s",
          });
          resolve(accessToken);
        }
      );
    });
  }
}
