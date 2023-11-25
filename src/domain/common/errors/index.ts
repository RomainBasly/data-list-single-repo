import { Request, Response, NextFunction } from "express";

// used as a middleware
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

// error types handling
export enum ErrorMessages {
  ALREADY_EXISTS = "User already exists in database, please login instead",
  NOT_EXISTING_USER = "User do not exists in the database, please register instead",
  INVALID_CREDENTIALS = "Invalid credentials",
  FAIL_TO_GENERATE_TOKENS = " Fail to generate Tokens",
}

// add a class by big types of error
export class UserAlreadyExistsError extends BaseError {
  constructor(message: ErrorMessages.ALREADY_EXISTS) {
    super(409, message);
  }
}

export class UserDoNotExists extends BaseError {
  constructor(message: ErrorMessages.NOT_EXISTING_USER) {
    super(401, message);
  }
}

export class AuthenticationError extends BaseError {
  constructor(message: ErrorMessages.INVALID_CREDENTIALS) {
    super(401, message);
  }
}

export class FailToGenerateTokens extends BaseError {
  constructor(message: ErrorMessages.FAIL_TO_GENERATE_TOKENS) {
    super(401, message);
  }
}
