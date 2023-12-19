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
exports.UserService = void 0;
const tsyringe_1 = require("tsyringe");
const api_1 = require("../../common/types/api");
const AppUserRepository_1 = require("../../infrastructure/database/repositories/AppUserRepository");
const errors_1 = require("../common/errors");
const services_1 = require("../token/services");
const services_2 = require("../password/services");
let UserService = class UserService {
    constructor(userRepository, passwordService, tokenService) {
        this.userRepository = userRepository;
        this.passwordService = passwordService;
        this.tokenService = tokenService;
    }
    async registerUser(email, password) {
        const user = await this.userRepository.getUserByEmail(email);
        if (user) {
            throw new errors_1.UserAlreadyExistsError(errors_1.ErrorMessages.ALREADY_EXISTING);
        }
        try {
            const hashedPassword = await this.passwordService.hashPassword(password);
            const newUser = { email: email, roles: { [api_1.Roles.USER]: true }, password: hashedPassword };
            await this.userRepository.create(newUser);
        }
        catch (error) {
            console.error("something went wrong in the userservice", error);
            throw error;
        }
    }
    async login(email, passwordInput) {
        try {
            const user = await this.userRepository.getUserByEmail(email);
            if (!user) {
                throw new errors_1.UserDoNotExists(errors_1.ErrorMessages.NOT_EXISTING_USER);
            }
            const passwordFromDB = user.password;
            const passwordMatchDB = await this.passwordService.checkCredentials(passwordInput, passwordFromDB);
            if (!passwordMatchDB) {
                throw new errors_1.AuthenticationError(errors_1.ErrorMessages.INVALID_CREDENTIALS);
            }
            const roles = this.addUserRole(user);
            const accessToken = this.tokenService.generateAccessToken({
                userInfo: { email, roles },
            });
            const refreshToken = this.tokenService.generateRefreshToken({ email });
            if (!refreshToken || !accessToken) {
                throw new errors_1.FailToGenerateTokens(errors_1.ErrorMessages.FAIL_TO_GENERATE_TOKENS);
            }
            await this.userRepository.updateRefreshToken(refreshToken, email);
            return { accessToken, refreshToken };
        }
        catch (error) {
            console.error("something went wrong in the service", error);
            throw error;
        }
    }
    async logoutUser(refreshToken) {
        const foundUser = await this.userRepository.findUserByRefreshToken(refreshToken);
        if (!foundUser)
            return false;
        await this.userRepository.clearUserRefreshToken(refreshToken);
        return true;
    }
    addUserRole(user) {
        const defaultRole = { [api_1.Roles.USER]: true };
        const userRolesFromDB = user.roles;
        return Object.assign(Object.assign({}, defaultRole), userRolesFromDB);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(AppUserRepository_1.AppUserRepository)),
    __param(1, (0, tsyringe_1.inject)(services_2.PasswordService)),
    __param(2, (0, tsyringe_1.inject)(services_1.TokenService)),
    __metadata("design:paramtypes", [AppUserRepository_1.AppUserRepository,
        services_2.PasswordService,
        services_1.TokenService])
], UserService);
