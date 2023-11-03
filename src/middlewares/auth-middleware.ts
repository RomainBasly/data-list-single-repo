import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import * as fakeDataModule from "../../infrastructure/fakeData/employees.json";

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

interface IRequest extends Request {
  email?: string;
}

export const verifyToken = (req: IRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.sendStatus(401);
  const token = authHeader.split(" ")[1];
  if (!accessTokenSecret) throw new Error("no accessToken accessible in middleware (verifyToken)");
  jwt.verify(token, accessTokenSecret, (err, decoded) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.email = (decoded as JwtPayload).email;
    next();
  });
};
