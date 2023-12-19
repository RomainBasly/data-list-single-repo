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
const services_1 = require("../../domain/refreshToken/services");
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
let AppRefreshTokenController = class AppRefreshTokenController {
    constructor(refreshTokenService) {
        this.refreshTokenService = refreshTokenService;
    }
    async handleRefreshToken(req, res, next) {
        const cookies = req.cookies;
        if (!(cookies === null || cookies === void 0 ? void 0 : cookies.jwt))
            return res.sendStatus(401);
        const refreshToken = cookies.jwt;
        if (!refreshTokenSecret)
            throw new Error("no refreshToken in middleware");
        if (!accessTokenSecret)
            throw new Error("no refreshToken in middleware");
        try {
            const foundUser = await this.refreshTokenService.getUser(refreshToken);
            if (!foundUser)
                return res.json(401);
            const accessToken = await this.refreshTokenService.verifyToken(refreshToken, refreshTokenSecret, accessTokenSecret, foundUser);
            res.json({ accessToken });
        }
        catch (error) {
            next(error);
        }
    }
};
exports.AppRefreshTokenController = AppRefreshTokenController;
exports.AppRefreshTokenController = AppRefreshTokenController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(services_1.RefreshTokenService)),
    __metadata("design:paramtypes", [services_1.RefreshTokenService])
], AppRefreshTokenController);
