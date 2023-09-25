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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login_get = exports.signup_get = exports.signup_post_with_supabase = exports.AppAuthController = exports.requireAuth = void 0;
const supabaseClient_1 = __importDefault(require("../../../config/database/supabaseClient"));
const decorators_1 = require("../../common/decorators");
const bcrypt_1 = __importDefault(require("bcrypt"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const employeesModule = __importStar(require("../../../infrastructure/fakeData/employees.json"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function requireAuth(req, res, next) {
    var _a;
    if ((_a = req === null || req === void 0 ? void 0 : req.session) === null || _a === void 0 ? void 0 : _a.loggedIn) {
        next();
        return;
    }
    res.status(403);
    res.send("Not permitted");
}
exports.requireAuth = requireAuth;
const employees = employeesModule.default;
const employeesDB = {
    employees: employees || [],
    setUsers: function (data) {
        this.employees = data;
    },
};
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
let AppAuthController = exports.AppAuthController = class AppAuthController {
    checkSessionUser(req, res) {
        var _a;
        if ((_a = req === null || req === void 0 ? void 0 : req.session) === null || _a === void 0 ? void 0 : _a.loggedIn) {
            res.send("you are loggedIn Baby");
        }
        else {
            res.send("you are not loggedIn Copeng");
        }
    }
    async postLogin(req, res) {
        try {
            const { email, password } = req.body;
            const userMatchingDB = employeesDB.employees.find((person) => person.email === email);
            if (!userMatchingDB) {
                res.sendStatus(401);
                return;
            }
            const matchingPassword = await bcrypt_1.default.compare(password, userMatchingDB.password);
            if (matchingPassword) {
                //if (!accessTokenSecret || !refreshTokenSecret) return;
                const accessToken = jsonwebtoken_1.default.sign({ "email": userMatchingDB.email }, String(accessTokenSecret), { expiresIn: '30s' });
                const refreshToken = jsonwebtoken_1.default.sign({ "email": userMatchingDB.email }, String(refreshTokenSecret), { expiresIn: '1d' });
                const otherUsers = employeesDB.employees.filter(employee => employee.email !== userMatchingDB.email);
                const currentUser = Object.assign(Object.assign({}, userMatchingDB), { refreshToken });
                employeesDB.setUsers([...otherUsers, currentUser]);
                await fs_1.default.promises.writeFile(path_1.default.join(__dirname, "..", "..", "..", "infrastructure", "fakeData", "employees.json"), JSON.stringify(employeesDB.employees));
                res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
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
    logoutUser(req, res) {
        req.session = undefined;
        res.send("you are now loggedOut, copeng");
    }
    getProtected(req, res) {
        res.send("welcome to the website, copeng");
    }
    async handleNewUser(req, res) {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json("userName and password are required");
            return;
        }
        const duplicate = employeesDB.employees.find((person) => person.email === email);
        if (duplicate) {
            res.sendStatus(409).json("You are already in the database, try to login instead");
            return;
        }
        try {
            const salt = bcrypt_1.default.genSaltSync(10);
            const hashedPassword = await bcrypt_1.default.hash(password, salt);
            const newUser = { email: email, password: hashedPassword };
            employeesDB.setUsers([...employeesDB.employees, newUser]);
            await fs_1.default.promises.writeFile(path_1.default.join(__dirname, "..", "..", "..", "infrastructure", "fakeData", "employees.json"), JSON.stringify(employeesDB.employees));
            console.log(employeesDB.employees);
            res.status(201).json({ message: "new user created" });
        }
        catch (error) {
            res.status(500).json({ "message error 500": error });
        }
    }
};
__decorate([
    (0, decorators_1.get)("/"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppAuthController.prototype, "checkSessionUser", null);
__decorate([
    (0, decorators_1.post)("/login"),
    (0, decorators_1.bodyValidator)("email", "password"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AppAuthController.prototype, "postLogin", null);
__decorate([
    (0, decorators_1.get)("/logout"),
    (0, decorators_1.use)(requireAuth),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppAuthController.prototype, "logoutUser", null);
__decorate([
    (0, decorators_1.get)("/protected"),
    (0, decorators_1.use)(requireAuth),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppAuthController.prototype, "getProtected", null);
__decorate([
    (0, decorators_1.post)("/register"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AppAuthController.prototype, "handleNewUser", null);
exports.AppAuthController = AppAuthController = __decorate([
    (0, decorators_1.controller)("/api/auth")
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
