import { Router } from "express";
import { signup_get, login_get, signup_post, login_post } from '../api/app-auth/controllers/appAuthControllers'

const router = Router();

router.get("/api/signup", signup_get)
router.post("/api/signup", signup_post)
router.post("/api/login", login_post)
router.get("/api/login", login_get)

export default router;