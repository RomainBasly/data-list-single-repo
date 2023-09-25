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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppUserController = void 0;
const Data = __importStar(require("../../../infrastructure/fakeData/users.json"));
const decorators_1 = require("../../common/decorators");
const controllers_1 = require("../app-auth/controllers");
const service_1 = require("../app-auth/service");
let AppUserController = exports.AppUserController = class AppUserController {
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
__decorate([
    (0, decorators_1.get)("/"),
    (0, decorators_1.use)(service_1.verifyToken),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppUserController.prototype, "getAllUsers", null);
__decorate([
    (0, decorators_1.get)("/:id"),
    (0, decorators_1.use)(controllers_1.requireAuth),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppUserController.prototype, "getUserById", null);
__decorate([
    (0, decorators_1.post)("/"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppUserController.prototype, "postUsers", null);
__decorate([
    (0, decorators_1.put)("/"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppUserController.prototype, "putUsers", null);
__decorate([
    (0, decorators_1.del)("/"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppUserController.prototype, "deleteUser", null);
exports.AppUserController = AppUserController = __decorate([
    (0, decorators_1.controller)("/api/users")
], AppUserController);
