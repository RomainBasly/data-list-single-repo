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
exports.AppEmailVerificationController = void 0;
const tsyringe_1 = require("tsyringe");
const validation_1 = __importDefault(require("../../domain/email/validation"));
const nodeMailder_1 = __importDefault(require("../../infrastructure/emails/nodeMailder"));
const apiKey = process.env.MAILCHIMP_API_KEY;
let AppEmailVerificationController = class AppEmailVerificationController {
    constructor(appEmailValidation, nodeMailerService) {
        this.appEmailValidation = appEmailValidation;
        this.nodeMailerService = nodeMailerService;
    }
    async sendVerificationEmail(req, res, next) {
        const email = req.body;
        try {
            const verifiedObject = await this.appEmailValidation.validateEmail(email);
            await this.nodeMailerService.sendEmail(verifiedObject.email);
        }
        catch (error) {
            next(error);
        }
    }
};
exports.AppEmailVerificationController = AppEmailVerificationController;
exports.AppEmailVerificationController = AppEmailVerificationController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(1, (0, tsyringe_1.inject)(nodeMailder_1.default)),
    __metadata("design:paramtypes", [validation_1.default,
        nodeMailder_1.default])
], AppEmailVerificationController);
