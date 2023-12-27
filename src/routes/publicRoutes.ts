import { Router } from "express";
import { AppAuthController } from "../api/app-auth/controller";
import { container } from "tsyringe";
import { AppRefreshTokenController } from "../api/app-refresh-token/controller";
import { AppUserController } from "../api/app-users/controllers";
import { AppEmailVerificationController } from "../api/app-email-verification/controller";

const publicRoutes = Router();

const appAuthController = container.resolve(AppAuthController);
const appRefreshTokenController = container.resolve(AppRefreshTokenController);
const appUserController = container.resolve(AppUserController);
const appEmailVerification = container.resolve(AppEmailVerificationController);

publicRoutes
  .post("/api/auth/register", (req, res) => {
    appUserController.registerNewUser(req, res);
  })
  .post("/api/auth/login", (req, res, next) => appAuthController.login(req, res, next))
  .get("/api/auth/refresh-token", (req, res, next) => {
    appRefreshTokenController.handleRefreshToken(req, res, next);
  })
  .get("/api/auth/logout", (req, res) => {
    appAuthController.logoutUser(req, res);
  })
  .post("/api/auth/email-verification", (req, res, next) => {
    appEmailVerification.sendVerificationEmail(req, res, next);
  });

export default publicRoutes;
