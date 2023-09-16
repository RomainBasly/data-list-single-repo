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
exports.login_post = exports.signup_post = exports.login_get = exports.signup_get = exports.logoutUser = exports.checkSessionUser = exports.requireAuth = exports.Auth = void 0;
const supabaseClient_1 = __importDefault(require("../../../config/database/supabaseClient"));
const decorators_1 = require("./decorators");
let Auth = exports.Auth = class Auth {
    getLogin(req, res) {
        res.send("it works baby congratulations");
    }
};
__decorate([
    (0, decorators_1.get)('/login'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], Auth.prototype, "getLogin", null);
exports.Auth = Auth = __decorate([
    (0, decorators_1.controller)("/autho")
], Auth);
function requireAuth(req, res, next) {
    if (req.session && req.session.loggedIn) {
        next();
        return;
    }
    res.status(403);
    res.send("Not permitted");
}
exports.requireAuth = requireAuth;
const checkSessionUser = (req, res) => {
    if (req.session && req.session.loggedIn) {
        res.send("you are loggedIn Baby");
    }
    else {
        res.send("you are not loggedIn Copeng");
    }
};
exports.checkSessionUser = checkSessionUser;
const logoutUser = (req, res) => {
    req.session = undefined;
    res.send("you are now loggedOut, copeng");
};
exports.logoutUser = logoutUser;
const signup_get = (req, res) => {
    res.send("signup get");
};
exports.signup_get = signup_get;
const login_get = (req, res) => {
    res.send("login get");
};
exports.login_get = login_get;
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
const login_post = (req, res) => {
    try {
        const { email, password } = req.body;
        if (email && password && email === "hi@hi.com" && password === "Tatayoyo") {
            req.session = { loggedIn: true };
            res.send("you are now loggedIn");
        }
        console.log({ email, password });
    }
    catch (error) {
        console.log(error);
        res.status(400).send("error in login_post");
    }
};
exports.login_post = login_post;
