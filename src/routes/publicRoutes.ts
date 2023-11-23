import { Router } from "express";
import { AppAuthController } from "../api/app-auth/controller";
import { container } from "tsyringe";
import { AppRefreshTokenController } from "../api/app-refresh-token/controller";
import { AppUserController } from "../api/app-users/controllers";

const publicRoutes = Router();

const appAuthController = container.resolve(AppAuthController);
const appRefreshTokenController = container.resolve(AppRefreshTokenController);
const appUserController = container.resolve(AppUserController);

publicRoutes
  .post("/api/auth/register", (req, res) => {
    appUserController.registerNewUser(req, res);
  })
  .post("/api/auth/login", (req, res) => appAuthController.login(req, res))
  .get("/api/auth/refresh-token", (req, res) => {
    appRefreshTokenController.handleRefreshToken(req, res);
  })
  .get("/api/auth/logout", (req, res) => {
    appAuthController.logoutUser(req, res);
  });

export default publicRoutes;
