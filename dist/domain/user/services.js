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
exports.UserService = void 0;
const tsyringe_1 = require("tsyringe");
const bcrypt_1 = __importDefault(require("bcrypt"));
const api_1 = require("../../src/common/types/api");
const AppUserRepository_1 = require("../../infrastructure/database/repositories/AppUserRepository");
const errors_1 = require("../common/errors");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async registerNewUser(email, password) {
        if (await this.userRepository.userAlreadyExists(email)) {
            throw new errors_1.UserAlreadyExistsError(errors_1.ErrorMessages.ALREADY_EXISTS);
        }
        try {
            const salt = bcrypt_1.default.genSaltSync(10);
            const hashedPassword = await bcrypt_1.default.hash(password, salt);
            const newUser = { email: email, roles: { [api_1.Roles.USER]: true }, password: hashedPassword };
            await this.userRepository.create(newUser);
        }
        catch (error) {
            console.error("something went wrong in the service", error);
            throw error;
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(AppUserRepository_1.AppUserRepository)),
    __metadata("design:paramtypes", [AppUserRepository_1.AppUserRepository])
], UserService);
