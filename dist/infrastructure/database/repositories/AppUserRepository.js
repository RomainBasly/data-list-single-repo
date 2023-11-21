"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppUserRepository = void 0;
const supabaseClient_1 = __importDefault(require("../../../config/database/supabaseClient"));
class AppUserRepository {
    async create(userData) {
        const { data, error } = await supabaseClient_1.default.from("app-users").insert([{ userData }]).select();
    }
}
exports.AppUserRepository = AppUserRepository;
