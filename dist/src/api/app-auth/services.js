"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const tsyringe_1 = require("tsyringe");
let AuthService = class AuthService {
    constructor() {
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
    // to implement and refacto methods from controller to service
    createNewUser(email, password) { }
    saveEmployeeToDatabase() { }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, tsyringe_1.injectable)()
], AuthService);
