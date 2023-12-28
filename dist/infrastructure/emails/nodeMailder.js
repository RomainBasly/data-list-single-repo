'use strict';
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
const nodemailer_1 = __importDefault(require("nodemailer"));
const email_1 = require("../../config/email");
const tsyringe_1 = require("tsyringe");
const ejs_1 = __importDefault(require("ejs"));
const path_1 = __importDefault(require("path"));
const AppEmailVerificationToken_1 = require("../database/repositories/AppEmailVerificationToken");
let NodeMailerService = class NodeMailerService {
    constructor(appEmailVerificationTokenRepository) {
        var _a;
        this.appEmailVerificationTokenRepository = appEmailVerificationTokenRepository;
        this.logoUrlPath = (_a = process.env.LOGO_URL_PATH) !== null && _a !== void 0 ? _a : '';
        this.transporter = nodemailer_1.default.createTransport(Object.assign({}, email_1.mailtrapConfig));
    }
    async sendEmail(email) {
        const code = await this.generateAndPublishCode(email);
        try {
            await this.transporter.sendMail(Object.assign(Object.assign({}, email_1.emailConfig), { to: email, html: await this.generateHtml(code, this.logoUrlPath) }));
        }
        catch (error) {
            console.error(error);
        }
    }
    async generateAndPublishCode(email) {
        const randomNumber = Math.floor(Math.random() * 1000000);
        const expiryDate = new Date(Date.now() + 3600 * 24 * 1000);
        const formattedDate = expiryDate.toISOString();
        await this.appEmailVerificationTokenRepository.registerToDB(email, randomNumber, formattedDate);
        return randomNumber;
    }
    async generateHtml(code, logoUrlPath) {
        try {
            return await ejs_1.default.renderFile(path_1.default.join(__dirname, 'emailTemplate.ejs'), {
                code,
                logoUrlPath,
            });
        }
        catch (error) {
            console.error(error);
        }
    }
};
NodeMailerService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(AppEmailVerificationToken_1.AppEmailVerificationTokenRepository)),
    __metadata("design:paramtypes", [AppEmailVerificationToken_1.AppEmailVerificationTokenRepository])
], NodeMailerService);
exports.default = NodeMailerService;
