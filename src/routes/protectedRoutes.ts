import { Router } from 'express';
import { container } from 'tsyringe';
import { ListManagementController } from '../api/app-list-management/controller';
import { AppUserInvitationsController } from '../api/app-user-invitations/controller';

const appListManagementController = container.resolve(ListManagementController);
const appUserInvitationsController = container.resolve(AppUserInvitationsController);

const protectedRoutes = Router();

protectedRoutes
  .post('/api/lists/create-list', (req, res, next) => {
    appListManagementController.createList(req, res, next);
  })
  .get('/api/lists/get-user-invitations/:status', (req, res, next) => {
    appUserInvitationsController.getUserInvitations(req, res, next);
  })
  .post('/api/lists/handle-list-invitation-status/:invitationId', (req, res, next) => {
    appUserInvitationsController.handleListInvitationStatus(req, res, next);
  })
  .get('/api/lists/get-user-lists', (req, res, next) => {
    appListManagementController.getListForUserById(req, res, next);
  })
  .get('/api/lists/get-list/:listId', (req, res, next) => {
    appListManagementController.getListById(req, res, next);
  })
  .post('/api/lists/add-item-to-list/:listId', (req, res, next) => {
    appListManagementController.addItemToList(req, res, next);
  });

export default protectedRoutes;
