"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAlreadyExistsError = exports.BaseError = exports.errorHandler = exports.ErrorMessages = void 0;
var ErrorMessages;
(function (ErrorMessages) {
    ErrorMessages["ALREADY_EXISTS"] = "User already exists in database";
})(ErrorMessages || (exports.ErrorMessages = ErrorMessages = {}));
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
class UserAlreadyExistsError extends BaseError {
    constructor(message) {
        super(409, message);
    }
}
exports.UserAlreadyExistsError = UserAlreadyExistsError;
