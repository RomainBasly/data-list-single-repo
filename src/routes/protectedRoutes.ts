import { Router } from 'express';
import { container } from 'tsyringe';
import { AppUserController } from '../api/app-users/controllers';
import { Roles } from '../common/types/api';
import { verifyRoles } from '../middlewares/auth-middleware';
import { AppRefreshTokenController } from '../api/app-refresh-token/controller';
import { ListManagementController } from '../api/app-list-management/controller';
import { AppUserInvitationsController } from '../api/app-user-invitations/controller';
import { AppAuthController } from '../api/app-auth/controller';

const appUserController = container.resolve(AppUserController);
const appAuthController = container.resolve(AppAuthController);
const appListController = container.resolve(ListManagementController);
const appUserInvitationsController = container.resolve(AppUserInvitationsController);

const protectedRoutes = Router();

protectedRoutes
  .get('/api/users/all', verifyRoles(Roles.ADMIN, Roles.USER), (req, res) => appUserController.getAllUsers(req, res))
  .post('/api/lists/create-list', (req, res, next) => {
    appListController.createList(req, res, next);
  })
  .get('/api/lists/get-user-invitations/:status', (req, res, next) => {
    appUserInvitationsController.getUserInvitations(req, res, next);
  })
  .post('/api/lists/handle-list-invitation-status/:invitationId', (req, res, next) => {
    appUserInvitationsController.handleListInvitationStatus(req, res, next);
  });

export default protectedRoutes;
