import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'tsyringe';
import { TokenService } from '../../domain/jwtToken/services';
import { RefreshTokenService } from '../../domain/refreshToken/services';
//import { cookieHandler } from '../../common/helpers';
import { AppUserRepository } from '../../infrastructure/database/repositories/AppUserRepository';
import { ErrorMessages } from '../../domain/common/errors';

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

@injectable()
export class AppRefreshTokenController {
  constructor(
    @inject(RefreshTokenService) private readonly refreshTokenService: RefreshTokenService,
    @inject(TokenService) private readonly tokenService: TokenService,
    @inject(AppUserRepository) private readonly userRepository: AppUserRepository
  ) {}
  async handleRefreshToken(req: Request, res: Response, next: NextFunction) {
    console.log('I passed here');
    //const cookies = req.cookies;
    const authHeader = req.headers.authorization;
    console.log('authheader', authHeader);
    // console.log('cookies', cookies);
    if (!authHeader) return res.status(401).json({ error: 'Here is a problem of being Unauthorized' });
    //if (!cookies?.refreshToken) return res.status(401).json({ error: ErrorMessages.UNAUTHORIZED });
    //const refreshTokenInCookie = cookies.refreshToken;
    const token = authHeader.split(' ')[1];
    console.log('token in handleRefresh', token);
    if (!refreshTokenSecret) throw new Error('no refreshTokenSecret in middleware');
    if (!accessTokenSecret) throw new Error('no accessTokenSecret in middleware');

    try {
      const foundUser = await this.refreshTokenService.getUserByRefreshToken(token);
      if (!foundUser) return res.status(401).json({ error: ErrorMessages.UNAUTHORIZED });
      const { newAccessToken } = await this.refreshTokenService.handleTokenRefresh(
        token,
        refreshTokenSecret,
        accessTokenSecret,
        foundUser
      );
      //cookieHandler(req, res, newRefreshToken);
      res.json({ accessToken: newAccessToken });
    } catch (error) {
      next(error);
    }
  }
}
