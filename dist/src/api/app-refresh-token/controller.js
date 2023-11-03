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
const fakeDataModule = __importStar(require("../../../infrastructure/fakeData/employees.json"));
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
const fakeUsers = fakeDataModule.default;
const fakeUsersDB = {
    users: fakeUsers || [],
    setUsers: function (data) {
        this.users = data;
    },
};
class AppRefreshTokenController {
    handleRefreshToken(req, res) {
        const cookies = req.cookies;
        if (!(cookies === null || cookies === void 0 ? void 0 : cookies.jwt))
            return res.send(401);
        console.log(cookies.jwt);
        const refreshToken = cookies.jwt;
        const foundUser = fakeUsersDB.users.find((person) => person.refreshToken === refreshToken);
        if (!refreshTokenSecret)
            throw new Error("no refreshToken in middleware");
        if (!foundUser)
            return (res.send(403),
                jsonwebtoken_1.default.verify(refreshToken, refreshTokenSecret, (err, decoded) => {
                    if (err)
                        return res.sendStatus(403);
                    const decodedPayload = decoded; // force type otherwise TS does not know that username exists in payload
                    if (!decodedPayload.username || foundUser.username !== decodedPayload.username)
                        return res.sendStatus(403);
                    if (!accessTokenSecret)
                        throw new Error("no accessToken accessible in middleware (handleRefreshToken)");
                    const accessToken = jsonwebtoken_1.default.sign({ username: decodedPayload.username }, accessTokenSecret, {
                        expiresIn: "30s",
                    });
                    res.json({ accessToken });
                }));
    }
}
exports.AppRefreshTokenController = AppRefreshTokenController;
