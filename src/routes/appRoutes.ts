import { Router } from "express";
import { signup_get, login_get, signup_post_with_supabase } from "../api/app-auth/controllers";
import { AppAuthController } from "../api/app-auth/controllers";
import { container } from "tsyringe";
import { AppRouter } from "../appRouter";

const appAuthController = container.resolve(AppAuthController);

const routes = AppRouter.getInstance();

routes.post("/api/auth/login", (req, res) => appAuthController.postLogin(req, res))


export default routes;
