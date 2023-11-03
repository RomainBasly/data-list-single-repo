"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import { signup_get, login_get, signup_post_with_supabase } from "../api/app-auth/controllers";
const controllers_1 = require("../api/app-auth/controllers");
const tsyringe_1 = require("tsyringe");
const appAuthController = tsyringe_1.container.resolve(controllers_1.AppAuthController);
const propectedRoutes = (0, express_1.Router)();
propectedRoutes
    .post("/api/auth/login", (req, res) => appAuthController.postLogin(req, res))
    .post("/api/auth/create", (req, res) => appAuthController.handleNewUser(req, res));
exports.default = propectedRoutes;
