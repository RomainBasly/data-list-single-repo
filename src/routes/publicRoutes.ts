import { Router } from 'express';
import { AppAuthController } from '../api/app-auth/controller';
import { container } from 'tsyringe';
import { AppRefreshTokenController } from '../api/app-refresh-token/controller';
import { AppEmailVerificationController } from '../api/app-email-verification/controller';

const publicRoutes = Router();

const appAuthController = container.resolve(AppAuthController);
const appRefreshTokenController = container.resolve(AppRefreshTokenController);
const appEmailVerification = container.resolve(AppEmailVerificationController);

publicRoutes
  .post('/api/auth/register', (req, res, next) => {
    appAuthController.register(req, res, next);
  })
  .post('/api/auth/login', (req, res, next) => appAuthController.login(req, res, next))
  .get('/api/refresh-token', (req, res, next) => {
    appRefreshTokenController.handleRefreshToken(req, res, next);
  })
  .get('/api/auth/logout', (req, res) => {
    appAuthController.logoutUser(req, res);
  })
  .post('/api/register/email-verification', (req, res, next) => {
    appEmailVerification.sendVerificationEmail(req, res, next);
  })
  .post('/api/register/check-verification-code', (req, res, next) => {
    appEmailVerification.verifyCode(req, res, next);
  })
  .post('/api/lists/create-list', (req, res, next) => {});

export default publicRoutes;
