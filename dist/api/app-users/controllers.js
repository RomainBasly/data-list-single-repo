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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppUserController = void 0;
const tsyringe_1 = require("tsyringe");
const services_1 = require("../../domain/user/services");
let AppUserController = class AppUserController {
    constructor(userService) {
        this.userService = userService;
    }
    async registerNewUser(req, res) { }
    getAllUsers(req, res) {
        try {
            // to implement
        }
        catch (error) {
            console.log(error);
            res.status(400).send('error getting the users');
        }
    }
    getUserById(req, res) {
        const { id } = req.params;
        // to implement
    }
    postUsers(req, res) {
        const { email, password } = req.body;
        try {
            res.json({
                email,
                password,
            });
        }
        catch (error) {
            console.log(error);
            res.status(400).send('error posting the users');
        }
    }
    putUsers(req, res) {
        const { id, email, password } = req.body;
        try {
            res.json({ id, email, password });
        }
        catch (error) { }
    }
    deleteUser(req, res) {
        const { id } = req.body;
        try {
            res.json({ id });
        }
        catch (error) { }
    }
};
exports.AppUserController = AppUserController;
exports.AppUserController = AppUserController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(services_1.AppAuthService)),
    __metadata("design:paramtypes", [services_1.AppAuthService])
], AppUserController);
