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
exports.AppUserRepository = void 0;
const tsyringe_1 = require("tsyringe");
const supabaseClient_1 = __importDefault(require("../../../config/database/supabaseClient"));
let AppUserRepository = class AppUserRepository {
    async create(userData) {
        const { error } = await supabaseClient_1.default.from("app-users").insert([userData]).select();
        if (error) {
            throw new Error(`something when wrong in the appUserRepository: ${error.message}`);
        }
    }
    async getUser(email) {
        return await supabaseClient_1.default.from("app-users").select().eq("email", email);
    }
    async updateRefreshToken(refreshToken, email) {
        await supabaseClient_1.default.from("app-users").update({ refreshToken: refreshToken }).eq("email", email);
    }
    async findUserByRefreshToken(refreshToken) {
        return await supabaseClient_1.default.from("app-users").select().eq("refreshToken", refreshToken);
    }
    async clearUserRefreshToken(refreshToken) {
        return await supabaseClient_1.default.from("app-users").update({ refreshToken: "" }).eq("refreshToken", refreshToken);
    }
};
exports.AppUserRepository = AppUserRepository;
exports.AppUserRepository = AppUserRepository = __decorate([
    (0, tsyringe_1.injectable)()
], AppUserRepository);
