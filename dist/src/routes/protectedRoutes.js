"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { signup_get, login_get, signup_post_with_supabase } from "../api/app-auth/controllers";
const express_1 = require("express");
const tsyringe_1 = require("tsyringe");
const controllers_1 = require("../api/app-users/controllers");
const api_1 = require("../common/types/api");
const auth_middleware_1 = require("../middlewares/auth-middleware");
const appUserController = tsyringe_1.container.resolve(controllers_1.AppUserController);
const protectedRoutes = (0, express_1.Router)();
protectedRoutes.get("/api/users/all", (0, auth_middleware_1.verifyRoles)(api_1.Roles.ADMIN), (req, res) => appUserController.getAllUsers(req, res));
exports.default = protectedRoutes;
