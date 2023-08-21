"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const hashedPassword = async (password) => {
    const salt = bcrypt_1.default.genSaltSync(10);
    console.log({ salt });
    const hashedPassword = await bcrypt_1.default.hash(password, salt);
    console.log({ hashedPassword });
    return hashedPassword;
};
exports.default = hashedPassword;
