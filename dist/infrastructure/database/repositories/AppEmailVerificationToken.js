"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppEmailVerificationTokenRepository = void 0;
const tsyringe_1 = require("tsyringe");
const supabaseClient_1 = __importDefault(require("../../../config/database/supabaseClient"));
const errors_1 = require("../../../domain/common/errors");
let AppEmailVerificationTokenRepository = class AppEmailVerificationTokenRepository {
    async registerToDB(email_address, verification_code, formatted_expiry_date) {
        const { error } = await supabaseClient_1.default.rpc('set_verification_code_into_DB', {
            email_address,
            verification_code,
            formatted_expiry_date,
        });
        if (error) {
            if (error.code === 'P0001') {
                throw new errors_1.UserAlreadyExistsError(errors_1.ErrorMessages.ALREADY_EXISTING);
            }
        }
        else {
            console.log('user registration started');
        }
    }
    async getAppEmailVerificationRecord(email_address) {
        const { data, error } = await supabaseClient_1.default.rpc('get_email_verification_data_from_DB', {
            email_address,
        });
        if (error)
            throw new Error('oh oh');
        return data;
    }
};
exports.AppEmailVerificationTokenRepository = AppEmailVerificationTokenRepository;
exports.AppEmailVerificationTokenRepository = AppEmailVerificationTokenRepository = __decorate([
    (0, tsyringe_1.injectable)()
], AppEmailVerificationTokenRepository);
