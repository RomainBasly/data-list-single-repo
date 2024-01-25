"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { signup_get, login_get, signup_post_with_supabase } from "../api/app-auth/controllers";
const express_1 = require("express");
const tsyringe_1 = require("tsyringe");
const controllers_1 = require("../api/app-users/controllers");
const api_1 = require("../common/types/api");
const auth_middleware_1 = require("../middlewares/auth-middleware");
const controller_1 = require("../api/app-refresh-token/controller");
const appUserController = tsyringe_1.container.resolve(controllers_1.AppUserController);
const appRefreshTokenController = tsyringe_1.container.resolve(controller_1.AppRefreshTokenController);
const protectedRoutes = (0, express_1.Router)();
protectedRoutes
    .get('/api/users/all', (0, auth_middleware_1.verifyRoles)(api_1.Roles.ADMIN, api_1.Roles.USER), (req, res) => appUserController.getAllUsers(req, res))
    .get('/api/refresh-token', (req, res, next) => {
    appRefreshTokenController.handleRefreshToken(req, res, next);
});
exports.default = protectedRoutes;
