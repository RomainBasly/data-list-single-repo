"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader)
        return res.sendStatus(401);
    const token = authHeader.split(' ')[1];
    if (!accessTokenSecret)
        return;
    jsonwebtoken_1.default.verify(token, accessTokenSecret, (err, decoded) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.email = decoded.email;
        next();
    });
};
exports.verifyToken = verifyToken;
