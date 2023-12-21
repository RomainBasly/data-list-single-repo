import { inject, injectable } from "tsyringe";
import { AppUserRepository } from "../../infrastructure/database/repositories/AppUserRepository";
import { IRefreshTokenService } from "./types";
import {
  ErrorMessages,
  FailToGenerateTokens,
  ForbiddenError,
  NoPreexistingRefreshToken,
  accessTokenError,
} from "../common/errors";
import { User } from "../user/types";
import { TokenService } from "../token/services";
import { verifyJwt } from "../../common/helpers";

@injectable()
export class RefreshTokenService implements IRefreshTokenService {
  constructor(
    @inject(AppUserRepository) private readonly userRepository: AppUserRepository,
    @inject(TokenService) private readonly tokenService: TokenService
  ) {}

  public async getUserByRefreshToken(token: string): Promise<User | null> {
    const foundUser = await this.userRepository.getUserByRefreshToken(token);
    if (!foundUser) throw new NoPreexistingRefreshToken(ErrorMessages.NO_EXISTING_REFRESH_TOKEN);
    return foundUser;
  }

  public async handleTokenRefresh(
    existingRefreshToken: string,
    refreshTokenSecret: string,
    accessTokenSecret: string,
    foundUser: User
  ): Promise<{ newAccessToken: string; newRefreshToken: string }> {
    const decodedPayload = await verifyJwt(existingRefreshToken, refreshTokenSecret);
    if (!decodedPayload.email || foundUser.email !== decodedPayload.email) {
      throw new ForbiddenError(ErrorMessages.FORBIDDEN_ERROR);
    }
    if (!accessTokenSecret) {
      throw new accessTokenError(ErrorMessages.ACCESSTOKEN_ERROR);
    }
    const { email } = foundUser;
    const refreshToken = this.tokenService.generateRefreshToken({ email });
    if (!refreshToken) {
      throw new FailToGenerateTokens(ErrorMessages.FAIL_TO_GENERATE_TOKENS);
    }
    await this.userRepository.updateRefreshToken(refreshToken, email);
    const accessToken = this.tokenService.generateAccessToken({
      userInfo: { email, roles: foundUser.roles },
    });
    if (!accessToken) {
      throw new FailToGenerateTokens(ErrorMessages.FAIL_TO_GENERATE_TOKENS);
    }
    return { newAccessToken: accessToken, newRefreshToken: refreshToken };
  }
}
