import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import * as fakeDataModule from "../../../infrastructure/fakeData/employees.json";
import { injectable } from "tsyringe";

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
  handleRefreshToken(req: Request, res: Response) {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    console.log("cookies", cookies.jwt);
    const refreshToken = cookies.jwt;

    const foundUser = fakeUsersDB.users.find((person) => person.refreshToken === refreshToken);

    if (!refreshTokenSecret) throw new Error("no refreshToken in middleware");
    if (!foundUser) return res.sendStatus(403);
    jwt.verify(
      refreshToken,
      refreshTokenSecret,
      (err: jwt.VerifyErrors | null, decoded: string | jwt.JwtPayload | undefined) => {
        if (err) {
          console.log("error dude", err);
          return res.sendStatus(403);
        }
        const decodedPayload = decoded as JwtPayload; // force type otherwise TS does not know that email exists in payload
        if (!decodedPayload.email || foundUser.email !== decodedPayload.email) return res.sendStatus(403);
        if (!accessTokenSecret) throw new Error("no accessToken accessible in middleware (handleRefreshToken)");
        const accessToken = jwt.sign({ email: decodedPayload.email }, accessTokenSecret, {
          expiresIn: "30s",
        });
        res.json({ accessToken });
      }
    );
  }
}
