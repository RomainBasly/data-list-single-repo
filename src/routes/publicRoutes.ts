import { Router } from "express";
import { AppAuthController } from "../api/app-auth/controllers";
import { container } from "tsyringe";
import { AppRefreshTokenController } from "../api/app-refresh-token/controller";

const publicRoutes = Router();

const appAuthController = container.resolve(AppAuthController);
const appRefreshTokenController = container.resolve(AppRefreshTokenController);

publicRoutes
  .post("/api/auth/register", (req, res) => {
    appAuthController.registerNewUser(req, res);
  })
  .post("/api/auth/login", (req, res) => appAuthController.postLogin(req, res))
  .get("/api/auth/refresh-token", (req, res) => {
    appRefreshTokenController.handleRefreshToken(req, res);
  })
  .get("/api/auth/logout", (req, res) => {
    appAuthController.logoutUser(req, res);
  });

export default publicRoutes;
