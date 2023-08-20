"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login_post = exports.signup_post = exports.login_get = exports.signup_get = void 0;
const signup_get = (req, res) => {
    res.send("signup get");
};
exports.signup_get = signup_get;
const login_get = (req, res) => {
    res.send("login get");
};
exports.login_get = login_get;
const signup_post = (req, res) => {
    res.send("signup_post");
};
exports.signup_post = signup_post;
const login_post = (req, res) => {
    res.send("ogin_post");
};
exports.login_post = login_post;
