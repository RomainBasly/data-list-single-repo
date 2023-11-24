"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FailToGenerateTokens = exports.AuthenticationError = exports.UserDoNotExists = exports.UserAlreadyExistsError = exports.ErrorMessages = exports.BaseError = exports.errorHandler = void 0;
// used as a middleware
function errorHandler(err, req, res, next) {
    if (err instanceof BaseError) {
        res.status(err.statusCode).json({ error: err.name, message: err.message });
    }
    else {
        console.error(err);
        res.status(500).json({ error: "InternalServerError", message: "Something went wrong" });
        next(err);
    }
}
exports.errorHandler = errorHandler;
class BaseError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        this.message = message;
    }
}
exports.BaseError = BaseError;
// error types handling
var ErrorMessages;
(function (ErrorMessages) {
    ErrorMessages["ALREADY_EXISTS"] = "User already exists in database, please login instead";
    ErrorMessages["NOT_EXISTING_USER"] = "User do not exists in the database, please register instead";
    ErrorMessages["INVALID_CREDENTIALS"] = "Invalid credentials";
    ErrorMessages["FAIL_TO_GENERATE_TOKENS"] = " Fail to generate Tokens";
})(ErrorMessages || (exports.ErrorMessages = ErrorMessages = {}));
// add a class by big types of error
class UserAlreadyExistsError extends BaseError {
    constructor(message) {
        super(409, message);
    }
}
exports.UserAlreadyExistsError = UserAlreadyExistsError;
class UserDoNotExists extends BaseError {
    constructor(message) {
        super(401, message);
    }
}
exports.UserDoNotExists = UserDoNotExists;
class AuthenticationError extends BaseError {
    constructor(message) {
        super(401, message);
    }
}
exports.AuthenticationError = AuthenticationError;
class FailToGenerateTokens extends BaseError {
    constructor(message) {
        super(401, message);
    }
}
exports.FailToGenerateTokens = FailToGenerateTokens;
