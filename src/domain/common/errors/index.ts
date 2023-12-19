import { Request, Response, NextFunction } from "express";

// used as a middleware
export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  if (err instanceof BaseError) {
    res.status(err.statusCode).json({ error: err.name, errorCode: err.errorCode, message: err.message });
  } else {
    console.error(err);
    res.status(500).json({ error: "InternalServerError", message: "Something went wrong" });
    next(err);
  }
}

export class BaseError extends Error {
  statusCode: number;
  errorCode: number;
  constructor(statusCode: number, errorCode: number, message: string) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.message = message;
    this.errorCode = errorCode;
  }
}

// error types handling
export enum ErrorMessages {
  ALREADY_EXISTING = "User already exists in database, please login instead",
  NOT_EXISTING_USER = "User do not exists in the database, please register instead",
  INVALID_CREDENTIALS = "Invalid credentials",
  FAIL_TO_GENERATE_TOKENS = " Fail to generate Tokens",
  NO_EXISTING_REFRESH_TOKEN = "No existing refreshToken",
}

// add a class by big types of error
export class UserAlreadyExistsError extends BaseError {
  constructor(message: ErrorMessages.ALREADY_EXISTING) {
    super(409, 1001, message);
  }
}

export class UserDoNotExists extends BaseError {
  constructor(message: ErrorMessages.NOT_EXISTING_USER) {
    super(401, 1002, message);
  }
}

export class AuthenticationError extends BaseError {
  constructor(message: ErrorMessages.INVALID_CREDENTIALS) {
    super(401, 2001, message);
  }
}

export class FailToGenerateTokens extends BaseError {
  constructor(message: ErrorMessages.FAIL_TO_GENERATE_TOKENS) {
    super(401, 2002, message);
  }
}

export class NoPreexistingRefreshToken extends BaseError {
  constructor(message: ErrorMessages.NO_EXISTING_REFRESH_TOKEN) {
    super(401, 2003, message);
  }
}
