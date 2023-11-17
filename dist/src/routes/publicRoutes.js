"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../api/app-auth/controllers");
const tsyringe_1 = require("tsyringe");
const controller_1 = require("../api/app-refresh-token/controller");
const publicRoutes = (0, express_1.Router)();
const appAuthController = tsyringe_1.container.resolve(controllers_1.AppAuthController);
const appRefreshTokenController = tsyringe_1.container.resolve(controller_1.AppRefreshTokenController);
publicRoutes
    .post("/api/auth/register", (req, res) => {
    appAuthController.registerNewUser(req, res);
})
    .post("/api/auth/login", (req, res) => appAuthController.login(req, res))
    .get("/api/auth/refresh-token", (req, res) => {
    appRefreshTokenController.handleRefreshToken(req, res);
})
    .get("/api/auth/logout", (req, res) => {
    appAuthController.logoutUser(req, res);
});
exports.default = publicRoutes;
