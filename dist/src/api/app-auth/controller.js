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
const supabaseClient_1 = __importDefault(require("../../../config/database/supabaseClient"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const services_1 = require("./services");
const tsyringe_1 = require("tsyringe");
const api_1 = require("../../common/types/api");
// Here is injection dependencies used in this architecture
// If you do not get it please check tsyringe
let AppAuthController = class AppAuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async registerNewUser(req, res) {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json("userName and password are required");
            return;
        }
        const alreadyUser = await supabaseClient_1.default.from("app-users").select().eq("email", email);
        if (alreadyUser) {
            res.sendStatus(409).json("You are already in the database, try to login instead");
            return;
        }
        try {
            const salt = bcrypt_1.default.genSaltSync(10);
            const hashedPassword = await bcrypt_1.default.hash(password, salt);
            const newUser = { email: email, roles: { [api_1.Roles.USER]: true }, password: hashedPassword };
            await supabaseClient_1.default.from("app-users").insert([newUser]).select();
            res.status(201).json({ message: "new user created" });
        }
        catch (error) {
            res.status(500).json({ "message error 500": error });
        }
    }
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const userMatchingDB = await supabaseClient_1.default.from("app-users").select().eq("email", email);
            if (!userMatchingDB || !userMatchingDB.data || userMatchingDB.data.length === 0) {
                res.sendStatus(401);
                return;
            }
            const dataFromDB = userMatchingDB.data[0];
            const passwordFromDB = dataFromDB.password;
            const matchingPassword = await bcrypt_1.default.compare(password, passwordFromDB);
            if (matchingPassword) {
                const defaultRole = { [api_1.Roles.USER]: true };
                const userRolesFromDB = dataFromDB.roles;
                const roles = Object.assign(Object.assign({}, defaultRole), userRolesFromDB);
                const accessToken = this.authService.generateAccessToken({
                    userInfo: { email, roles },
                });
                const refreshToken = this.authService.generateRefreshToken({ email });
                await supabaseClient_1.default.from("app-users").update({ refreshToken: refreshToken }).eq("email", email);
                res.cookie("jwt", refreshToken, {
                    httpOnly: true,
                    sameSite: "none",
                    secure: false,
                    maxAge: 24 * 60 * 60 * 1000,
                });
                res.json({ accessToken });
            }
            else {
                res.sendStatus(401);
            }
        }
        catch (error) {
            console.log(error);
            res.status(400).send("error in login_post");
        }
    }
    async logoutUser(req, res) {
        const cookies = req.cookies;
        if (!(cookies === null || cookies === void 0 ? void 0 : cookies.jwt))
            return res.sendStatus(204);
        const refreshToken = cookies.jwt;
        const foundUserRefreshToken = await supabaseClient_1.default.from("app-users").select().eq("refreshToken", refreshToken);
        if (!foundUserRefreshToken) {
            res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true, maxAge: 24 * 60 * 60 * 1000 });
            return res.send(204);
        }
        await supabaseClient_1.default.from("app-users").update({ refreshToken: "" }).eq("refreshToken", refreshToken);
        res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true, maxAge: 24 * 60 * 60 * 1000 });
        res.sendStatus(204);
    }
};
exports.AppAuthController = AppAuthController;
exports.AppAuthController = AppAuthController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(services_1.AuthService)),
    __metadata("design:paramtypes", [services_1.AuthService])
], AppAuthController);
