import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'tsyringe';
import { TokenService } from '../../domain/jwtToken/services';
import { RefreshTokenService } from '../../domain/refreshToken/services';
import { AppUserRepository } from '../../infrastructure/database/repositories/AppUserRepository';
import { ErrorMessages } from '../../domain/common/errors';
import { retrieveTokenFromCookie } from '../../common/helpers';
import cookie from 'cookie';

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

@injectable()
export class AppRefreshTokenController {
  constructor(
    @inject(RefreshTokenService) private readonly refreshTokenService: RefreshTokenService,
    @inject(TokenService) private readonly tokenService: TokenService,
    @inject(AppUserRepository) private readonly userRepository: AppUserRepository
  ) {}
  async generateNewAccessToken(req: Request, res: Response, next: NextFunction) {
    const cookieHeader = req.headers.cookie;

    if (!cookieHeader) {
      return res.status(401).json({ message: 'Unauthorized 1' });
    }
    const cookieRefreshToken = retrieveTokenFromCookie(cookieHeader, 'refreshToken');
    if (!cookieRefreshToken) {
      return res.status(401).json({ message: 'Unauthorized 2' });
    }
    const refreshToken = cookieRefreshToken.split('=')[1];

    if (!refreshTokenSecret) throw new Error('no refreshTokenSecret in middleware');
    if (!accessTokenSecret) throw new Error('no accessTokenSecret in middleware');
    try {
      const foundUser = await this.refreshTokenService.getUserByRefreshToken(refreshToken);
      if (!foundUser) return res.status(401).json({ error: ErrorMessages.UNAUTHORIZED });
      const { newAccessToken } = await this.refreshTokenService.handleTokenRefresh(
        refreshToken,
        refreshTokenSecret,
        accessTokenSecret,
        foundUser
      );
      res.json({ accessToken: newAccessToken });
    } catch (error) {
      next(error);
    }
  }
}
