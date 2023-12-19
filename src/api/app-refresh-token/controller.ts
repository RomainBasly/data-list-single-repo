import { Request, Response, NextFunction } from "express";
import { inject, injectable } from "tsyringe";
import { TokenService } from "../../domain/token/services";
import { RefreshTokenService } from "../../domain/refreshToken/services";
import { cookieHandler } from "../../common/helpers";
import { AppUserRepository } from "../../infrastructure/database/repositories/AppUserRepository";

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
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshTokenInCookie = cookies.jwt;
    if (!refreshTokenSecret) throw new Error("no refreshToken in middleware");
    if (!accessTokenSecret) throw new Error("no refreshToken in middleware");

    try {
      const foundUser = await this.refreshTokenService.getUserByRefreshToken(refreshTokenInCookie);
      if (!foundUser) return res.json(401);
      const formerRefreshToken = await this.refreshTokenService.handleTokenRefresh(
        refreshTokenInCookie,
        refreshTokenSecret,
        accessTokenSecret,
        foundUser
      );
      if (formerRefreshToken) {
        const newAccessToken = this.tokenService.generateAccessToken({
          userInfo: { email: foundUser.email, roles: foundUser.roles },
        });
        const newRefreshToken = this.tokenService.generateRefreshToken({ email: foundUser.email });
        if (newRefreshToken) {
          cookieHandler(req, res, newRefreshToken);
          console.log(newRefreshToken);
          await this.userRepository.updateRefreshToken(newRefreshToken, foundUser.email);
        }
        res.json({ accessToken: newAccessToken });
      }
    } catch (error) {
      next(error);
    }
  }
}
