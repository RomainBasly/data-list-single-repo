// import { signup_get, login_get, signup_post_with_supabase } from "../api/app-auth/controllers";
import { Router } from "express";
import { AppAuthController } from "../api/app-auth/controllers";
import { container } from "tsyringe";
import { AppUserController } from "../api/app-users/controllers";

const appAuthController = container.resolve(AppAuthController);
const appUserController = container.resolve(AppUserController);

const protectedRoutes = Router();

protectedRoutes
  .post("/api/auth/login", (req, res) => appAuthController.postLogin(req, res))
  .get("/api/users/all", (req, res) => appUserController.getAllUsers(req, res));

export default protectedRoutes;
