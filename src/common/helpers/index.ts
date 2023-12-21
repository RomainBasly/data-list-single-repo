import jwt, { JwtPayload } from "jsonwebtoken";
import { ErrorMessages, JWTError } from "../../domain/common/errors";
import { Request, Response } from "express";

export function verifyJwt(token: string, secret: string): Promise<JwtPayload> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) reject(new JWTError(ErrorMessages.JWT_ERROR));
      else resolve(decoded as JwtPayload);
    });
  });
}

export function cookieHandler(req: Request, res: Response, refreshToken: string) {
  return res.cookie("jwt", refreshToken, {
    httpOnly: true,
    sameSite: "none",
    secure: true, // in dev mode use false
    maxAge: 24 * 60 * 60 * 1000,
  });
}
