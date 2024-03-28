"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tsyringe_1 = require("tsyringe");
const controllers_1 = require("../api/app-users/controllers");
const api_1 = require("../common/types/api");
const auth_middleware_1 = require("../middlewares/auth-middleware");
const controller_1 = require("../api/app-list-management/controller");
const controller_2 = require("../api/app-user-invitations/controller");
const appUserController = tsyringe_1.container.resolve(controllers_1.AppUserController);
const appListController = tsyringe_1.container.resolve(controller_1.ListManagementController);
const appUserInvitationsController = tsyringe_1.container.resolve(controller_2.AppUserInvitationsController);
const protectedRoutes = (0, express_1.Router)();
protectedRoutes
    .get('/api/users/all', (0, auth_middleware_1.verifyRoles)(api_1.Roles.ADMIN, api_1.Roles.USER), (req, res) => appUserController.getAllUsers(req, res))
    .post('/api/lists/create-list', (req, res, next) => {
    appListController.createList(req, res, next);
})
    .get('/api/lists/get-user-invitations/:userId', (req, res, next) => {
    appUserInvitationsController.getUserInvitations(req, res, next);
});
exports.default = protectedRoutes;
