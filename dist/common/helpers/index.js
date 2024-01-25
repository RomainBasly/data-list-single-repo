"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomNumber = exports.cookieHandler = exports.verifyJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errors_1 = require("../../domain/common/errors");
function verifyJwt(token, secret) {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.verify(token, secret, (err, decoded) => {
            if (err)
                reject(new errors_1.JWTError(errors_1.ErrorMessages.JWT_ERROR));
            else
                resolve(decoded);
        });
    });
}
exports.verifyJwt = verifyJwt;
function cookieHandler(req, res, refreshToken) {
    return res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        sameSite: 'none',
        secure: false, // in dev mode use false
        maxAge: 24 * 3600 * 30 * 1000,
        path: '/',
    });
}
exports.cookieHandler = cookieHandler;
function generateRandomNumber() {
    const array = [];
    for (let i = 0; i < 7; i++) {
        const randomNumber = Math.floor(Math.random() * 10);
        array.push(randomNumber);
    }
    const result = parseInt(array.join(''));
    return result;
}
exports.generateRandomNumber = generateRandomNumber;
