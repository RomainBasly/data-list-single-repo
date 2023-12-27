import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { allowedOrigins } from "../config/common";
import { RoleAssignments, Roles } from "../common/types/api";
import { JwtPayloadAccessToken } from "../domain/jwtToken/services";

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const envApiKey = process.env.API_KEY;

interface IRequest extends Request {
  email?: string;
  roles?: RoleAssignments;
}

export const verifyRequestApiKey = (req: IRequest, res: Response, next: NextFunction) => {
  const apiKey = req.header("X-API-KEY");
  if (!apiKey) return res.status(401).json({ error: "Missing apiKey" });

  if (apiKey !== envApiKey) {
    return res.status(403).json({ error: "apiKey not valid" });
  }

  next();
};

export const verifyUserAccessToken = (req: IRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.sendStatus(401);
  const token = authHeader.split(" ")[1];
  if (!accessTokenSecret) throw new Error("no accessToken accessible in middleware (verifyToken)");

  const decodedToken = jwt.verify(token, accessTokenSecret) as JwtPayloadAccessToken;
  jwt.verify(token, accessTokenSecret, (err, decoded) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.email = decodedToken.userInfo.email;
    req.roles = decodedToken.userInfo.roles;
    next();
  });
};

export const corsOriginCheck = (req: Request, res: Response, next: NextFunction) => {
  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Credentials", "true");
  }
  next();
};

export const verifyRoles = (...allowedRoles: Roles[]) => {
  return (req: IRequest, res: Response, next: NextFunction) => {
    if (!req?.roles) return res.sendStatus(401);
    const hasSufficientRole = Object.entries(req.roles).some(([role, assigned]) => {
      return assigned && allowedRoles.includes(role as Roles);
    });

    if (!hasSufficientRole) return res.sendStatus(403);

    next();
  };
};
