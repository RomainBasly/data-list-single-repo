import jwt, { JwtPayload } from 'jsonwebtoken';
import { ErrorMessages, JWTError } from '../../domain/common/errors';
import { Request, Response } from 'express';

export function verifyJwt(token: string, secret: string): Promise<JwtPayload> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) reject(new JWTError(ErrorMessages.JWT_ERROR));
      else resolve(decoded as JwtPayload);
    });
  });
}

export function cookieHandler(req: Request, res: Response, refreshToken: string) {
  return res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    sameSite: 'none',
    secure: false, // in dev mode use false
    maxAge: 24 * 3600 * 30 * 1000,
    path: '/',
  });
}

export function generateRandomNumber(): number {
  const array: Array<Number> = [];
  for (let i = 0; i < 7; i++) {
    const randomNumber = Math.floor(Math.random() * 10);
    array.push(randomNumber);
  }
  const result = parseInt(array.join(''));
  return result;
}

export function getFromJWTToken(req: Request, tokenType: string) {
  const cookieHeader = req.headers.cookie;
  if (!cookieHeader) {
    throw new Error('no cookieHeader');
  }
  const tokenCookie = retrieveTokenFromCookie(cookieHeader, tokenType);
  if (!tokenCookie) throw new Error('no token accessible the method');

  const token = tokenCookie.split('=')[1];
  const decoded = jwt.decode(token);

  return decoded;
}

export function retrieveTokenFromCookie(cookieHeader: string, tokenType: string) {
  try {
    return cookieHeader?.split(';').find((row) => row.trim().startsWith(`${tokenType}=`));
  } catch (error) {
    throw new Error('Error retrieving info from cookie Header');
  }
}
