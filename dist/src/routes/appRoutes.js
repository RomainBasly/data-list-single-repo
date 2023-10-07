"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controllers_1 = require("../api/app-auth/controllers");
const tsyringe_1 = require("tsyringe");
const appRouter_1 = require("../appRouter");
const appAuthController = tsyringe_1.container.resolve(controllers_1.AppAuthController);
const routes = appRouter_1.AppRouter.getInstance();
routes.post("/api/auth/login", (req, res) => appAuthController.postLogin(req, res));
exports.default = routes;
