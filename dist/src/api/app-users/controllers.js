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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppUserController = void 0;
const tsyringe_1 = require("tsyringe");
const Data = __importStar(require("../../../infrastructure/fakeData/users.json"));
const services_1 = require("../../../domain/user/services");
const errors_1 = require("../../../domain/common/errors");
let AppUserController = class AppUserController {
    constructor(userService) {
        this.userService = userService;
    }
    async registerNewUser(req, res) {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json("userName and password are required");
            return;
        }
        try {
            await this.userService.registerUser(email, password);
            res.status(201).json({ message: "new user created" });
        }
        catch (error) {
            if (error instanceof errors_1.UserAlreadyExistsError) {
                res.status(409).json({ message: error.message });
            }
            else {
                console.error("Error in AppUserController", error);
                res.status(500).json({ message: "Internal server error" });
            }
        }
    }
    getAllUsers(req, res) {
        try {
            res.json(Data.users);
        }
        catch (error) {
            console.log(error);
            res.status(400).send("error getting the users");
        }
    }
    getUserById(req, res) {
        const { id } = req.params;
        res.json(Data.users.find((user) => user.id === Number(id)));
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
            res.status(400).send("error posting the users");
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
    __param(0, (0, tsyringe_1.inject)(services_1.UserService)),
    __metadata("design:paramtypes", [services_1.UserService])
], AppUserController);
