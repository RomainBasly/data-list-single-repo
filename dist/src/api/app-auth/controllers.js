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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login_get = exports.signup_get = exports.signup_post = exports.AppAuthController = exports.requireAuth = void 0;
const supabaseClient_1 = __importDefault(require("../../../config/database/supabaseClient"));
const decorators_1 = require("../../common/decorators");
function requireAuth(req, res, next) {
    if (req.session && req.session.loggedIn) {
        next();
        return;
    }
    res.status(403);
    res.send("Not permitted");
}
exports.requireAuth = requireAuth;
let AppAuthController = exports.AppAuthController = class AppAuthController {
    checkSessionUser(req, res) {
        if (req.session && req.session.loggedIn) {
            res.send("you are loggedIn Baby");
        }
        else {
            res.send("you are not loggedIn Copeng");
        }
    }
    getLogin(req, res) {
        res.send("it works baby congratulations");
    }
    postLogin(req, res) {
        try {
            const { email, password } = req.body;
            if (email === "hi@hi.com" && password === "Tatayoyo") {
                req.session = { loggedIn: true };
                res.send("you are now loggedIn babababab");
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
};
__decorate([
    (0, decorators_1.get)("/"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppAuthController.prototype, "checkSessionUser", null);
__decorate([
    (0, decorators_1.get)("/login"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppAuthController.prototype, "getLogin", null);
__decorate([
    (0, decorators_1.post)("/login"),
    (0, decorators_1.bodyValidator)("email", "password"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppAuthController.prototype, "postLogin", null);
__decorate([
    (0, decorators_1.get)("/logout"),
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
exports.AppAuthController = AppAuthController = __decorate([
    (0, decorators_1.controller)("/api/auth")
], AppAuthController);
const signup_post = async (req, res) => {
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
exports.signup_post = signup_post;
const signup_get = (req, res) => {
    res.send("signup get");
};
exports.signup_get = signup_get;
const login_get = (req, res) => {
    res.send("login get");
};
exports.login_get = login_get;
