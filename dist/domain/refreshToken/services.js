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
exports.RefreshTokenService = void 0;
const tsyringe_1 = require("tsyringe");
const AppUserRepository_1 = require("../../infrastructure/database/repositories/AppUserRepository");
const errors_1 = require("../common/errors");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
let RefreshTokenService = class RefreshTokenService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async getUser(token) {
        const foundUser = await this.userRepository.getUserByRefreshToken(token);
        if (!foundUser)
            throw new errors_1.NoPreexistingRefreshToken(errors_1.ErrorMessages.NO_EXISTING_REFRESH_TOKEN);
        return foundUser;
    }
    async verifyToken(refreshToken, refreshTokenSecret, accessTokenSecret, foundUser) {
        return new Promise((resolve, reject) => {
            jsonwebtoken_1.default.verify(refreshToken, refreshTokenSecret, (err, decoded) => {
                if (err) {
                    reject(new errors_1.JWTError(errors_1.ErrorMessages.JWT_ERROR));
                    return;
                }
                const decodedPayload = decoded; // force type otherwise TS does not know that email exists in payload
                if (!decodedPayload.email || foundUser.email !== decodedPayload.email) {
                    reject(new errors_1.ForbiddenError(errors_1.ErrorMessages.FORBIDDEN_ERROR));
                    return;
                }
                if (!accessTokenSecret) {
                    reject(new errors_1.accessTokenError(errors_1.ErrorMessages.ACCESSTOKEN_ERROR));
                    return;
                }
                const roles = foundUser.roles;
                const accessToken = jsonwebtoken_1.default.sign({ UserInfo: { email: decodedPayload.email, roles } }, accessTokenSecret, {
                    expiresIn: "3600s",
                });
                resolve(accessToken);
            });
        });
    }
};
exports.RefreshTokenService = RefreshTokenService;
exports.RefreshTokenService = RefreshTokenService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(AppUserRepository_1.AppUserRepository)),
    __metadata("design:paramtypes", [AppUserRepository_1.AppUserRepository])
], RefreshTokenService);
