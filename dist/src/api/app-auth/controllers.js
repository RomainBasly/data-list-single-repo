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
exports.login_get = exports.signup_get = exports.signup_post_with_supabase = exports.AppAuthController = void 0;
const supabaseClient_1 = __importDefault(require("../../../config/database/supabaseClient"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const fakeDataModule = __importStar(require("../../../infrastructure/fakeData/employees.json"));
const services_1 = require("./services");
const tsyringe_1 = require("tsyringe");
const api_1 = require("../../common/types/api");
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
const fakeUsers = fakeDataModule.default;
const fakeUsersDB = {
    users: fakeUsers || [],
    setUsers: function (data) {
        this.users = data;
    },
};
// Here is injection dependencies used in this architecture
// If you do not get it please check tsyringe
let AppAuthController = class AppAuthController {
    constructor(authService) {
        this.authService = authService;
    }
    checkSessionUser(req, res) {
        var _a;
        if ((_a = req === null || req === void 0 ? void 0 : req.session) === null || _a === void 0 ? void 0 : _a.loggedIn) {
            res.send("you are loggedIn Baby");
        }
        else {
            res.send("you are not loggedIn Copeng");
        }
    }
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const userMatchingDB = fakeUsersDB.users.find((person) => person.email === email);
            if (!userMatchingDB) {
                res.sendStatus(401);
                return;
            }
            const matchingPassword = await bcrypt_1.default.compare(password, userMatchingDB.password);
            if (matchingPassword) {
                const defaultRole = { [api_1.Roles.USER]: true };
                const userRolesFromDB = userMatchingDB.roles;
                const roles = Object.assign(Object.assign({}, defaultRole), userRolesFromDB);
                const accessToken = this.authService.generateAccessToken({
                    userInfo: { email: userMatchingDB.email, roles },
                });
                const refreshToken = this.authService.generateRefreshToken({ email });
                const otherUsers = fakeUsersDB.users.filter((employee) => employee.email !== userMatchingDB.email);
                const currentUser = Object.assign(Object.assign({}, userMatchingDB), { refreshToken });
                fakeUsersDB.setUsers([...otherUsers, currentUser]);
                await fs_1.default.promises.writeFile(path_1.default.join(__dirname, "..", "..", "..", "infrastructure", "fakeData", "employees.json"), JSON.stringify(fakeUsersDB.users));
                res.cookie("jwt", refreshToken, {
                    httpOnly: true,
                    sameSite: "none",
                    secure: true,
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
        const foundUser = fakeUsersDB.users.find((person) => person.refreshToken === refreshToken);
        if (!refreshTokenSecret)
            throw new Error("no refreshToken in the controler");
        if (!foundUser) {
            res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true, maxAge: 24 * 60 * 60 * 1000 });
            return res.send(204);
        }
        const otherUsers = fakeUsersDB.users.filter((person) => person.refreshToken !== foundUser.refreshToken);
        const currentUser = Object.assign(Object.assign({}, foundUser), { refreshToken: "" });
        fakeUsersDB.setUsers([...otherUsers, currentUser]);
        await fs_1.default.promises.writeFile(path_1.default.join(__dirname, "..", "..", "..", "infrastructure", "fakeData", "employees.json"), JSON.stringify(fakeUsersDB.users));
        res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true, maxAge: 24 * 60 * 60 * 1000 });
        res.sendStatus(204);
    }
    getProtected(req, res) {
        res.send("welcome to the website, copeng");
    }
    async registerNewUser(req, res) {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json("userName and password are required");
            return;
        }
        const duplicate = fakeUsersDB.users.find((person) => person.email === email);
        if (duplicate) {
            res.sendStatus(409).json("You are already in the database, try to login instead");
            return;
        }
        try {
            const salt = bcrypt_1.default.genSaltSync(10);
            const hashedPassword = await bcrypt_1.default.hash(password, salt);
            const newUser = { email: email, roles: { [api_1.Roles.USER]: true }, password: hashedPassword };
            fakeUsersDB.setUsers([...fakeUsersDB.users, newUser]);
            await fs_1.default.promises.writeFile(path_1.default.join(__dirname, "..", "..", "..", "infrastructure", "fakeData", "employees.json"), JSON.stringify(fakeUsersDB.users));
            console.log(fakeUsersDB.users);
            res.status(201).json({ message: "new user created" });
        }
        catch (error) {
            res.status(500).json({ "message error 500": error });
        }
    }
};
exports.AppAuthController = AppAuthController;
exports.AppAuthController = AppAuthController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(services_1.AuthService)),
    __metadata("design:paramtypes", [services_1.AuthService])
], AppAuthController);
const signup_post_with_supabase = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (email && password) {
            let { data, error } = await supabaseClient_1.default.auth.signInWithPassword({
                email,
                password,
            });
            console.log(data, error);
        }
        res.status(201).send("user created");
    }
    catch (error) {
        console.log(error);
        res.status(400).send("error, user not created");
    }
};
exports.signup_post_with_supabase = signup_post_with_supabase;
const signup_get = (req, res) => {
    res.send("signup get");
};
exports.signup_get = signup_get;
const login_get = (req, res) => {
    res.send("login get");
};
exports.login_get = login_get;
