import { Request, Response, NextFunction } from "express";

export enum ErrorMessages {
  ALREADY_EXISTS = "User already exists in database",
}

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  if (err instanceof BaseError) {
    res.status(err.statusCode).json({ error: err.name, message: err.message });
  } else {
    console.error(err);
    res.status(500).json({ error: "InternalServerError", message: "Something went wrong" });
    next(err);
  }
}

export class BaseError extends Error {
  statusCode: number;
  constructor(statusCode: number, message: string) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.message = message;
  }
}

export class UserAlreadyExistsError extends BaseError {
  constructor(message: ErrorMessages.ALREADY_EXISTS) {
    super(409, message);
  }
}
