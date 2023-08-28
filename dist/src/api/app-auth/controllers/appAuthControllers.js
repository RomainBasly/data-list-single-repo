"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login_post = exports.signup_post = exports.login_get = exports.signup_get = void 0;
const supabaseClient_1 = __importDefault(require("../../../../config/database/supabaseClient"));
const signup_get = (req, res) => {
    res.send("signup get");
};
exports.signup_get = signup_get;
const login_get = (req, res) => {
    res.send("login get");
};
exports.login_get = login_get;
const signup_post = async (req, res) => {
    const { email, password } = req.body;
    try {
        //console.log(supabase)
        let { data, error } = await supabaseClient_1.default.auth.signInWithPassword({
            email: email,
            password: password,
        });
        console.log(data, error);
        res.status(201).send("user created");
    }
    catch (error) {
        console.log(error);
        res.status(400).send("error, user not created");
    }
};
exports.signup_post = signup_post;
const login_post = (req, res) => {
    try {
        const { email, password } = req.body;
        console.log({ email, password });
    }
    catch (error) {
        console.log(error);
        res.status(400).send("error in login_post");
    }
};
exports.login_post = login_post;
