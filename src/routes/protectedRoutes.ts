import { Router } from 'express';
import { container } from 'tsyringe';
import { AppUserController } from '../api/app-users/controllers';
import { Roles } from '../common/types/api';
import { verifyRoles } from '../middlewares/auth-middleware';
import { AppRefreshTokenController } from '../api/app-refresh-token/controller';

const appUserController = container.resolve(AppUserController);
const appRefreshTokenController = container.resolve(AppRefreshTokenController);

const protectedRoutes = Router();

protectedRoutes.get('/api/users/all', verifyRoles(Roles.ADMIN, Roles.USER), (req, res) =>
  appUserController.getAllUsers(req, res)
);

export default protectedRoutes;
