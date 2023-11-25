"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRefreshTokenController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const fakeDataModule = __importStar(require("../../infrastructure/fakeData/employees.json"));
const tsyringe_1 = require("tsyringe");
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
const fakeUsers = fakeDataModule.default;
const fakeUsersDB = {
    users: fakeUsers || [],
    setUsers: function (data) {
        this.users = data;
    },
};
let AppRefreshTokenController = class AppRefreshTokenController {
    handleRefreshToken(req, res) {
        const cookies = req.cookies;
        console.log(cookies.jwt);
        if (!(cookies === null || cookies === void 0 ? void 0 : cookies.jwt))
            return res.sendStatus(401);
        console.log("cookies", cookies.jwt);
        const refreshToken = cookies.jwt;
        const foundUser = fakeUsersDB.users.find((person) => person.refreshToken === refreshToken);
        if (!refreshTokenSecret)
            throw new Error("no refreshToken in middleware");
        if (!foundUser)
            return res.sendStatus(403);
        jsonwebtoken_1.default.verify(refreshToken, refreshTokenSecret, (err, decoded) => {
            if (err) {
                console.log("error dude", err);
                return res.sendStatus(403);
            }
            const decodedPayload = decoded; // force type otherwise TS does not know that email exists in payload
            if (!decodedPayload.email || foundUser.email !== decodedPayload.email)
                return res.sendStatus(403);
            if (!accessTokenSecret)
                throw new Error("no accessToken accessible in middleware (handleRefreshToken)");
            const roles = foundUser.roles;
            const accessToken = jsonwebtoken_1.default.sign({ UserInfo: { email: decodedPayload.email, roles } }, accessTokenSecret, {
                expiresIn: "3600s",
            });
            res.json({ accessToken });
        });
    }
};
exports.AppRefreshTokenController = AppRefreshTokenController;
exports.AppRefreshTokenController = AppRefreshTokenController = __decorate([
    (0, tsyringe_1.injectable)()
], AppRefreshTokenController);
