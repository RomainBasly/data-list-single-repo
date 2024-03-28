"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initContainers = void 0;
const tsyringe_1 = require("tsyringe");
const controllers_1 = require("../../api/app-users/controllers");
const controller_1 = require("../../api/app-auth/controller");
const controller_2 = require("../../api/app-refresh-token/controller");
const controller_3 = require("../../api/app-email-verification/controller");
const controller_4 = require("../../api/app-list-management/controller");
const services_1 = require("../../domain/webSockets/services");
function initContainers() {
    tsyringe_1.container.register(controllers_1.AppUserController, controllers_1.AppUserController);
    tsyringe_1.container.register(controller_1.AppAuthController, controller_1.AppAuthController);
    tsyringe_1.container.register(controller_2.AppRefreshTokenController, controller_2.AppRefreshTokenController);
    tsyringe_1.container.register(controller_3.AppEmailVerificationController, controller_3.AppEmailVerificationController);
    tsyringe_1.container.register(controller_4.ListManagementController, controller_4.ListManagementController);
    tsyringe_1.container.registerSingleton(services_1.WebSocketClientService, services_1.WebSocketClientService);
}
exports.initContainers = initContainers;
