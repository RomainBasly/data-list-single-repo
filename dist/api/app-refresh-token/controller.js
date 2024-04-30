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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRefreshTokenController = void 0;
const tsyringe_1 = require("tsyringe");
const services_1 = require("../../domain/jwtToken/services");
const services_2 = require("../../domain/refreshToken/services");
const AppUserRepository_1 = require("../../infrastructure/database/repositories/AppUserRepository");
const errors_1 = require("../../domain/common/errors");
const helpers_1 = require("../../common/helpers");
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
let AppRefreshTokenController = class AppRefreshTokenController {
    constructor(refreshTokenService, tokenService, userRepository) {
        this.refreshTokenService = refreshTokenService;
        this.tokenService = tokenService;
        this.userRepository = userRepository;
    }
    async generateNewAccessToken(req, res, next) {
        const cookieHeader = req.headers.cookie;
        if (!cookieHeader) {
            return res.status(401).json({ message: 'Unauthorized 1' });
        }
        const cookieRefreshToken = (0, helpers_1.retrieveTokenFromCookie)(cookieHeader, 'refreshToken');
        if (!cookieRefreshToken) {
            return res.status(401).json({ message: 'Unauthorized 2' });
        }
        const refreshToken = cookieRefreshToken.split('=')[1];
        if (!refreshTokenSecret)
            throw new Error('no refreshTokenSecret in middleware');
        if (!accessTokenSecret)
            throw new Error('no accessTokenSecret in middleware');
        try {
            const foundUser = await this.refreshTokenService.getUserByRefreshToken(refreshToken);
            if (!foundUser)
                return res.status(401).json({ error: errors_1.ErrorMessages.UNAUTHORIZED });
            const { newAccessToken } = await this.refreshTokenService.handleTokenRefresh(refreshToken, refreshTokenSecret, accessTokenSecret, foundUser);
            res.json({ accessToken: newAccessToken });
        }
        catch (error) {
            next(error);
        }
    }
};
exports.AppRefreshTokenController = AppRefreshTokenController;
exports.AppRefreshTokenController = AppRefreshTokenController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(services_2.RefreshTokenService)),
    __param(1, (0, tsyringe_1.inject)(services_1.TokenService)),
    __param(2, (0, tsyringe_1.inject)(AppUserRepository_1.AppUserRepository)),
    __metadata("design:paramtypes", [services_2.RefreshTokenService,
        services_1.TokenService,
        AppUserRepository_1.AppUserRepository])
], AppRefreshTokenController);
