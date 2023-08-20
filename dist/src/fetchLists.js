"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supabaseClient_1 = __importDefault(require("../config/database/supabaseClient"));
async function fetchData() {
    try {
        const { data } = await supabaseClient_1.default
            .from("app-lists")
            .select("*");
        console.log(data);
    }
    catch (error) {
        console.log(error);
    }
}
exports.default = fetchData;
