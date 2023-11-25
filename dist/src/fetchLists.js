"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supabaseClient_1 = __importDefault(require("./config/database/supabaseClient"));
async function fetchData() {
    try {
        const { data, error } = await supabaseClient_1.default.from("My-lists").select("*");
        if (error) {
            throw error;
        }
        if (!data)
            return [];
        return data;
    }
    catch (error) {
        console.log(error);
        return [];
    }
}
exports.default = fetchData;
