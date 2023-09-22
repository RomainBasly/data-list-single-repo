import { Router } from "express";
import { signup_get, login_get, signup_post_with_supabase, requireAuth } from "../api/app-auth/controllers";

const router = Router();

router.get('/protected', requireAuth)
router.get("/api/signup", signup_get);
router.post("/api/signup", signup_post_with_supabase);
router.get("/api/login", login_get);


export default router;
