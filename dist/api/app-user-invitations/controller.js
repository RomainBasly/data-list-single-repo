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
exports.AppUserInvitationsController = void 0;
const tsyringe_1 = require("tsyringe");
const services_1 = __importDefault(require("../../domain/user/Invitations/services"));
let AppUserInvitationsController = class AppUserInvitationsController {
    constructor(userInvitationsService) {
        this.userInvitationsService = userInvitationsService;
    }
    async getUserInvitations(req, res, next) {
        try {
            const { userId } = req.params;
            if (!userId) {
                res.status(403).json({ message: 'wooooops forbidden' });
            }
            await this.userInvitationsService.fetchUserInvitations(userId);
        }
        catch (error) {
            next(error);
        }
    }
};
exports.AppUserInvitationsController = AppUserInvitationsController;
exports.AppUserInvitationsController = AppUserInvitationsController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(services_1.default)),
    __metadata("design:paramtypes", [services_1.default])
], AppUserInvitationsController);
