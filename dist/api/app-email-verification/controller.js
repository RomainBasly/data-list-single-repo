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
exports.AppEmailVerificationController = void 0;
const tsyringe_1 = require("tsyringe");
const validation_1 = __importDefault(require("../../domain/email/validation"));
const apiKey = process.env.MAILCHIMP_API_KEY;
let AppEmailVerificationController = class AppEmailVerificationController {
    constructor(appEmailValidation) {
        this.appEmailValidation = appEmailValidation;
    }
    async sendVerificationEmail(req, res, next) {
        const email = req.body;
        try {
            const verifiedEmail = await this.appEmailValidation.validateEmail(email);
        }
        catch (error) {
            next(error);
        }
    }
};
exports.AppEmailVerificationController = AppEmailVerificationController;
exports.AppEmailVerificationController = AppEmailVerificationController = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [validation_1.default])
], AppEmailVerificationController);
