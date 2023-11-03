"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { signup_get, login_get, signup_post_with_supabase } from "../api/app-auth/controllers";
const express_1 = require("express");
const controllers_1 = require("../api/app-auth/controllers");
const tsyringe_1 = require("tsyringe");
const controllers_2 = require("../api/app-users/controllers");
const appAuthController = tsyringe_1.container.resolve(controllers_1.AppAuthController);
const appUserController = tsyringe_1.container.resolve(controllers_2.AppUserController);
const protectedRoutes = (0, express_1.Router)();
protectedRoutes
    .post("/api/auth/login", (req, res) => appAuthController.postLogin(req, res))
    .get("/api/users/all", (req, res) => appUserController.getAllUsers(req, res));
exports.default = protectedRoutes;
