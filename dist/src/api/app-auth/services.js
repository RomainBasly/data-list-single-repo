"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthService {
    constructor(accessTokenSecret) {
        this.accessTokenSecret = accessTokenSecret;
    }
    generateAccessToken(payload) {
        return jsonwebtoken_1.default.sign(payload, this.accessTokenSecret, { expiresIn: "30s" });
    }
    generateRefreshToken(payload) {
        return jsonwebtoken_1.default.sign(payload, this.accessTokenSecret, { expiresIn: "30s" });
    }
}
exports.AuthService = AuthService;
