import { Router } from "express";
import { signup_get, login_get, signup_post, login_post } from '../api/app-auth/controllers/appAuthControllers'

const router = Router();

router.get("/signup", signup_get)
router.post("/signup", signup_post)
router.post("/login", login_post)
router.get("/login", login_get)

export default router;