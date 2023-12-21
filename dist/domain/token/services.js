"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const tsyringe_1 = require("tsyringe");
const AppUserRepository_1 = require("../../infrastructure/database/repositories/AppUserRepository");
const AppRefreshTokenRepository_1 = require("../../infrastructure/database/repositories/AppRefreshTokenRepository");
let TokenService = class TokenService {
    constructor(userRepository, refreshTokenRepository) {
        this.userRepository = userRepository;
        this.refreshTokenRepository = refreshTokenRepository;
        this.accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
        this.refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
    }
    generateAccessToken(payload) {
        if (!this.accessTokenSecret)
            return null;
        return jsonwebtoken_1.default.sign(payload, this.accessTokenSecret, { expiresIn: "3600s" });
    }
    generateRefreshToken(payload) {
        if (!this.refreshTokenSecret)
            return null;
        return jsonwebtoken_1.default.sign(payload, this.refreshTokenSecret, { expiresIn: "60d" });
    }
};
exports.TokenService = TokenService;
exports.TokenService = TokenService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(AppUserRepository_1.AppUserRepository)),
    __param(1, (0, tsyringe_1.inject)(AppRefreshTokenRepository_1.AppRefreshTokenRepository)),
    __metadata("design:paramtypes", [AppUserRepository_1.AppUserRepository,
        AppRefreshTokenRepository_1.AppRefreshTokenRepository])
], TokenService);
