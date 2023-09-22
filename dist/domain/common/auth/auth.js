"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashedPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
async function hashedPassword(password) {
    const salt = bcrypt_1.default.genSaltSync(10);
    const hashedPassword = await bcrypt_1.default.hash(password, salt);
    return hashedPassword;
}
exports.hashedPassword = hashedPassword;
exports.default = hashedPassword;
