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
    refreshToken: string,
    refreshTokenSecret: string,
    accessTokenSecret: string,
    foundUser: User
  ): Promise<string> {
    const decodedPayload = await verifyJwt(refreshToken, refreshTokenSecret);
    if (!decodedPayload.email || foundUser.email !== decodedPayload.email) {
      throw new ForbiddenError(ErrorMessages.FORBIDDEN_ERROR);
    }
    if (!accessTokenSecret) {
      throw new accessTokenError(ErrorMessages.ACCESSTOKEN_ERROR);
    }
    const { email } = foundUser;
    const accessToken = this.tokenService.generateRefreshToken({ email });
    if (!accessToken) {
      throw new FailToGenerateTokens(ErrorMessages.FAIL_TO_GENERATE_TOKENS);
    }

    await this.userRepository.updateRefreshToken(accessToken, email);
    return accessToken;
  }
}
