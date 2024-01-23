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
exports.AppAuthController = void 0;
const tsyringe_1 = require("tsyringe");
const services_1 = require("../../domain/user/services");
const assert_1 = __importDefault(require("assert"));
const helpers_1 = require("../../common/helpers");
const errors_1 = require("../../domain/common/errors");
// Here is injection dependencies used in this architecture
// If you do not get it please check tsyringe
let AppAuthController = class AppAuthController {
    constructor(userService) {
        this.userService = userService;
    }
    async register(req, res, next) {
        const { userName, email, password } = req.body;
        if (!email || !password || !userName) {
            res.status(400).json('userName, email and password are required');
            return;
        }
        try {
            await this.userService.registerUser(userName, email, password);
            res.status(201).json({ message: 'new user created' });
        }
        catch (error) {
            if (error instanceof errors_1.UserAlreadyExistsError) {
                res.status(409).json({ message: error.message });
            }
            else {
                console.error('Error in AppUserController', error);
                res.status(500).json({ message: 'Internal server error' });
            }
        }
    }
    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const { accessToken, refreshToken } = await this.userService.login(email, password);
            (0, assert_1.default)(refreshToken, 'problem with refreshToken inside controller');
            (0, assert_1.default)(accessToken, 'problem with accesstoken inside controller');
            (0, helpers_1.cookieHandler)(req, res, refreshToken);
            res.json({ accessToken, refreshToken });
        }
        catch (error) {
            next(error);
        }
    }
    async logoutUser(req, res) {
        const cookies = req.cookies;
        if (!(cookies === null || cookies === void 0 ? void 0 : cookies.jwt))
            return res.sendStatus(204);
        const refreshToken = cookies.jwt;
        const isLoggedOut = await this.userService.logoutUser(refreshToken);
        if (!isLoggedOut) {
            res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true, maxAge: 24 * 60 * 60 * 1000 });
            return res.send(204);
        }
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true, maxAge: 24 * 60 * 60 * 1000 });
        res.sendStatus(204);
    }
};
exports.AppAuthController = AppAuthController;
exports.AppAuthController = AppAuthController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(services_1.UserService)),
    __metadata("design:paramtypes", [services_1.UserService])
], AppAuthController);
