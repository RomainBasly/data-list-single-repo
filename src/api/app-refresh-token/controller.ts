import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import * as fakeDataModule from "../../infrastructure/fakeData/employees.json";
import { inject, injectable } from "tsyringe";
import { AuthService } from "../../domain/authentication/services";
import { RefreshTokenService } from "../../domain/refreshToken/services";

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

@injectable()
export class AppRefreshTokenController {
  constructor(@inject(RefreshTokenService) private readonly refreshTokenService: RefreshTokenService) {}
  async handleRefreshToken(req: Request, res: Response, next: NextFunction) {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;
    if (!refreshTokenSecret) throw new Error("no refreshToken in middleware");
    if (!accessTokenSecret) throw new Error("no refreshToken in middleware");

    try {
      const foundUser = await this.refreshTokenService.getUser(refreshToken);
      if (!foundUser) return res.json(401);
      const accessToken = await this.refreshTokenService.verifyToken(
        refreshToken,
        refreshTokenSecret,
        accessTokenSecret,
        foundUser
      );
      res.json({ accessToken });
    } catch (error) {
      next(error);
    }
  }
}
