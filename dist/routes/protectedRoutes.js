"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tsyringe_1 = require("tsyringe");
const controller_1 = require("../api/app-list-management/controller");
const controller_2 = require("../api/app-user-invitations/controller");
const appListController = tsyringe_1.container.resolve(controller_1.ListManagementController);
const appUserInvitationsController = tsyringe_1.container.resolve(controller_2.AppUserInvitationsController);
const protectedRoutes = (0, express_1.Router)();
protectedRoutes
    .post('/api/lists/create-list', (req, res, next) => {
    appListController.createList(req, res, next);
})
    .get('/api/lists/get-user-invitations/:status', (req, res, next) => {
    appUserInvitationsController.getUserInvitations(req, res, next);
})
    .post('/api/lists/handle-list-invitation-status/:invitationId', (req, res, next) => {
    appUserInvitationsController.handleListInvitationStatus(req, res, next);
})
    .get('/api/lists/get-user-lists', (req, res, next) => {
    appListController.getListForUserById(req, res, next);
});
exports.default = protectedRoutes;
