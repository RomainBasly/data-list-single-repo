import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import * as fakeDataModule from "../../infrastructure/fakeData/employees.json";
import { inject, injectable } from "tsyringe";
import { AuthService } from "../../domain/authentication/services";

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

const fakeUsers = (fakeDataModule as any).default as any[];
const fakeUsersDB = {
  users: fakeUsers || [],
  setUsers: function (data: any) {
    this.users = data;
  },
};

@injectable()
export class AppRefreshTokenController {
  constructor(@inject(AuthService) private readonly userService: AuthService) {}
  async handleRefreshToken(req: Request, res: Response) {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    const foundUser = await this.userService.handleRefreshToken(refreshToken);

    if (!refreshTokenSecret) throw new Error("no refreshToken in middleware");
    if (!foundUser) return res.sendStatus(403);
    jwt.verify(
      refreshToken,
      refreshTokenSecret,
      (err: jwt.VerifyErrors | null, decoded: string | jwt.JwtPayload | undefined) => {
        if (err) {
          console.log("error", err);
          return res.sendStatus(403);
        }
        const decodedPayload = decoded as JwtPayload; // force type otherwise TS does not know that email exists in payload
        if (!decodedPayload.email || foundUser.email !== decodedPayload.email) return res.sendStatus(403);
        if (!accessTokenSecret) throw new Error("no accessToken accessible in middleware (handleRefreshToken)");
        const roles = foundUser.roles;
        const accessToken = jwt.sign({ UserInfo: { email: decodedPayload.email, roles } }, accessTokenSecret, {
          expiresIn: "3600s",
        });
        res.json({ accessToken });
      }
    );
  }
}
